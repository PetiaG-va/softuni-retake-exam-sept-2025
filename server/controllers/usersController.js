import { Router } from 'express';
import fs from 'fs';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { createToken } from '../utils/auth.js';

const router = Router();
const dataPath = './data/users.json';

const readUsers = () => JSON.parse(fs.readFileSync(dataPath));
const writeUsers = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

/* REGISTER */
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();

    if (users.find(u => u.email === email)) {
        return res.status(409).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
        _id: uuid(),
        email,
        password: hashedPassword
    };

    users.push(user);
    writeUsers(users);

    const accessToken = createToken(user);

    res.json({
        _id: user._id,
        email: user.email,
        accessToken
    });
});

/* LOGIN */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();

    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(403).json({ message: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return res.status(403).json({ message: 'Invalid credentials' });
    }

    const accessToken = createToken(user);

    res.json({
        _id: user._id,
        email: user.email,
        accessToken
    });
});

/* LOGOUT */
router.get('/logout', (req, res) => {
    res.status(204).end();
});

export default router;

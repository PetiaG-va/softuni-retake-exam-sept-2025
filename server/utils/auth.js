import jwt from 'jsonwebtoken';

const SECRET = 'my-secret-key';

export function createToken(user) {
    return jwt.sign(
        { _id: user._id, email: user.email },
        SECRET
    );
}

export function authMiddleware(req, res, next) {
    const token = req.headers['x-authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Missing token' });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ message: 'Invalid token' });
    }
}

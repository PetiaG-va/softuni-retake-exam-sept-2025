import { Router } from 'express';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import { authMiddleware } from '../utils/auth.js';

const router = Router();
const dataPath = './data/plants.json';

const readPlants = () => JSON.parse(fs.readFileSync(dataPath));
const writePlants = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

/* GET all plants */
router.get('/', (req, res) => {
    res.json(readPlants());
});

/* GET plant by id */
router.get('/:id', (req, res) => {
    const plant = readPlants().find(p => p._id === req.params.id);
    plant ? res.json(plant) : res.status(404).json({ message: 'Not found' });
});

/* CREATE plant (AUTH REQUIRED) */
router.post('/', authMiddleware, (req, res) => {
    const plants = readPlants();

    const plant = {
        _id: uuid(),
        ownerId: req.user._id,
        ...req.body
    };

    plants.push(plant);
    writePlants(plants);

    res.status(201).json(plant);
});

/* UPDATE plant (OWNER ONLY) */
router.put('/:id', authMiddleware, (req, res) => {
    const plants = readPlants();
    const plant = plants.find(p => p._id === req.params.id);

    if (!plant) {
        return res.status(404).json({ message: 'Not found' });
    }

    if (plant.ownerId !== req.user._id) {
        return res.status(403).json({ message: 'Not allowed' });
    }

    Object.assign(plant, req.body);
    writePlants(plants);

    res.json(plant);
});

/* DELETE plant */
router.delete('/:id', authMiddleware, (req, res) => {
    const plants = readPlants();
    const plant = plants.find(p => p._id === req.params.id);

    if (!plant) {
        return res.status(404).json({ message: 'Not found' });
    }

    if (plant.ownerId !== req.user._id) {
        return res.status(403).json({ message: 'Not allowed' });
    }

    writePlants(plants.filter(p => p._id !== req.params.id));
    res.status(204).end();
});

export default router;

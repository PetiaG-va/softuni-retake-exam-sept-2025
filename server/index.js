import express from 'express';
import cors from 'cors';

import usersController from './controllers/usersController.js';
import plantsController from './controllers/plantsController.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersController);
app.use('/plants', plantsController);

app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
});

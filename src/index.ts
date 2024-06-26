import express from 'express';
import cors from 'cors';
import rootRoute from './routes/root.route.js';

const app = express();

//::apply middlewares
app.use(express.json());
app.use(cors());
app.use('/api', rootRoute);


app.listen(8080, () => {
    console.log(`mess:: listening on port ${8080}`);
})


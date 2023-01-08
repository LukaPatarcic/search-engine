import express from 'express';
import websites from './routes/websites';
import main from './lib/mongo';
import { producer } from './lib/kafka';

const app = express();
const port = 3333;

producer.connect();
main().catch((err) => console.log(err));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Web Server Running');
});

app.get('/healthcheck', (_, res) => {
    res.send('OK');
});

app.use('/websites', websites);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

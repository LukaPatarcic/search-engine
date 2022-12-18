import express from 'express';
import websites from './routes/websites';
import main from './lib/mongo';

const app = express();
const port = 3333;

main().catch((err) => console.log(err));

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

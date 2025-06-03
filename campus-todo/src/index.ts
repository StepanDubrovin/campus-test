import express from 'express'
import 'dotenv/config';


const app = express();
const port = Number(process.env.PORT);

app.use(express.json());


app.listen(port, () => {
    console.log(`SERVER STARTED ON PORT localhost:${port}`);
})
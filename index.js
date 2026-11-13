import express from 'express';
import dotenv from 'dotenv';
import {database_connection} from './src/database/connect.js';
dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.json());

app.listen(port,  async() => {
    await database_connection();
    console.log('Server is running');
})
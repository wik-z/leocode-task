import './declarations'; // extra declarations for typescript

import dotenv from 'dotenv';
// load env variables from the .env file
dotenv.config();

import express, { Express } from 'express';
import bodyParser from 'body-parser';
import router from './router';

// Initialise the web server
const app: Express = express();
// loads the port from the environmental variables, otherwise falls back to 3000
const port: number = (process.env.PORT && parseInt(process.env.PORT)) || 3000;

app.use(bodyParser.json());

// initialise router
app.use('/api', router);


// start listening on given port
app.listen(port, () => {
    console.log(`Server started at localhost:${port}`);
});
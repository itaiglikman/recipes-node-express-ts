import dotenv from 'dotenv';
import cors from "cors";
import express from "express";
import expressRateLimit from "express-rate-limit";
import catchAll from "./03-middlewares/catch-all";
import logger from "./03-middlewares/logger";
import recipesRouter from "./05-routes/recipesRouter";
import routeNotFound from './03-middlewares/routeNotFound';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import db from './db/models/'; // This connects to DB
const sequelize = db.sequelize;

// Load environment variables from .env file
dotenv.config();

const server = express();

// security DoS Attack: limits number of request from the same IP:
server.use(expressRateLimit({
    windowMs: 1000, //time limit
    max: 20 //max requests allowed in that time window
}));

server.use(express.json());
server.use(cors());
server.use(logger);

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
server.use(morgan('combined', { stream: accessLogStream }));

server.use('/recipes', recipesRouter);

server.use(routeNotFound)

server.use(catchAll);

server.listen(process.env.PORT, () => {
    console.log('listening on port:' + process.env.PORT);
})

// Test database connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to database:', error);
    }
}
server.listen(process.env.PORT, async () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
    await testConnection();
});



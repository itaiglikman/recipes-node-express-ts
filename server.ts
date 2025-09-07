import dotenv from 'dotenv';
import cors from "cors";
import express from "express";
import expressRateLimit from "express-rate-limit";
import catchAll from "./03-middlewares/catch-all";
import logger from "./03-middlewares/logger";
import recipesRouter from "./05-routes/recipesRouter";
import authRouter from "./05-routes/authRouter";
import favoritesRouter from "./05-routes/favoritesRouter";
import routeNotFound from './03-middlewares/routeNotFound';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import appConfig from './appConfig';

// Load environment variables from .env file
dotenv.config();

const sequelize = appConfig.sequelize;

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
server.use('/auth', authRouter);
server.use('/users/favorites', favoritesRouter)

server.use(routeNotFound)

server.use(catchAll);

// Test database connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to database:', error);
    }
}
server.listen(appConfig.port, async () => {
    console.log(`🚀 Server running on port ${appConfig.port}`);
    // await testConnection();
});



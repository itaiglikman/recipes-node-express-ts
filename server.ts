import dotenv from 'dotenv';
import cors from "cors";
import express from "express";
import expressRateLimit from "express-rate-limit";
import catchAll from "./03-middlewares/catch-all";
import logger from "./03-middlewares/logger";
import recipesRouter from "./05-routes/recipesRouter";
import commentsRouter from "./05-routes/commentsRouter";
import authRouter from "./05-routes/authRouter";
import favoritesRouter from "./05-routes/favoritesRouter";
import routeNotFound from './03-middlewares/routeNotFound';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import appConfig from './appConfig';
import mongoose from 'mongoose';

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
server.use('/comments', commentsRouter);
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

async function dbConnect() {
    try {
        const dbConnectionString = `mongodb+srv://itaig1998_db_user:${process.env.MONGO_DB_PASS}@cluster0.oypbsmo.mongodb.net/Recipes?retryWrites=true&w=majority&appName=Cluster0`;
        const db = await mongoose.connect(dbConnectionString);
        console.log("we are connected to mongoDB, db: " + db.connections[0].name);
    } catch (error) {
        console.log(error);
    }
}

server.listen(appConfig.port, async () => {
    await dbConnect();
    console.log(`🚀 Server running on port ${appConfig.port}`);
    // await testConnection();
});



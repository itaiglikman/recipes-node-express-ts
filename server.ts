require("dotenv").config(); //get environment variables form env file to env.process
import cors from "cors";
import express from "express";
import expressRateLimit from "express-rate-limit";
import catchAll from "./03-middlewares/catch-all";
import logger from "./03-middlewares/logger";

const server = express();

// security DoS Attack: limits number of request from the same IP:
server.use(expressRateLimit({
    windowMs: 1000, //time limit
    max: 20 //max requests allowed in that time window
}));

server.use(express.json());
server.use(cors());
server.use(logger);

server.use('/api')

server.use(catchAll);

server.listen(process.env.PORT, () => {
    console.log('listening on port:' + process.env.PORT);
})
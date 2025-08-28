import { Request, Response, NextFunction, response } from "express";

function get___(req: Request, res: Response, next: NextFunction) {
    try {

        response.status(200).json()
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ error: error.message })
    }
}

export default {
    get___
}
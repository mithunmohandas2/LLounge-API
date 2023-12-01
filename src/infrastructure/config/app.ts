import userRouter from '../route/userRoute'
import express from 'express'
import path from 'path';
import logger from 'morgan';

const app = express()

export const createServer = () => {
    try {
        app.use(express.json())

        app.use(logger('dev'));
        app.use(express.urlencoded({ extended: false }));
        app.use(express.static(path.join(__dirname, 'public')));
        
        // Routes
        app.use('/', userRouter)

        return app
    }
    catch (error) {
        console.log(error)
    }
}
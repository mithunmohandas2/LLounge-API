import userRouter from '../route/userRoute'
import adminRouter from '../route/adminRoute'
import tutorRouter from '../route/tutorRoute'
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


        // Enable CORS for all routes
        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            next();
        });

        // Routes
        app.use('/api/user', userRouter)
        app.use('/api/admin', adminRouter)
        app.use('/api/tutor', tutorRouter)

        //test Route
        app.get('/', (req, res) => res.status(200).json({ message: 'API running successfully' }));
        app.get('/api', (req, res) => res.status(200).json({ message: 'API initialized successfully' }));

        return app
    }
    catch (error) {
        console.log(error)
    }
}
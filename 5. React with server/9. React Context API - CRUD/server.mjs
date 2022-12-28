import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import authApis from './apis/auth.mjs';
import productApis from './apis/product.mjs';

const SECRET = process.env.SECRET || "topsecret";


const app = express()
const port = process.env.PORT || 5001;


app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: ['http://localhost:3000', 'https://localhost:3000', "*"],
    credentials: true
}));

app.use('/api/v1', authApis)
app.use('/api/v1', (req, res, next) => {

    console.log("req.cookies: ", req.cookies);

    if (!req?.cookies?.Token) {
        res.status(401).send({
            message: "include http-only credentials with every request"
        })
        return;
    }

    jwt.verify(req.cookies.Token, SECRET, function (err, decodedData) {
        if (!err) {

            console.log("decodedData: ", decodedData);

            const nowDate = new Date().getTime() / 1000;

            if (decodedData.exp < nowDate) {

                res.status(401);
                res.cookie('Token', '', {
                    maxAge: 1,
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true
                });
                res.send({ message: "token expired" })

            } else {

                console.log("token approved");

                req.body.token = decodedData
                next();
            }
        } else {
            res.status(401).send("invalid token")
        }
    });
})
app.use('/api/v1', productApis)


const __dirname = path.resolve();
app.use('/', express.static(path.join(__dirname, './web/build')))
app.use('*', express.static(path.join(__dirname, './web/build')))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

import authApis from './apis/auth.mjs';
import tweetApi from './apis/tweet.mjs';
import { userModel, messageModel } from "./dbRepo/models.mjs";
import { stringToHash, varifyHash } from 'bcrypt-inzi';




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
app.use('/api/v1', tweetApi)




const getUser = async (req, res) => {

    let _id = "";
    if (req.params.id) {
        _id = req.params.id
    } else {
        _id = req.body.token._id
    }

    try {
        const user = await userModel.findOne({ _id: _id }, "email firstName lastName -_id").exec()
        if (!user) {
            res.status(404).send({})
            return;
        } else {

            res.set({
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                "Pragma": "no-cache",
                "Expires": "0",
                "Surrogate-Control": "no-store"
            });
            res.status(200).send(user)
        }

    } catch (error) {

        console.log("error: ", error);
        res.status(500).send({
            message: "something went wrong on server",
        });
    }
}

app.get('/api/v1/profile', getUser)
app.get('/api/v1/profile/:id', getUser)

app.post('/api/v1/change-password', async (req, res) => {

    try {
        const body = req.body;
        const currentPassword = body.currentPassword;
        const newPassword = body.password;
        const _id = req.body.token._id

        // check if user exist
        const user = await userModel.findOne(
            { _id: _id },
            "password",
        ).exec()

        if (!user) throw new Error("User not found")

        const isMatched = await varifyHash(currentPassword, user.password)
        if (!isMatched) throw new Error("password mismatch")

        const newHash = await stringToHash(newPassword);

        await userModel.updateOne({ _id: _id }, { password: newHash }).exec()

        // success
        res.send({
            message: "password changed success",
        });
        return;

    } catch (error) {
        console.log("error: ", error);
        res.status(500).send()
    }

})


app.get('/api/v1/users', async (req, res) => {

    const myId = req.body.token._id

    try {
        const q = req.query.q;
        console.log("q: ", q);

        let query;

        if (q) {
            query = userModel.find({ $text: { $search: q } })
        } else {
            query = userModel.find({}).limit(20)
        }

        const users = await query.exec();

        const modifiedUserList = users.map(eachUser => {

            let user = {
                _id: eachUser._id,
                firstName: eachUser.firstName,
                lastName: eachUser.lastName,
                email: eachUser.email
            }

            if (eachUser._id.toString() === myId) {

                console.log("matched");
                user.me = true
                return user;
            } else {
                return user;
            }
        })

        res.send(modifiedUserList);

    } catch (e) {
        console.log("Error: ", e);
        res.send([]);
    }
})

app.post('/api/v1/message', async (req, res) => {

    if (
        !req.body.text ||
        !req.body.to
    ) {
        res.status("400").send("invalid input")
        return;
    }

    const sent = await messageModel.create({
        from: req.body.token._id,
        to: req.body.to,
        text: req.body.text
    })

    console.log("sent: ", sent)

    res.send("message sent successfully");
})

app.get('/api/v1/messages/:id', async (req, res) => {

    const messages = await messageModel.find({
        from: req.body.token._id,
        to: req.params.id
    })
        .populate({ path: 'from', select: 'firstName lastName email' })
        .populate({ path: 'to', select: 'firstName lastName email' })
        .limit(100)
        .exec();

    res.send(messages);

})







const __dirname = path.resolve();
app.use('/', express.static(path.join(__dirname, './web/build')))
app.use('*', express.static(path.join(__dirname, './web/build')))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


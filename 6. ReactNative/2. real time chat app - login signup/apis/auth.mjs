import express from 'express';
import { userModel, otpModel } from './../dbRepo/models.mjs'
import {
    stringToHash,
    varifyHash,
} from "bcrypt-inzi"
import jwt from 'jsonwebtoken';
import { customAlphabet } from 'nanoid'
import moment from 'moment';
import postmark from "postmark";
import twilio from 'twilio'


const SECRET = process.env.SECRET || "topsecret";
const POSTMARK_TOKEN = process.env.POSTMARK_TOKEN || "63162a07-c73b-4874-a6ce-6d9ebfe96cac"
const accountSid = process.env.TWILIO_SID || 'ACde4f32b2e2481d1ff811673558d239ba';
const authToken = process.env.TWILIO_AUTH || '1b0a00de48d5273dd99ba267e7c7852a';

let postMarkClient = new postmark.ServerClient(POSTMARK_TOKEN);
let twilioClient = twilio(accountSid, authToken);

const router = express.Router()


router.post('/signup', (req, res) => {

    let body = req.body;

    if (!body.firstName
        || !body.lastName
        || !body.email
        || !body.password
    ) {
        res.status(400).send(
            `required fields missing, request example: 
                {
                    "firstName": "John",
                    "lastName": "Doe",
                    "email": "abc@abc.com",
                    "password": "12345"
                }`
        );
        return;
    }

    req.body.email = req.body.email.toLowerCase();

    // check if user already exist // query email user
    userModel.findOne({ email: body.email }, (err, user) => {
        if (!err) {
            console.log("user: ", user);

            if (user) { // user already exist
                console.log("user already exist: ", user);
                res.status(400).send({ message: "user already exist,, please try a different email" });
                return;

            } else { // user not already exist

                // bcrypt hash
                stringToHash(body.password).then(hashString => {

                    userModel.create({
                        firstName: body.firstName,
                        lastName: body.lastName,
                        email: body.email,
                        password: hashString
                    },
                        (err, result) => {
                            if (!err) {
                                console.log("data saved: ", result);
                                res.status(201).send({ message: "user is created" });
                            } else {
                                console.log("db error: ", err);
                                res.status(500).send({ message: "internal server error" });
                            }
                        });
                })

            }
        } else {
            console.log("db error: ", err);
            res.status(500).send({ message: "db error in query" });
            return;
        }
    })
});

router.post('/login', (req, res) => {

    let body = req.body;
    body.email = body.email.toLowerCase();

    if (!body.email || !body.password) { // null check - undefined, "", 0 , false, null , NaN
        res.status(400).send(
            `required fields missing, request example: 
                {
                    "email": "abc@abc.com",
                    "password": "12345"
                }`
        );
        return;
    }

    // check if user exist
    userModel.findOne(
        { email: body.email },
        "firstName lastName email password",
        (err, data) => {
            if (!err) {
                console.log("data: ", data);

                if (data) { // user found
                    varifyHash(body.password, data.password).then(isMatched => {

                        console.log("isMatched: ", isMatched);

                        if (isMatched) {

                            const token = jwt.sign({
                                _id: data._id,
                                email: data.email,
                                iat: Math.floor(Date.now() / 1000) - 30,
                                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                            }, SECRET);

                            console.log("token: ", token);

                            res.cookie('Token', token, {
                                maxAge: 86_400_000,
                                httpOnly: true,
                                sameSite: 'none',
                                secure: true
                            });

                            res.send({
                                message: "login successful",
                                profile: {
                                    email: data.email,
                                    firstName: data.firstName,
                                    lastName: data.lastName,
                                    age: data.age,
                                    _id: data._id
                                }
                            });
                            return;
                        } else {
                            console.log("password did not match");
                            res.status(401).send({ message: "Incorrect email or password" });
                            return;
                        }
                    })

                } else { // user not already exist
                    console.log("user not found");
                    res.status(401).send({ message: "Incorrect email or password" });
                    return;
                }
            } else {
                console.log("db error: ", err);
                res.status(500).send({ message: "login failed, please try later" });
                return;
            }
        })
})

router.post('/logout', (req, res) => {

    res.clearCookie('Token', {
        httpOnly: true,
        sameSite: 'none',
        secure: true
    })
    res.send({ message: "Logout successful" });
})

router.post('/forget-password', async (req, res) => {
    try {

        let body = req.body;
        body.email = body.email.toLowerCase();

        if (!body.email) { // null check - undefined, "", 0 , false, null , NaN
            res.status(400).send(
                `required fields missing, request example: 
                {
                    "email": "abc@abc.com",
                }`
            );
            return;
        }

        // check if user exist
        const user = await userModel.findOne(
            { email: body.email },
            "firstName lastName email",
        ).exec()

        if (!user) throw new Error("User not found")

        const nanoid = customAlphabet('1234567890', 5)
        const OTP = nanoid();
        const otpHash = await stringToHash(OTP)

        console.log("OTP: ", OTP);
        console.log("otpHash: ", otpHash);

        otpModel.create({
            otp: otpHash,
            email: body.email, // malik@sysborg.com
        });


        // TODO: send otp via email // postMark sendGrid twilio
        const emailResp = await postMarkClient.sendEmail({
            "From": "info@sysborg.com",
            "To": user.email,
            "Subject": "SysBorg: One Time Password",
            "HtmlBody": `
            <div>
                <p>Hi ${user.firstName} ${user.lastName}, you requested for forget password, here is your otp, it is only valid for 5 minutes: </p>
                <h1>${OTP}</h1>
            </div>`,
            "MessageStream": "outbound"
        });
        console.log("emailResp: ", emailResp);

        // const twilioResp = await twilioClient.messages.create({
        //     body: `Hi ${user.firstName} ${user.lastName}, you requested for forget password, here is your otp, it is only valid for 5 minutes: ${OTP}`,
        //     messagingServiceSid: 'MG5d595874c297d11b3349828df8d134be',
        //     to: '+923022004480'
        // })
        // console.log("twilioResp: ", twilioResp);

        res.send({
            message: "OTP sent success",
        });
        return;

    } catch (error) {
        console.log("error: ", error);
        res.status(500).send({
            message: error.message
        })
    }



})
router.post('/forget-password-2', async (req, res) => {
    try {

        let body = req.body;
        body.email = body.email.toLowerCase();

        if (
            !body.email
            || !body.otp
            || !body.newPassword
        ) { // null check - undefined, "", 0 , false, null , NaN

            res.status(400).send(
                `required fields missing, request example: 
                {
                    "email": "abc@abc.com",
                    "otp": "12345",
                    "newPassword": "someSecretString",
                }`
            );
            return;
        }

        // check if otp exist
        const otpRecord = await otpModel.findOne(
            {
                email: body.email,
            }
        )
            .sort({ _id: -1 })
            .exec()


        if (!otpRecord) throw new Error("Invalid Opt")
        if (otpRecord.isUsed) throw new Error("Invalid Otp")

        await otpRecord.update({ isUsed: true }).exec();

        console.log("otpRecord: ", otpRecord);
        console.log("otpRecord: ", moment(otpRecord.createdOn));

        const now = moment();
        const optCreatedTime = moment(otpRecord.createdOn);
        const diffInMinutes = now.diff(optCreatedTime, "minutes")

        console.log("diffInMinutes: ", diffInMinutes);
        if (diffInMinutes >= 5) throw new Error("Invalid Otp")



        const isMatched = await varifyHash(body.otp, otpRecord.otp)
        if (!isMatched) throw new Error("Invalid OTP")

        const newHash = await stringToHash(body.newPassword);

        await userModel.updateOne(
            { email: body.email },
            { password: newHash }
        ).exec()



        // success
        res.send({
            message: "password updated success",
        });
        return;

    } catch (error) {
        console.log("error: ", error);
        res.status(500).send({
            message: error.message
        })
    }



})






export default router
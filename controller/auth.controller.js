const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, sequelize } = require('../models')
const { Op } = require('Sequelize');
// const transport = require('../config/sendmail')
const ejs = require('ejs')

// exports.userRegistration = async (req, res) => {
//     try {
//         const { firstName, middleName, lastName, email, mobileNo } = req.body;
//         const user = await User.findOne({ where: { email: email } })
//         if (user) {
//             return res.status(409).json({ message: 'Email is already exits!!' });
//         }
//         const user1 = await User.create({
//             firstName, middleName, lastName, email, mobileNo, userRoleId: 4, avatar: 'def.png', addedBy: null
//         })
//         if (!user1) {
//             return res.status(400).json({ data: `User is not registered!!` })
//         }
//         const token = jwt.sign({
//             username: email,
//         }, process.env.SECRET_KEY, { expiresIn: '5h' });
//         await User.update(
//             {
//                 resetPasswordToken: token,
//                 expireToken: new Date().getTime() + 300 * 1000
//             },
//             { where: { email: email } })

//         const templateData = {
//             firstName: firstName,
//             middleName: middleName,
//             lastName: lastName,
//             email: email,
//             url: process.env.EMAIL,
//             token: token
//         }
//         const template = await ejs.renderFile("views/setPassword.ejs", templateData);

//         const mailOptions = {

//             from: 'no-reply<fparmar986@gmail.com>',
//             to: email,
//             subject: 'Set Your Password',
//             html: template
//         }
//         transport.sendMail(mailOptions)
//         if (!transport) {
//             return res.status(404).json({ message: 'Somthing went wrong!!Can not sent mail to your email!!' })
//         }
//         else {
//             return res.status(200).json({ message: 'Registered succesfully!!' })
//         }

//     } catch (error) {
//         return res.status(400).json({ message: error.message })
//     }
// }

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body
        let user = await User.findOne({
            where: { email: username }
        })
        if (!user) {
            return res.status(409).json({ message: 'User does not exist!!', status: "fail" });
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password!!', status: "fail" });
        }
        const token = jwt.sign({
            id: user.id,
            email: user.email,
        }, process.env.SECRET_KEY, { expiresIn: '5h' });
        return res.status(200).json({ message: 'Login successfully!!', token: token, status: "success" })
    } catch (error) {
        return res.status(400).json({ message: error.message, status: "fail" })
    }
}

exports.me = async (req, res) => {
    try {
        const getLoggedinUser = await User.findByPk(req.authUser,
            {
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                }
            })
        return res.status(200).json({ data: getLoggedinUser, status: "success" })
    } catch (error) {
        return res.status(400).json({ message: error.message, status: "fail" })
    }
}

// exports.forgotPassLink = async (req, res) => {
//     try {
//         const { email } = req.body
//         const user = await Users.findOne({ where: { email: email } })
//         if (!user) {
//             return res.status(400).json({ message: 'Email does no exist!!' })
//         }
//         else {
//             const token = jwt.sign({
//                 username: user.username,
//                 id: user.id.toString()
//             }, process.env.SECRET_KEY, { expiresIn: '5m' });

//             await Users.update(
//                 {
//                     resetPasswordToken: token,
//                     expireToken: new Date().getTime() + 300 * 1000
//                 },
//                 { where: { email: email } })

//             const templateData = {
//                 url: process.env.EMAIL,
//                 token: token,
//             }
//             const template = await ejs.renderFile("views/resetPassword.ejs", templateData);

//             const mailOptions = {
//                 from: 'no-reply<fparmar986@gmail.com>',
//                 to: email,
//                 subject: 'Reset Your Password',
//                 html: template
//             }
//             transport.sendMail(mailOptions)

//             if (!transport) {
//                 return res.status(404).json({ message: 'Somthing went wrong!!Can not sent mail to your emailid!!' })
//             }
//             return res.status(200).json({ message: 'Mail sent to your emailid!!!' })
//         }
//     } catch (error) {
//         return res.status(400).json({ message: error.message })
//     }
// }

// exports.forgotPassword = async (req, res) => {
//     try {
//         const { password, resetPasswordToken, data } = req.body
//         const user = await Users.findOne({ where: { resetPasswordToken } })
//         if (!user) {
//             return res.status(400).json({ message: 'Somthing went wrong!!' })
//         }
//         else {
//             let curTime = new Date().getTime();
//             let extime = (user.expireToken).getTime();
//             let diff = extime - curTime;
//             if (diff < 0) {
//                 return res.status(400).json({ message: 'Link exprired!!, Please send again!!' })
//             }
//             const hash = bcrypt.hashSync(password, 10);
//             const updatePassword = await User.update({ password: hash }, { where: { resetPasswordToken } })
//             if (!updatePassword) {
//                 return res.status(400).json({ message: 'Password is not updated!!' })
//             }

//             await Users.update(
//                 {
//                     wrongAttempt: 0,
//                     resetPasswordToken: ""
//                 },
//                 { where: { email: user.email } })
//             if (data === 1) {
//                 return res.status(200).json({ message: 'Password Updated!!' })
//             }
//             return res.status(200).json({ message: 'Password Set!!' })
//         }
//     } catch (error) {
//         return res.status(400).json({ message: error.message })
//     }
// }
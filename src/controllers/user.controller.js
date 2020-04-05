const Users = require('../models/users');
const mongoose = require('mongoose');
const service = require('../config/service');

UsersCtrl = {};

UsersCtrl.createUser = async (req, res) => {
    const {name, borned, sex, country, password, last_name, email} = req.body;
    const emailUser = await Users.findOne({email: email});
    if (emailUser) {
       return res.status(200).send({
            status: 'fail',
            message: 'This email is already registered'
        });
    } else {
        const _id = new mongoose.Types.ObjectId();
        const newUser = new Users({
            _id, name, last_name, borned, sex, country, password, email
        }); 
        newUser.password = await newUser.encryptPassword(password); 
        await newUser.save();0
        console.log(newUser);
        return res.status(200).send({
            status: 'success',
            token: service.createToken(newUser)
            }
        );
       
    };     
};

UsersCtrl.loginUser = async (req, res) => {
    const {email, password} = req.body;
    const emailUser = await Users.findOne({email: email});
    if (emailUser) {
        const match = await emailUser.matchPassword(password)
        if (match) {
            return res.status(200).send({
               token: service.createToken(emailUser) 
            });
        } else {
            return res.status(200).send({
                status: 'fail',
                data: 'Incorrect Password'
            });
        }
    } else {
       return res.status(200).send({
            status: 'fail',
            data: 'User Not Found'
        });
    }
}



module.exports = UsersCtrl;
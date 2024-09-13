const User = require('../model/User');

const responseStatus = require("../const");
const { where } = require('sequelize');

// Used for creating account for new users
const createUserAccount = async (req, res) => {
    const { firstName, lastName, email_id, password } = req.body;
    try {
        const emailExist = await User.findOne({
            where: {
                emailId: email_id
            }
        })

        if (emailExist === null) {
            const newUser = await User.create(
                {
                    firstName: firstName,
                    lastName: lastName,
                    emailId: email_id,
                    password: password,
                    // email_verified : true
                }
            );
            res.status(responseStatus.success) // Status : OK
            res.json(
                {
                    message: "The user has been created. 😊",
                    status: responseStatus.success,
                    data: {
                        firstName, lastName, email_id, password
                    }
                })
        } else {
            res.status(responseStatus.success)
            res.json(
                {
                    message: `The user ${email_id} already exist. Try logging in 😊`,
                    status: responseStatus.success
                }
            )
        }
    } catch (err) {
        res.status(responseStatus.serverError).json({ error: 'Failed to create user', details: err.message });
    }
};

const loginUser = async (req, res) => {
    const { email_id, password } = req.body
    const user = await User.findAll({
        where: {
            emailId: email_id
        },
        logging : console.log
    })

    
    console.log('Query Result:', user);
    
    
    // User Doesn't exists
    if (user.length === 0) {
        res.status(responseStatus.unverified)
        
        res.json(
            {
                message: `Invalid Credentials. Try Again ...... 😊 `,
                status: responseStatus.unverified
            }
        )
    }
    else{
        userdata = user[0].dataValues

        res.status(responseStatus.success)
        res.json(
            {
                status : responseStatus.success,
                message : "The user exists. Logging in...... 😊",
                data : {
                    userId : userdata.userId,
                    firstName : userdata.firstName,
                    lastName : userdata.lastName,
                    email_id : userdata.emailId, 
                    email_verified : userdata.email_verified
                }
            }
        )
    }


}

module.exports = { createUserAccount, loginUser }
const User = require('../model/User');
const bcrypt = require('bcrypt');
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
        if (emailExist) {
            return res.status(responseStatus.success).json(
                {
                    message: `The user ${email_id} already exist. Try logging in 😊`,
                }
            )
        }

        try {
            const saltRounds = 10;
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    console.error("Hash Error", err)
                    return
                }
                else {
                    const newUser = User.create(
                        {
                            firstName: firstName,
                            lastName: lastName,
                            emailId: email_id,
                            password: hash,
                            // email_verified : true
                        }
                    );

                    res.status(responseStatus.success) // Status : OK
                    res.json(
                        {
                            message: "The user has been created. 😊",
                            status: responseStatus.success,
                            data: {
                                firstName,
                                lastName,
                                email_id,
                                password: hash
                                // when firstName : firstname same js allows u to write it as firstName.
                            }
                        }
                    )
                }
            });
        } catch (error) {

            res.status(responseStatus.serverError)
            res.json({
                error: "Failed to create User" + error.message,
            })
        }
    } catch (err) {
        res.status(responseStatus.serverError).json({ error: 'Failed to create user'+ err.message });
    }
};


const loginUser = async (req, res) => {
    const { email_id, password } = req.body
    const user = await User.findAll({
        where: {
            emailId: email_id
        },
        logging: console.log
    })

    console.log('Query Result:', user);
    // User Doesn't exists
    if (user.length === 0) {
        return res.status(responseStatus.unverified).json(
            {
                message: `User Doesn't Exist. Try Signing In or Try Again after some time ...... 😊 `,
            }
        )
    }
    // User Exists
    userdata = user[0].dataValues
    try {
        
        bcrypt.compare(password, userdata.password, (e, result) => {
            if (result) {
                res.status(responseStatus.success)
                res.json(
                    {
                        message: "The user exists. Logging in...... 😊",
                        data: {
                            userId: userdata.userId,
                            firstName: userdata.firstName,
                            lastName: userdata.lastName,
                            email_id: userdata.emailId,
                            email_verified: userdata.email_verified
                        }
                    }
                )

            }
            else {
                res.status(responseStatus.success)
                res.json(
                    {
                        error : "The user exists but the password is incorrect. Try again...... 😊",
                    }
                )
            }
});        
    } catch (error) {
        res.status(responseStatus.serverError).json({ error: 'Failed to create user'+ error.message });
        
    }
}

module.exports = { createUserAccount, loginUser }
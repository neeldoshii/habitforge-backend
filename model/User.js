const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database').sequelize;


const User = sequelize.define('User',
    {
        userId : {
            primaryKey : true,
            type : DataTypes.UUID,
            defaultValue : DataTypes.UUIDV4
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        emailId: {
            unique : true,
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email_verified : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        }
    }
)

console.log(User === sequelize.models.User); 

module.exports = User
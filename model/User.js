const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database').sequelize;


const User = sequelize.define('User',
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        emailId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }
)

console.log(User === sequelize.models.User); 

module.exports = User
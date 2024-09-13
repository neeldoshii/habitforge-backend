const express = require('express');
const { testConnection } = require('./configs/database');
const User = require('./model/User');
const sequelize = require('./configs/database').sequelize
const userAuthenticationRoutes = require('./routes/userAuthenticationRoutes');
// require("./configs/dbinit") //sucks recently for console





const app = express();
const PORT = process.env.PORT





// Test the connection of the database
testConnection()

app.listen(PORT, () => {
    console.log(`The server is listening on Port :  ${PORT}`);
})

app.use(express.json())

//Routes

// User Authentication Route (Login, Signup)
app.use('/api/users', userAuthenticationRoutes); 

async function getdata() {
    try {
        const users = await User.findAll();
        console.log(users.every(user => user instanceof User)); // true
        console.log('All users:', JSON.stringify(users, null, 1));
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

//   getdata();
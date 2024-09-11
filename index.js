const express = require('express');
const { testConnection } = require('./configs/database');
const User = require('./model/User');
const sequelize = require('./configs/database').sequelize
// require("./dbinit") sucks recently for console





const app = express();
const PORT = process.env.PORT





// Test the connection of the database
testConnection()

app.listen(PORT, () => {
    console.log(`The server is listening on Port :  ${PORT}`);
})

app.use(express.json())

//Routes


// Test
app.get("/", (req, res) => {
    res.json(
        {
            message: "This is test response"
        }
    )
    res.send("as");
})





app.post('/users', async (req, res) => {
    const { firstName, lastName, email_id, password } = req.body;
    try {
        const responseStatus = 200
        const newUser = await User.create(
            {
                firstName: firstName,
                lastName: lastName,
                emailId: email_id,
                password: password
            }
        );
        // res.status(200).json(newUser);
        res.status(responseStatus) // Status : OK
        res.json(
            {
                message: "The user has been created. 😊",
                status: responseStatus,
                data: {
                    firstName, lastName, email_id, password
                }
            })
    } catch (err) {
        res.status(500).json({ error: 'Failed to create user', details: err.message });
    }
});

// async function getdata() {


// }

// // Call the getdata function
// getdata();

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

User.findAll({
    attributes: ["emailId"]
}).then( (data) => {
    const list = data.map(data=>data.dataValues.emailId)
    console.log(list);
    
}


).catch(err => { console.log(err.message); }
)
console.clear();


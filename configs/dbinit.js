const sequelize = require("./database").sequelize

sequelize.sync({ alter: true }) // `force: true` drops the table if it already exists
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Error syncing database:', err));


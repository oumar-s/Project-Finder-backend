const express = require("express");
const db = require("./models");
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Hello World');
    
});


db.sequelize.sync({force: false});
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
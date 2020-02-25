const express = require('express')
const app = express()
const mongoose = require('mongoose')
// const Router = require('./routes')
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
dotenv.config();

const playerRoutes = require('./routers/Player');
const gameRoutes = require('./routers/Game');


//Connexion Mongoose 
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to MongoDB"));


// Views
app.set('views', './views');
app.set('view engine','ejs');

//Routes
app.get('/',(req,res) => {
    res.redirect('/games');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// app.use(Router);
app.use('/players', playerRoutes);
app.use('/games', gameRoutes);

//Server 
app.listen(3034, () => {
    console.log("Listening at :3034...");
});


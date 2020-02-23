const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Router = require('./routes')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();



//Connexion Mongoose 
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to MongoDB"));


// Views
app.set('views', './views');
app.set('view engine','ejs');

//Routes
app.get('/',(req,res) => {
    res.send('Dart Master');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(Router);


//Server 
app.listen(3034, () => {
    console.log("Listening at :3000...");
});

//commentaire pour tester mon problème de merge ( deuxieme api)
const cors = require('cors');
const corsOptions ={
    // origin:'http://localhost:4200',   //改
    origin:'https://successful-dinosaurs.surge.sh',   //改
    credentials:true            //access-control-allow-credentials:true
}
// const upCloud = require('./src/uploadCloudinary')
const auth = require('./src/auth');
const articles = require('./src/articles');
const following = require('./src/following');
const profile = require('./src/profile');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userSchema = require('./src/userSchema');
const articleSchema = require('./src/articleSchema');
const User = require('./src/dbConnect').Users
const connectionString = 'mongodb+srv://admin:111@cluster0.b7a2d.mongodb.net/social?retryWrites=true&w=majority';


// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


const hello = (req, res) => res.send({ hello: 'world' });

const addUser = (req, res) => {
    (async () => {
        const connector = mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
        // TODO: add a user to the database
        let newUser = await (connector.then(()=> {
            return new User({username:req.params.uname, created:Date.now()}).save();
        }));
        res.send({name: newUser.username});
    })();

};

const app = express();
var hateoasLinker = require('express-hateoas-links');
const session = require("express-session");
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.get('/', hello);
app.post('/users/:uname', addUser);
app.use(hateoasLinker);

auth(app);
articles(app);
profile(app);
following(app);



// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
     const addr = server.address();
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
});

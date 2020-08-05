require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const app = express();

app.disable('x-powered-by')

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static('node_modules'));
app.use(express.static('public'));
app.use(bodyParser.json());

app.use(session({
    secret: process.env.S,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());



const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log('Server has started');

//Database config

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://" + process.env.DB_Connection_User + ":" + process.env.DB_Connection_Password + "@cluster0-q4rxm.azure.mongodb.net/MerryBrew?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useCreateIndex", true);

//DB models


const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    favourites: [{ cocktailName: String, cocktailImage: String }]
});

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//POSTS

app.post('/user/register', function (req, res) {
    User.register(new User({ username: req.body.username }),
        req.body.password, function (err, account) {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({
                    status: 'Registration successful!'
                });
            });
        });
});


app.post('/user/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            res.status(200).json({
                status: 'Login successful!',
            });
        });
    })(req, res, next);
});

app.post('/user/addFavourite', function (req, res) {
    let favourite = { "cocktailName": req.body.cocktailName, "cocktailImage": req.body.cocktailImage }
    User.findOneAndUpdate({ username: req.session.passport.user }, { $addToSet: { favourites: favourite } }, function (err, user) {
        if (err) {
            return res.status(400).send("Failed to add favourite")
        } else
            return res.status(200).send("Added!")
    })
})

app.post('/user/deleteFavourite', function (req, res) {
    let favouriteToDelete = { "cocktailName": req.body.cocktailName }
    User.findOneAndUpdate({ username: req.session.passport.user }, { $pull: { favourites: favouriteToDelete } }, function (err, user) {
        if (err) {
            return res.status(400).send("Failed to delete favourite")
        } else
            return res.status(200).send("Deleted!")
    })
})

//GETS

app.get('/user/logout', function (req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});

app.get('/user/status', function (req, res) {
    if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false
        });
    }
    res.status(200).json({
        status: true
    });
});

app.get('/user/getFavourites', function (req, res) {

    User.find({ username: req.session.passport.user }, 'favourites', function (err, docs) {
        if (err) {
            res.status(400).send("Couldn't get favourites")
        } else {
            res.status(200).send(docs);
        }
    })
        .lean();
})


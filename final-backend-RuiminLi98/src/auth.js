const md5 =require('md5')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require("express-session");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const {Profiles} = require("./dbConnect");
const redis = require('redis').createClient(
    'redis://:p464977279243076c3d7d6e45f9d0fa01d29b847df4ba3afb19211cae5c332412@ec2-52-87-136-67.compute-1.amazonaws.com:7599');
const Users = require('./dbConnect').Users
const Profile = require('./dbConnect').Profiles
let sessionUser = {};
let cookieKey = "sid";
let userObjs = {};

function isLoggedIn(req, res, next) {
    // if (req.isAuthenticated()) {
    //     req.username = req.user.username
    //     next();
    //     return;
    // }
    if (!req.cookies) {
        res.sendStatus(401);
        return
    }

    let sid = req.cookies[cookieKey];
    if (!sid) {
        res.sendStatus(401);
        return
    }

    let username = undefined;
    redis.hget("temp", -1, (err, item) => {
        redis.hget("sessions", item, (err, item) =>{
            username = item;
            if (username) {
                req.username = username;
                next();
            }
            else {
                res.sendStatus(401)
                return
            }
        })
    })


}

function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    // supply username and password
    if (!username || !password) {
        res.sendStatus(400);
        return
    }

    Users.find({username: username}).exec(function(err,items) {
        if (items.length === 1) {
            const user = {username: items[0].username, salt: items[0].salt, hash: items[0].hash}
            // TODO: create hash using md5, user salt and request password, check if hash matches user hash
            let hash = md5(user.salt + password);
            if (hash === user.hash) {
                // TODO: create session id, use sessionUser to map sid to user username
                let sid = md5(user.hash + user.salt);
                sessionUser[sid] = user.username;
                redis.hmset("sessions",sid,user.username);
                redis.hmset("temp",-1,sid);
                // Adding cookie for session id
                res.cookie(cookieKey, sid, { maxAge: 3600 * 1000, httpOnly: true ,sameSite:"none", secure: true});
                let msg = {username: username, result: 'success'};
                res.send(msg);
            }
            else {
                res.status(401);
            }
        }
        else {
            res.status(401);
        }
    })
}

function register(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    // supply username and password
    if (!username || !password) {
        res.sendStatus(400);
        return
    }


    let salt = md5(username + new Date().getTime());
    let hash = md5(salt + password);// TODO: Change this to use md5 to create a hash

    userObjs[username] =  {username: username, salt: salt, hash: hash} // TODO: Change this to store object with username, salt, hash

    Users.find({username:username}).exec(function(err, items) {
        if (items.length > 0) {
            res.status(200).send({result:'the username already exist'})
            return
        }

        if (items.length === 0) {
            new Users({
                username: username,
                salt: salt,
                hash: hash
            }).save()
            new Profile({
                username: username,
                headline: username + 's initial headline',
                followers: [],
                email: req.body.email,
                zipcode: req.body.zipcode,
                dob: req.body.dob,
                displayName: req.body.displayName,
                phone: req.body.phone,
                avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg'
            }).save()
        }
        let msg = {username: username, result: 'success'};
        res.send(msg);
    })


}

function logout(req, res) {
    let temp = req.cookies[cookieKey];
    delete sessionUser[temp];
    res.clearCookie(cookieKey)
    res.send({result: 'logout success'})
}


passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});
passport.use(new GoogleStrategy({
            clientID: '880135531616-ggpsutl1ng8tm6gr6hl56rmlvhjp64ss.apps.googleusercontent.com',
            clientSecret: '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',
            // callbackURL: "http://localhost:3000/auth/google/callback"    //改
            callbackURL: "http://ruiminli-final.herokuapp.com/auth/google/callback"    //改
        },
        function(accessToken, refreshToken, profile, done) {
            process.nextTick(function() {
                return done(null, profile);
            })
        })
);

function googleLogin(req, res) {
    if (!req.isAuthenticated()) {
        res.sendStatus(401);
        return
    }
    const user = req.user;
    const id = user.id;
    const username = user.name.givenName + " " + user.name.familyName;
    Users.find({username: username}, function(err, items) {
        const item = items[0];
        if (!item) {
            let salt = md5(username + new Date().getTime());
            let hash = md5(salt + 111);// TODO: Change this to use md5 to create a hash
            Users.find({username: username}).exec(function (err, items) {
                if (err) {
                    return done(err)
                }
                if (items.length === 0) {
                    new Users({
                        username: username,
                        salt: salt,
                        hash: hash
                    }).save()
                    new Profile({
                        username: username,
                        headline: username + 's initial headline',
                        followers: [],
                        email: "rl88@rice.edu",
                        zipcode: 12345,
                        dob: new Date().getTime(),
                        displayName: username,
                        phone: 111 - 111 - 1111,
                        avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg'
                    }).save(function (err, result) {
                        tempFunc(id, username, res)
                    });
                }
            })
        }
        else {
            tempFunc(id, item.username, res);
        }
    })
}


function tempFunc(id, username, res) {


        // Bad request
        if (!username || !id) {
            res.sendStatus(400);
            return
        }

        Users.find({username: username}, function (err, userObjs) {
            // Unauthorized request.
            var userObj = userObjs[0];
            if (!userObj) {
                res.sendStatus(401);
                return
            }

            // Success login
            let sid = md5(userObj.hash + userObj.salt);
            sessionUser[sid] = username;
            redis.hmset("sessions",sid,username);
            redis.hmset("temp",-1,sid);
            // Set cookie
            res.cookie(cookieKey, sid, {maxAge: 3600 * 1000, httpOnly: true});
            // res.redirect('http://localhost:4200/main/');
            res.redirect('https://successful-dinosaurs.surge.sh/main/');
        });




    // if (!username) {
    //     res.sendStatus(400);
    //     return
    // }
    // Users.find({username: username}).exec(function(err, items) {
    //     const item = items[0];
    //     if (!item) {
    //         res.sendStatus(400)
    //         return
    //     }
    //     let sid = md5(item.hash + item.salt);
    //     sessionUser[sid] = username;
    //     redis.hmset("sessions",sid,username);
    //     res.cookie(cookieKey, sid, { maxAge: 3600 * 1000, httpOnly: true ,sameSite:"none", secure: true});
    //     res.redirect('http://localhost:4200/main/');
    // })





    // Users.find({username: username}).exec(function(err,items) {
    //     console.log("test exisst:"+items.length)
    //     if (items.length === 1) {
    //         const user = {username: items[0].username, salt: items[0].salt, hash: items[0].hash}
    //         // TODO: create hash using md5, user salt and request password, check if hash matches user hash
    //         let hash = md5(user.salt + 111);
    //         if (hash === user.hash) {
    //             // TODO: create session id, use sessionUser to map sid to user username
    //             let sid = md5(user.hash + user.salt);
    //             sessionUser[sid] = user.username;
    //             redis.hmset("sessions",sid,user.username);
    //             console.log("create:"+sid)
    //             // Adding cookie for session id
    //             res.cookie(cookieKey, sid, { maxAge: 3600 * 1000, httpOnly: true ,sameSite:"none", secure: true});
    //             res.redirect('http://localhost:4200/main/');
    //         }
    //         else {
    //             res.status(401);
    //         }
    //     }
    //     else {
    //         res.status(401);
    //     }
    // })
}

module.exports = (app) => {
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.post('/login', login);
    app.post('/register', register);
    app.use(session({secret: 'doNotGuessTheSecret', resave: true, saveUninitialized: true}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.get('/auth/google', passport.authenticate('google',{ scope: ['https://www.googleapis.com/auth/plus.login'] }));
    app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/googleLogin', failureRedirect: '/' }));
    app.get('/googleLogin', googleLogin)
    // app.get('/auth/google/callback', passport.authenticate('google', { successRedirect: 'https://successful-dinosaurs.surge.sh/main/', failureRedirect: '/' }));
    app.use(isLoggedIn);
    app.put('/logout', logout);


}
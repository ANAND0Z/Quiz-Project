const express=require('express');
const path=require('path');
const router=express.Router();
require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const MicrosoftStrategy = require('passport-microsoft').Strategy;
const connection = require('./db');


router.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));


router.use(passport.initialize());
router.use(passport.session());



passport.use(new MicrosoftStrategy({
  authorizationURL: process.env.MICROSOFT_AUTHORIZATION_URL,
  tokenURL: process.env.MICROSOFT_TOKEN_URL,
  clientID: process.env.MICROSOFT_CLIENT_ID,
  clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
  callbackURL: process.env.MICROSOFT_CALLBACK_URL,
  scope: ['user.read']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;

    const getUser = () => {
      return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    };

    const rows = await getUser();

    if (!rows || rows.length === 0) {
      return done(null, false, { message: 'User not allowed' });
    }

    return done(null, rows[0]);

  } catch (err) {
    console.error('Error in MicrosoftStrategy:', err);
    return done(err);
  }
}));




passport.serializeUser((user, done) => done(null, user.id));


passport.deserializeUser(async (id, done) => {
  try {
    const getUserById = () => {
      return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
    };

    const rows = await getUserById();

    if (!rows || rows.length === 0) {
      return done(null, false);
    }

    done(null, rows[0]);
  } catch (err) {
    done(err);
  }
});




router.get('/auth/microsoft', passport.authenticate('microsoft'));


router.get('/auth/microsoft/callback',
  passport.authenticate('microsoft', { failureRedirect: '/' }),
  (req, res) => {
    if (req.user.role === 'admin') {
      return res.redirect('/admin');
    } else {
      return res.redirect('/user');
    }
  }
);




router.get('/admin', (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== 'admin') return res.redirect('/');
    res.sendFile(path.join(__dirname, '..', 'views', 'adminmain.html'));
});

router.get('/user', (req, res) => {
  if (!req.isAuthenticated() || req.user.role !== 'user') return res.redirect('/');
  const username = req.user.username;
  const year = req.user.year;
  const dept = req.user.dept;
  const section = req.user.section;

  res.redirect(`/code.html?username=${username}&year=${encodeURIComponent(year)}&dept=${encodeURIComponent(dept)}&section=${encodeURIComponent(section)}`);
});






router.get('/',(req,res)=>{
    try{
    res.sendFile(path.join(__dirname,'..','views','index.html'));
    console.log('index file taken');
    }catch(error){
        console.error(error);
    }
});



router.get('/code.html',(req,res)=>{
    try{
    res.sendFile(path.join(__dirname,'..','views','code.html'));
    console.log('code file taken');
    }catch(error){
        console.error(error);
    }
});






module.exports=router;




const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const FacebookTokenStrategy = require("passport-facebook-token");
const User = require("../models/Users");
const config = require("./Keys");

// JSON WEB TOKENS STRATEGY
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: config.secretOrKey
    },
    (payload, done) => {
      // Find the user specified in token
      User.findById(payload.sub)
        .then((user) => {
          // If user doesn't exists, handle it
          if (!user) {
            return done(null, false);
          } 
            // Otherwise, return the user
           return done(null, user);
        
        })
        .catch(err=>console.log(err));
    }
  )
);

//Google Strategy
passport.use(
  "google",
  new GooglePlusTokenStrategy(
    {
      clientID: config.googleAuth.clientID,
      clientSecret: config.googleAuth.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      // Should have full user profile over here
      // console.log("profile", profile);
      // console.log("accessToken", accessToken);
      // console.log("refreshToken", refreshToken);

      User.findOne({ "google.id": profile.id })
        .then((existingUser) => {
          if (existingUser) {
            return done(null, existingUser);
          } else {
            const newUser = new User({
              method: "google",
              google: {
                id: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName,
                avatar: profile.photos[0].value
              }
            });

            newUser.save().then((user) => {
              return done(null, user);
            });
          }
        })
        .catch((err) => console.log(err));
    }
  )
);

//Facebook Strategy
passport.use(
  "facebook",
  new FacebookTokenStrategy(
    {
      clientID: config.facebookAuth.clientID,
      clientSecret: config.facebookAuth.clientSecret,
      profileFields: ["id", "displayName", "photos", "email"]
    },
    (accessToken, refreshToken, profile, done) => {
      // Should have full user profile over here
      // console.log("profile", profile);
      // console.log("accessToken", accessToken);
      // console.log("refreshToken", refreshToken);

      User.findOne({ "facebook.id": profile.id })
        .then((existingUser) => {
          if (existingUser) {
            return done(null, existingUser);
          } else {
            const newUser = new User({
              method: "facebook",
              facebook: {
                id: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName,
                avatar: profile.photos[0].value
              }
            });
            newUser.save().then((user) => {
              return done(null, user);
            });
          }
        })
        .catch((err) => console.log(err));
    }
  )
);

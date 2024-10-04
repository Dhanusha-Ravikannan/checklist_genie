const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:5002/google/callback",
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    try {
      const email = profile.email;
      const userPosition = request.body.userPosition  || "DEVELOPER";

      const user = await prisma.user.upsert({
        where: { email: email },
        update: {
          name: profile.displayName,
          image: profile.photos[0]?.value || null,
          created_at: new Date(),
        },
        create: {
          email: email,
          name: profile.displayName,
          image: profile.photos[0]?.value || null,
          created_at: new Date(),
        }
      });

      const organisation = await prisma.organisation.upsert({
        where: { 
          organisation: email.substring(email.lastIndexOf("@") + 1, email.lastIndexOf("."))
        },
        update: {
          created_at: new Date(),
        },
        create: {
          organisation: email.substring(email.lastIndexOf("@") + 1, email.lastIndexOf(".")),
           
          created_at: new Date(),
        }
      });

     const org_user= await prisma.organisation_Users.upsert({
        where: {
          organisation_id_user_id: {
            organisation_id: organisation.id,
            user_id: user.id
          }
        },
        update: {
          user_position: userPosition,  
           created_at: new Date(),
        },
        create: {
          organisation_id: organisation.id,
          user_id: user.id,
          user_position: userPosition,  
          created_at: new Date(),
        }
      });

      const org_user_position = await prisma.organisation_User_position.upsert({
        where : {
          organisation_user_id_user_id : {
          organisation_user_id :org_user.id,
          user_id : user.id,
          }
        },
        update : {
          user_position: userPosition,
          created_at : new Date(),
        },
        create : {
          organisation_user_id : org_user.id,
          user_id : user.id,
          user_position: userPosition,
          created_at : new Date(),
        }
      })

      return done(null, 
        {
       
        organisation : organisation.id,
        organisation_user_id:org_user.id,
        name: user.name,
        email: user.email,
      });

    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;

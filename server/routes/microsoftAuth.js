const express = require("express");
const passport = require("passport");
const MicrosoftStrategy = require("passport-microsoft").Strategy;
const { PrismaClient } = require("@prisma/client");
const { generateToken } = require("../utils/jwt");
const { CLIENT_URL } = require("../config/config");

const prisma = new PrismaClient();
const router = express.Router();

passport.use(
    new MicrosoftStrategy(
        {
            clientID: process.env.MICROSOFT_ID,
            clientSecret: process.env.MICROSOFT_SECRET,
            callbackURL: process.env.CALL_BACK_URL1,
            tenant: "common",
            authorizationURL: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
            tokenURL: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
            scope: ["user.read"],
            prompt: "select_account",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails && profile.emails[0]?.value;
                const name = profile.displayName;
                const tenantId = profile._json.tenantId;

                const user = await prisma.user.upsert({
                    where: { email: email },
                    update: {
                      name: profile.displayName,
                      image: profile.photos?.value || null,
                      created_at: new Date(),
                    },
                    create: {
                      email: email,
                      name: profile.displayName,
                      image: profile.photos?.value || null,
                      created_at: new Date(),
                    },
                  });
          
                  const organisation = await prisma.organisation.upsert({
                    where: {
                      organisation: email.substring(
                        email.lastIndexOf("@") + 1,
                        email.lastIndexOf(".")
                      ),
                    },
                    update: {
                      created_at: new Date(),
                    },
                    create: {
                      organisation: email.substring(
                        email.lastIndexOf("@") + 1,
                        email.lastIndexOf(".")
                      ),
                      created_at: new Date(),
                    },
                  });
          
                  let org_user = await prisma.organisation_Users.findFirst({
                    where: {
                      organisation_id: organisation.id,
                      user_id: user.id,
                    },
                  });
          
                  if (org_user) {
                    org_user = await prisma.organisation_Users.update({
                      where: {
                        id: org_user.id, 
                      },
                      data: {
                        created_at: new Date(),
                      },
                    });
                  } else {
                    org_user = await prisma.organisation_Users.create({
                      data: {
                        organisation_id: organisation.id,
                        user_id: user.id,
                        created_at: new Date(),
                      },
                    });
                  }
          
                  return done(null, {
                    organisation: organisation.id,
                    organisation_user_id: org_user.id,
                    user_id: user.id,
                    name: user.name,
                    email: user.email,
                  });
                } catch (error) {
                  return done(error, null);
                }
              }
            )
          );
          passport.serializeUser(function (user, done) {
            done(null, user);
          });
          
          passport.deserializeUser(function (user, done) {
            done(null, user);
          });
          

router.get("/", passport.authenticate("microsoft", { prompt: "select_account" }));

router.get( "/callback", passport.authenticate("microsoft", { failureRedirect: "/login" }),
    (req, res) => {
        try {
           const user = req.user;
           const token = generateToken(user);
           console.log("🚀 ~ process.env.CLIENT_URL:", process.env.CLIENT_URL)
           res.redirect(`${CLIENT_URL}/user/Login1/?token=${token}`);
        } catch (error) {
            console.error("Error in callback processing:", error);
            res.status(500).send("Authentication failed. Please try again.");
        }
    }
);

router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error("Error during logout:", err);
            return res.status(500).json({ error: "Logout failed. Please try again." });
        }
        res.redirect(process.env.CLIENT_URL);
    });
});

module.exports = router;

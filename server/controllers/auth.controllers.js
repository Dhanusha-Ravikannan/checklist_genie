const { CLIENT_URL } = require('../config/config');
const { generateToken } = require('../utils/jwt');
const { sendOtpEmail } = require('./mail.controllers');

const bcrypt = require('bcrypt');
const passport = require('passport');

const crypto = require('crypto');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const googleCallback = (req, res) => {

  const user = req.user;

  const token = generateToken(user);
 
  console.log(user)

  console.log(token)
  
  res.redirect(`${CLIENT_URL}/user/Login1/?token=${token}`)
};

const requestRegistrationOtp = async (req, res) => {
  const { name, email, password, organisationName } = req.body;

  if (!name || !email || !password || !organisationName) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: { email: email, isVerified: true },
    });

    if (existingUser) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    await prisma.otp.upsert({
      where: { email },
      update: { otp },
      create: { email, otp },
    });

    // Send the OTP via email
    await sendOtpEmail(email, otp);

    res.status(200).json({ message: 'OTP has been sent to your email. Please verify to complete registration.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error while sending OTP.' });
  }
};

const verifyOtpAndRegister = async (req, res) => {
  const { name, email, password, organisationName, otp } = req.body;

  if (!name || !email || !password || !organisationName || !otp) {
    return res.status(400).json({ error: 'All fields including OTP are required.' });
  }

  try {
    const otpRecord = await prisma.otp.findUnique({ where: { email } });

    if (!otpRecord || otpRecord.otp !== otp) {
      return res.status(400).json({ error: 'Invalid or incorrect OTP.' });
    }

    const otpAgeInMinutes = (new Date() - otpRecord.createdAt) / (1000 * 60);
    if (otpAgeInMinutes > 10) {
      return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const organisation = await prisma.organisation.upsert({
      where: { organisation: organisationName },
      update: {},
      create: { organisation: organisationName, created_at: new Date() },
    });

    await prisma.$transaction(async (tx) => {
        await tx.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                isVerified: true, // mark verified user
                created_at: new Date(),
                OrganisationUsers: {
                    create: {
                        organisation_id: organisation.id,
                        user_type: "USER",
                    },
                },
            },
        });
        // Delete udes OTP
        await tx.otp.delete({ where: { email } });
    });

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.log(error);
    if (error.code === 'P2002') {
        return res.status(409).json({ error: 'An account with this email already exists.' });
    }
    res.status(500).json({ error: 'Server error during registration.' });
  }
};

const loginUser = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({
        message: info ? info.message : 'Login failed',
        user: user,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
    
      const token = generateToken(user);
      return res.json({ token });
    });
  })(req, res, next);
};


const failure = (req, res) => {
  res.send('Failed...!');
};


module.exports = { googleCallback, failure, requestRegistrationOtp, verifyOtpAndRegister, loginUser };



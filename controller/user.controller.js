const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../models/User');

const secretOrKey = config.get('secretOrKey');

module.exports.userController = {
  register: async (req, res) => {
    const {
      email, name, password, phone, role,
    } = req.body;
    try {
      const searchResult = await User.findOne({ email });
      if (searchResult) {
        res.status(400).json({ errors: 'User already Exist ' });
        return;
      }
      const newUser = new User({
        email,
        name,
        password,
        phone,
        role,
      });
      console.log(role);
      bcrypt.genSalt(11, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          try {
            const addResult = await newUser.save();
            res.status(201).json({ addResult });
          } catch (error) {
            res.status(500).json({ errors: error });
          }
        });
      });
    } catch (error) {
      res.status(500).json({ errors: error });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const searchResult = await User.findOne({ email });
      if (!searchResult) {
        res.status(400).json({ errors: 'Email not found' });
        return;
      }
      const isMatch = await bcrypt.compare(password, searchResult.password);
      if (!isMatch) {
        res.status(400).json({ errors: 'Bad Password' });
        return;
      }
      const payload = {
        /* eslint-disable */
        id: searchResult._id,
        name: searchResult.name,
        email: searchResult.email,
        phone: searchResult.phone,
        role: searchResult.role,
      };

      jwt.sign(payload, secretOrKey, (err, token) => {
        if (err) throw err;
        res.json({
          token: `Bearer ${token}`,
          role: payload.role,
          id: payload.id,
        });
      });
    } catch (error) {
      res.status(500).json({ errors: error });
    }
  },
};

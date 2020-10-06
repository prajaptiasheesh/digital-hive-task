const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Types = mongoose.Schema.Types;
const { jwtSecret, wlogger } = require('../config/index');

const { IncorrectCredentialsError } = require('../errrors/errors');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  role: {
    type: String,
    default: 'user'
  },
  last_name: {
    type: String
  },
  first_name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    index: { unique: true }
  },
  isDeveloper: {
    type: Boolean
  },
  schooling: {
    type: String,
  },
});

UserSchema.methods.comparePassword = async function (password) {
  const isMatched = await bcrypt.compare(password, this.password );
  
  
  return isMatched;
};

const User = module.exports = mongoose.model('Candidate', UserSchema);


module.exports.updateProfile = async function(newData, user) {
  try {
    const result = await User.findByIdAndUpdate({_id: user._id}, newData, {new: true});
    return result;
  }
  catch (err) {
    throw err;
  }
};

module.exports.registerUser = async (newUser) => {

  const hashedPassword = await bcrypt.hash(newUser.password.trim(), 10);

  const user = {
    email: newUser.email,
    password: hashedPassword,
    fname: newUser.fname,
    lname: newUser.lname,
    mobile: newUser.mobile
  }

  try {

    user.email = newUser.email.trim();

    const createdUser = new User(user);
    const token = jwt.sign({ id: createdUser.id, email: createdUser.email }, jwtSecret, {
      algorithm: 'HS256',
      expiresIn: "2 Days" //2 days expiry
    });

    const result = await createdUser.save();
    let json = result.toJSON();

    json.token = token;
    return json;

  } catch (error) {

    throw error;

  }
};

module.exports.getUserByEmail = async function (email) {
  const user = await User.findOne({ 'email': email });
  return user;
};

module.exports.getUserById = async function (id) {
  try {
    const user = await User.findOne({ '_id': id }).populate('document_id')
    return user;
  }
  catch (err) {
    
    wlogger.error(error);
    throw err;
  }
};





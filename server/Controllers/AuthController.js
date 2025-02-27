const User = require("../Models/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, name, createdAt } = req.body;
    
    // Validate input
    if(!email || !password || !name) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists", success: false });
    }
    
    const user = await User.create({ email, password, name, createdAt });
    const token = createSecretToken(user._id);
    
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    return res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user, token: token });
    
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Server error during signup", success: false });
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if(!email || !password) {
      return res.status(400).json({ message: 'All fields are required', success: false });
    }
    
    const user = await User.findOne({ email });
    if(!user) {
      return res.status(401).json({ message: 'Invalid Email', success: false }); 
    }
    
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(401).json({ message: 'Incorrect password', success: false }); 
    }
    
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    return res.status(200).json({ message: "User logged in successfully", success: true, user, token: token });
     
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error during login", success: false });
  }
};

module.exports.updateLanguage = async (req, res, next) => {
  try {
    const { userId, language } = req.body;
    if (!userId) {
      return res.status(400).json({ message: 'User ID not found.', success: false });
    }

    const user = await User.findByIdAndUpdate(userId, { language }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found', success: false });
    }

    return res.status(200).json({ message: "Language updated successfully", success: true, user });
  } catch (error) {
    console.error("Update language error:", error);
    return res.status(500).json({ message: 'An error occurred while updating language', success: false });
  }
};
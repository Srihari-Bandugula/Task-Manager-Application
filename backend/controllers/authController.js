const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({id : userId},process.env.JWT_SECRET,{expiresIn:"7d"});
};

// @desc Register a new user
// @route POST/api/auth/register
// @access public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, adminInviteToken } = req.body;
    const profileImageUrl = req.body.profileImageUrl; // Get the image URL from the body

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Determine user role: admin if correct token is provided, otherwise member
    let role = "member";
    if (adminInviteToken && adminInviteToken === process.env.ADMIN_INVITE_TOKEN) {
      role = "admin";
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl, // Store the profile image URL in the database
      role,
    });

    // Return user data with JWT
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImageUrl: user.profileImageUrl, // Include image URL in response
      token: generateToken(user._id), // Token generation method
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// @desc login user
// @route POST/api/auth/register
// @access public
const loginUser = async(req,res) => {
  try{
    const {email, password} = req.body;

    const user = await User.findOne({ email });
    if(!user){
      return res.status(401).json({ message: "Invalid email or password" });

    }

    //compare password
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImageUrl: user.profileImageUrl,
      token: generateToken(user._id),
    });
    
  }catch(error){
    res.status(500).json({message: "Server error",error:error.message});
    
  }
};

// @desc get user profile
// @route GET/api/auth/register
// @access private (Requires JWT)
const getUserProfile= async(req,res) => {
  try{
    const user=await User.findById(req.user.id).select("-password");
    if(!user){
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  }
  catch(error){
    res.status(500).json({message: "Server error",error:error.message});
  }

  
};

module.exports={registerUser,loginUser,getUserProfile}; 
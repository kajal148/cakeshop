import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc Auth user & get token
// @route POST api/users/auth
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body; 

    //get the user from the database
    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))){ 
        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }else{
        res.status(401); //unauthorized
        throw new Error("Invalid Email or Password");
    }
});

// @desc Register user
// @route POST api/users
// @access Public
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;
    const userExist = User.findOne({ email });

    if(!userExist){
        res.status(400);
        throw new Error('User Already Exists');
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
})

// @desc Logout user & clear cookie
// @route POST api/users/logout
// @access Private
const logoutUser = asyncHandler(async(req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({
        message: "Logged out successfully"
    });
});

// @desc Get user profile
// @route GET api/users/profile
// @access Public
const getUserProfile = asyncHandler(async(req, res) => {
    const user = await  User.findById(req.user._id);

    if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    }
})

// @desc update user profile
// @route PUT api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        if(req.body.name) user.name = req.user.name || user.name ;
        if(req.body.email) user.email = req.user.email || user.email;
        if(req.body.password) user.password = req.body.password;
        
        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    }else{
        res.status(404);
        throw new Error('User not Found');
    }
})

// @desc Get users
// @route PUT api/users
// @access Private/Admin
const getUserbyId = asyncHandler(async(req, res) => {
    res.send("Get User by ID");
})

// @desc get all users
// @route PUT api/users/:id
// @access Private/Admin
const getUsers = asyncHandler(async(req, res) => {
    res.send("Get all users");
})

// @desc get users by ID
// @route PUT api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async(req, res) => {
    res.send("update User");
})

// @desc Delete users
// @route DELETE api/users
// @access Private/Admin
const deleteUser = asyncHandler(async(req, res) => {
    res.send("Delete User");
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserbyId,
    updateUser,
    deleteUser
}
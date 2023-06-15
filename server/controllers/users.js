const bcrypt = require('bcryptjs');
const user = require('../models/users');

//@desc     Get all users
//@route    GET /api/v1/auth
//@access   Public

exports.getUsers = async (req, res) => {
// Get all users from database
const users = await User.find();
if(!users) {
return res.json({
status: "error",
error: "No users found"
});
}
res.json({
status: 200,
users: users
});
};

//@desc     Register a user
//@route    POST /api/v1/auth
//@access   Public

exports.registerUser = async (req, res) => {
const { name, email, password } = req.body;

try {
const existingUser = await User.findOne({ 
email: email,
});
if(existingUser) {
throw new Error("User already exists");
}
const hashedPassword = await bcrypt.hash(password, 10);
const user = await User.create({
name: name,
email: email,
password: hashedPassword,
});

res.json({
status: 200,
user: {
    name: user.name,
    email: user.email,
},
});
} 
catch (error) {
logger.error(error);
res.json({
status: 500,
error: "Invalid email",
});
}
};

//@desc     Login a user
//@route    POST /api/v1/auth
//@access   Public

exports.loginUser = async (req, res) => {
const {email, password} = req.body;

try {
const user = await User.findOne({
email: email,
});

if(!user) {
return {
    status: 404,
    error: "User not found",
}
}
const isPasswordCorrect = await bcrypt.compare(password, user.password);
if(isPasswordCorrect) {
    return res.json({
        status: 200,
        user: user,
    });
}
else {
    return res.json({
        status: 404,
        user: false,
    });
}
}
catch (error) {
logger.error(error);
res.json({
    status: 500,
    error: "Invalid login",
});
}
};

//@desc     Update a user
//@route    PUT /api/v1/auth
//@access   Public

exports.updateUser = async (req, res) => {
const {email, password} = req.body;
const userId = req.params.id;
try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findByIdAndUpdate(userId, {
        $set: {
            email: email,
            password: hashedPassword,
        },
    });

    if(!user) {
        return res.json({
            status: 404,
            error: "User not found",
        });
    }
    res.json({
        status: 200,
        user: user,
    });
}
catch (error) {
    logger.error(error);
    res.json({
        status: 500,
        error: "Invalid user",
    });
}
};

//@desc     Delete a user
//@route    DELETE /api/v1/auth
//@access   Public

exports.deleteUser = async (req, res) => {
const userId = req.params.id;

try {
    const user = await User.findByIdAndDelete(userId);
    if(!user) {
        return res.json({
            status: 404,
            error: "User not found",
        });
    }
    res.json({
        status: 200,
        user: user,
    });
}
catch (error) {
    logger.error(error);
    res.json({
        status: 500,
        error: "Invalid user",
    });
}
};



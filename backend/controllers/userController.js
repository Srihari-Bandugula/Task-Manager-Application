const Task = require("../models/Task");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// @desc GET all users{admin only}
// @route GET /api/users/
// @access Private(Admin)
const getUsers = async(req,res) =>{
    try{
        const users = await User.find({role:"member"}).select("-password");        
        //add task count to each user
        const usersWithTaskCounts = await Promise.all(
            users.map(async (user) =>{
                const pendingTasks = await Task.countDocuments({
                    assignedTo:user._id,
                    status:"Pending",
                });
                const inProgressTasks = await Task.countDocuments({
                    assignedTo:user._id,
                    status:"In Progress",
                });
                const completedTasks = await Task.countDocuments({
                    assignedTo:user._id,
                    status:"Completed",
                });

                return {
                    ...user._doc,
                    pendingTasks,
                    inProgressTasks,
                    completedTasks,
                }
            })
        );
        res.json(usersWithTaskCounts)

    }
    catch(error)
    {
        res.status(500).json({message:"Server error",error:error.message});
    }
};
    

module.exports = {getUsers}; 

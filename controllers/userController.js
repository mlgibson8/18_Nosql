const { User, Thoughts,} = require('../models');

module.exports = {
    // get all users
   async getUsers(req, res) {
        try{
            const user = await User.find();
             res.json(user);
        } catch (err) {
         res.status(500).json(err);
        }
    },
    // get a single user by its _id and populated thought and friend data
    async getSingleUser(req, res) {
        try{
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');
    if (!user) {
    return res.status(404).json({ message: 'No user found with this id!' });}
    res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // post a new user:
    async createUser(req, res) {
        try{
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // delete a user and associated thoughts
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            await Thoughts.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and associated thoughts deleted!' });
        } catch (err) {
            res.status(500).json(err);

        }
    },
    // update a user by its _id
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate (
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            )
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    // add a new friend to a user's friend list
    async addUserFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // remove a friend from a user's friend list
    async deleteUserFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);

        }   
    }
};

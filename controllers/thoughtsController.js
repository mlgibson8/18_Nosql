const {Thoughts, User } = require('../models');

module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thoughts.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get a single thought by its _id
    async getSingleThoughts(req, res) {
        try {
            const thoughts = await Thoughts.findOne({ _id: req.params.thoughtsId })
            .select('-__v');
            if (!thoughts) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thoughts);        } 
        catch (err) {
            res.status(500).json(err);
        }
    },
    // create a new thought 
    async createThoughts(req, res) {
        try {
            const thoughts = await Thoughts.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thoughts._id } },
                { new: true }
            )
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
              res.status(200).json(thoughts);
                 } catch (err) {
            res.status(501).json(err, 'error');
        }
    },
    // update a thought by its _id
    async updateThoughts(req, res) {
        try {
            const thoughts = await Thoughts.findOneAndUpdate({ _id: req.params.thoughtsId }, { $set: req.body }, { runValidators: true, new: true });
            if (!thoughts) {
                return res.status(404).json({ message: 'No thought found with this id!' });
             }
            res.json(thoughts)
        } catch (err) {
            res.status(501).json(err);
        }
    },
    // delete a thought by its _id
    async deleteThoughts(req, res) {
        try {
            const thoughts = await Thoughts.findOneAndRemove({ _id: req.params.thoughtsId });
            if (!thoughts) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtsId },
                { $pull: { thoughts: req.params.thoughtsId } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(thoughts);
        } catch (err) {
            res.status(502).json(err);
        }
    },
    // add a reaction to a thought
    async addReaction(req, res) {
        try {
            const reactions = await Thoughts.findOneAndUpdate(
                {_id: req.params.thoughtsId},
                {$addToSet: {reactions: req.body}},
                {runValidators: true, new: true}
            );
             if (!reactions) {
                return res.status(404).json({ message: 'No reactions found with this id!' });
            }
            
            res.json(reactions);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    // remove a reaction from a thought
    async deleteReaction(req, res) {
        try {
           const reactions = await Thoughts.findOneAndUpdate(
                {_id: req.params.thoughtsId},
                {$pull: {reactions: {reactionsId: req.body.reactionsId}}},
                {runValidators: true, new: true}
            );
        
            res.json(reactions);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};



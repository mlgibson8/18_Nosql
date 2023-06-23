const { User, Thoughts } = require('../models');
module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await thoughts.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get a single thought by its _id
    async getSingleThoughts(req, res) {
        try {
            const thoughts = await thoughts.findOne({ _id: req.params.thoughtsId })
            res.json(thoughts)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create a new thought 
    async createThoughts(req, res) {
        try {
            const thoughts = await thoughts.create(req.body);
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // update a thought by its _id
    async updateThoughts(req, res) {
        try {
            const thoughts = await thoughts.findOne({ _id: req.params.thoughtsId })
            res.json(thoughts)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // delete a thought by its _id
    async deleteThoughts(req, res) {
        try {
            const thoughts = await thoughts.findOne({ _id: req.params.thoughtsId })
            res.json(thoughts)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // add a reaction to a thought
    async addReaction(req, res) {
        try {
            const thoughts = await thoughts.findOne({ _id: req.params.thoughtsId })
            res.json(thoughts)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // remove a reaction from a thought
    async deleteReaction(req, res) {
        try {
            const thoughts = await thoughts.findOne({ _id: req.params.thoughtsId })
            res.json(thoughts)
        } catch (err) {
            res.status(500).json(err);
        }
    },



};


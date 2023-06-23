// get to get all thoughts
// get to get a single thought by its _id
// post to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

const router = require('express').Router();
const {
    getThoughts,
    getSingleThoughts,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtsController');

router.route('/').get(getThoughts).post(createThoughts);
router.route('/:thoughtId').get(getSingleThoughts).put(updateThoughts).delete(deleteThoughts);
router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction);

module.exports = router;
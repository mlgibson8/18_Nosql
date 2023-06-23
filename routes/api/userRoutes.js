// api/users 
// get all users, 
//get a single user by its _id and populated thought and friend data
// post a new user:

const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addUserFriend,
    deleteUserFriend,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addUserFriend).delete(deleteUserFriend);

module.exports = router;
const express = require('express');
const {
    getUsers,
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
} = require('../controllers/users');
const router = express.Router();

router.get("", getUsers);
router.post("", registerUser);
router.post("", loginUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
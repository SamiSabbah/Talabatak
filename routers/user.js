const express = require('express');

const router = express.Router();

router.get('/', getUsers);
router.get('/multiple', getUsersByIDs);
router.get('/:id', getUser);
router.patch('/update', updateUser);

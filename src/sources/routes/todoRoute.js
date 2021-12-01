const express = require('express');
const { model } = require('mongoose');
const app = express();
const router = express.Router();
const todoController = require('../controllers/todoControllers');

// todo/create
router.get('/create', todoController.direct_create );

// todo/store : post
router.post('/store', todoController.create);

// /todo/
router.get('/', todoController.get_all_todolist);

module.exports = router;
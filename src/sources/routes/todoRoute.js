const express = require('express');
const { model } = require('mongoose');
const app = express();
const router = express.Router();
const todoController = require('../controllers/todoControllers');

// todo/create
router.get('/create', todoController.direct_Create );

// todo/store : post
router.post('/store', todoController.create);

// todo/
router.get('/', todoController.get_All_Todolist);

// todo/:slug
router.get('/:slug', todoController.get_Todo_By_Slug);

// todo/update/:id
router.get('/update/:_id', todoController.direct_Update);

// todo/update/:id
router.put('/update/:_id', todoController.update);

// todo/:id
router.delete('/:_id', todoController.delete_Todo);

module.exports = router;
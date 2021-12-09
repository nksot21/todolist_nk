const express = require('express');
const { model } = require('mongoose');
const app = express();
const router = express.Router();
const todoController = require('../controllers/todoControllers');

// todo/create
router.get('/create', todoController.direct_Create );

// todo/store : post
router.post('/store', todoController.create);

// todo/update/:id
router.get('/update/:_id', todoController.direct_Update);

// todo/update/:id
router.put('/update/:_id', todoController.update);

// todo/trash/
router.get('/trash', todoController.get_Trash);

// todo/restore/
router.patch('/restore/:_id', todoController.restore);

// todo/deletedb/:id_ : delete from database
router.delete('/deletedb/:_id', todoController.deleteBD);

// todo/handlecontrol
router.post('/handlecontrol', todoController.handleControl);

// todo/handlecontroltrash
router.post('/handlecontroltrash', todoController.handleControlTrash);

// todo/:slug
router.get('/:slug', todoController.get_Todo_By_Slug);

// todo/:id
router.delete('/:_id', todoController.delete_Todo);

// todo/
router.get('/', todoController.get_All_Todolist);

module.exports = router;
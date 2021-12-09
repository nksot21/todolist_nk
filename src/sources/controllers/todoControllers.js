const express = require('express');
const { model } = require('mongoose');
const app = express();
const todo_Model = require('../models/todoModels');
const detail_Controller = require('./detailController');

const todoController = {
    // [GET] : todo/
    // find all todo_item
    get_All_Todolist: 
        (req, res, next) =>{
            Promise.all([todo_Model.countDocumentsDeleted(), todo_Model.find(), todo_Model.countDocuments() ])
            .then(([delNum, todos, num]) => { 
                res.render('todo/todolist', {todos: detail_Controller.arr_To_Object(todos), num, delNum})
            })
            .catch((err)=>{
                res.json(err.message)
            });
        },

    // [GET] : todo/create
    // go to create_page
    direct_Create: 
        (req, res, next) => {
            res.render('todo/create');
        },
    
    //[POST] : todo/store
    // create a new todo_item
    create: 
        (req, res, next) => {
            const todonew = new todo_Model(req.body);
            todonew.save()
            .then((response)=> {
                res.redirect('/todo')
            })
            .catch((err) => {
                res.json("message: err");
            }) 
        },
    
    //[GET] : todo/:slug
    get_Todo_By_Slug:
        (req, res, next) => {
            todo_Model.find({slug: req.params.slug})
            .then((todos) => {
                res.render('todo/todolist', {todos: detail_Controller.arr_To_Object(todos)});
            })
            .catch((err) => {
                res.json(err.message)
            });
        },

    //[GET] : todo/update/:_id
    direct_Update:
        (req, res, next) => {
            todo_Model.findById({_id: req.params._id})
            .then((todo) => {
                res.render('todo/update', {todo: detail_Controller.ele_To_Object(todo)});
            })
            .catch((err) => {
                res.json(err.message)
            });
        },
    

    //[PUT] : todo/update/:_id
    update :
        (req, res, next) =>{
            todo_Model.updateOne({_id: req.params._id}, req.body)
            .then((todo) => {
                res.redirect('/todo')
            })
            .catch((err) =>{
                res.json(err.message);
            });
        },
    
    // [DELETE] : todo/:_id
    delete_Todo:
        (req, res, next) => {
            todo_Model.delete({_id: req.params._id})
            .then((todo) => {
                res.redirect('/todo');
            })
            .catch((err) =>{
                res.json(err.message);
            })
        },   
        
    //[GET] :todo/trash
    get_Trash:
        (req, res, next) => {
            todo_Model.findDeleted()
            .then((todos) =>{
                res.render('todo/trash', {todos: detail_Controller.arr_To_Object(todos)});
            })
            .catch((err) =>{
                res.json(err.message);
            })
        },
    
    // [PATCH] todo/restore/:_id
    restore:
        (req, res, next) => {
            todo_Model.restore({_id: req.params._id})
            .then((result) =>{
                res.redirect('/todo')
            })
            .catch((err) => {
                res.json(err.message)
            })
     },

    // [DELETE] todo/deletedb/:id_
    deleteBD:
        (req, res, next) =>{
            todo_Model.deleteOne({_id: req.params._id})
            .then((result) =>{
                res.redirect('/todo/trash')
            })
            .catch((err) => {
                res.json(err.message)
            })
        },
    
    // [POST] todo/handlecontrol : delete todos
    handleControl:
        (req, res, next) =>{
            todo_Model.delete({_id: {$in: req.body.todoIds}})
            .then((todo) => {
                res.redirect('/todo');
            })
            .catch((err) =>{
                res.json(err.message);
            })
        },

    // [POST] todo/handlecontroltrash : restore
    handleControlTrash:
        (req, res, next) =>{
            todo_Model.restore({_id: {$in: req.body.todoIds}})
            .then((result) =>{
                res.redirect('/todo')
            })
            .catch((err) => {
                res.json(err.message)
            })
        }
}

    

module.exports = todoController;
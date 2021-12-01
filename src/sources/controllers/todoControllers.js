const express = require('express');
const { model } = require('mongoose');
const app = express();
const todo = require('../models/todoModels')

const todoController = {
    // [GET] : todo/
    get_all_todolist: 
        (req, res, next) =>{
            todo.find()
            .then((todos) => {
                res.json(todos)
            })
            .catch((err =>{
                res.json('message: err.message')
            }))
        },

    // [GET] : todo/create
    direct_create: 
        (req, res, next) => {
            res.render('todo/create');
        },
    
    //[POST] : todo/store
    create: 
        (req, res, next) => {
            const todonew = new todo(req.body);
            todonew.save()
            .then((response)=> {
                res.send('success')
            })
            .catch((err) => {
                "message: err"
            }) 
        },
        
}

module.exports = todoController;
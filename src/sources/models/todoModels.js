const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const todo_Item = new Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        default: 'no description'
    },
    status: {
        type: Boolean,
        default: false
    },
    slug: { 
        type: String, 
        slug: "title" }
});

//PLUGIN
mongoose.plugin(slug);
todo_Item.plugin(mongooseDelete, { deletedAt : true , overrideMethods: 'all'});


module.exports = mongoose.model('todo_Item', todo_Item);
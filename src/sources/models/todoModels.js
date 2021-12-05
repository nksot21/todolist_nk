const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

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

module.exports = mongoose.model('todo_Item', todo_Item);
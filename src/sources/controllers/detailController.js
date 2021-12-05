const express = require('express');
const { model } = require('mongoose');
const app = express();

detailController = {
    arr_To_Object: function(arr)
    {
        return arr.map(ele => ele.toObject());
    },
    ele_To_Object: function(ele)
    {
        const ele_Obj = ele.toObject();
        return ele_Obj;
    }
}

module.exports = detailController
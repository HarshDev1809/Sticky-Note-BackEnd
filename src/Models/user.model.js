const mongoose = require("mongoose");
const {userType} = require("../Utils/constants");

const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true,
    },

    lastName : {
        type : String,
        required : false,
        default : "",
    },

    userName : {
        type : String,
        required : true,
        minLength : 4
    },

    emailId:{
        type: String,
        require: true
    },

    password : {
        type: String,
        required: true,
        minLength: 8
    },

    notes : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "notesData",
        required : true,
        default : []
    }

});

const User = mongoose.model("userDataStickyNotes",userSchema);

module.exports = User;




const mongoose = require('mongoose');
//var Schema = mongoose.Schema;

const memberSchema = new mongoose.Schema({
    name: {type: String, required:true},
    nationality: {type: String, required: true},
    dateOfBirth: {type: Date, required: true},
    nationalID: {type: Number, required: true},
    bloodType: {type: String, required: true},
    type: {type: String},
},{
    timestamps:true,
});

var Member = mongoose.model('Member', memberSchema);

module.exports = Member;
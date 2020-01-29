const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const hospitalSchema = new mongoose.Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    member: [{
        type: Schema.Types.ObjectId,
        ref: 'Member'
    }]
});

var Hospital = mongoose.model("Hospital", hospitalSchema)

module.exports = Hospital;
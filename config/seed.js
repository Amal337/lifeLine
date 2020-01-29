var mongoose = require('mongoose');
//var Schema = mongoose.Schema;

var db = require('../config/db');

mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB is running'),(err) => console.log(err));

var Hospital = require('../app/models/hospital');
var Member = require('../app/models/member');

var donorOne = new Member({
    name: "Ward Ahmad",
    nationality: "SA"
});

var donorTow = new Member({
    name: "BodyBad",
    nationality: "USA"
});

donorOne.save(function(err,savedDO){
    if (err){
        return console.log(err);
    }else {
        console.log("Donor Saved successfuly")
    }
});

donorTow.save((err,savedDT) => {
    if (err){
        console.log(err);
    } else {
        console.log("Donor Saved Successfuly")

    }
});

var kf = new Hospital({
    name: "King Fahad",
    location: "Jeddah",
    bloodDonor: []
});

kf.member.push(donorOne);
kf.member.push(donorTow);

kf.save(function(err, saved){
    if (err){
        return console.log(err);
    } else {
        console.log(saved)
    }
});
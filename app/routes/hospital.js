const express = require('express');

const Hospital = require('../models/hospital')

const router = express.Router();
const methodOverride = require('method-override');


router.use(express.urlencoded());
router.use(methodOverride('_method'));

// Index Router // all hospital
router.get('/hospital', (req,res) => {
    Hospital.find()
    .populate('member')
    .then(function(hospital) {
        res.render('../app/views/hospital/index.ejs',{hospital:hospital})
    })
    .catch(function(error){
        res.status(500).json({error:error});
    });
});


// Show Router By id
router.get('/hospital/:id', function(req,res){
    Hospital.findById(req.params.id)
    .populate('member')
    .then(function(hospital){
        if (hospital){
            res.render('../app/views/hospital/show.ejs',{hospital:hospital})
        } else {
            res.status(404).json({
                error: {
                    name: 'DocumentNotFoundError',
                    message: 'The provided ID doesnt\'t match any documents'
                }
            });
        }
    })
    .catch(function(error){
        res.status(500).json({error: error})
    });
});

// Create Router
router.get('/createHospital', function(req,res){
    res.render('../app/views/hospital/create.ejs')
});

// Create Router
router.post('/hospital', (req, res) =>{
    Hospital.create(req.body)
    .then(function(hospital){
        res.render('../app/views/hospital/index.ejs',{hospital:hospital})
    })
    .catch(function(error){
        res.status(500).json({error: error})
    });
});

// Edit Router
router.get('/hospital/:id/edit', (req,res) => {
    Hospital.findById(req.params.id, (err, foundHospital) => {
        res.render('../app/views/hospital/edit.ejs',{hospital: foundHospital})
    })
})


// Update routes
router.put('/hospital/:id', (req,res) => {
    Hospital.findByIdAndUpdate(req.params.id, req.body , {new:true})
    .then(function(hospital){
        if (hospital){
            //hospital.update(req.body,{new:true})
            res.redirect('/hospital')

        } else {
            res.status(404).json({
                error: {
                    name: "DocumentNotFoundError",
                    message: "The provided ID doesn\'t match any documents"
                }
            });
        }
    })
    .then(function() {
        res.status(204).end();
    })
    .catch(function(error){
        res.status(500).json({error: error})
    });
});

// // update routes
// router.patch('/hospital/:id', (req,res) => {
//     Hospital.findById(req.params.id)
//     .then(function(hospital){
//         if (hospital){
//             return hospital.update(req.body)
//         } else {
//             res.status(404).json({
//                 error: {
//                     name: "DocumentNotFoundError",
//                     message: "The provided ID doesn\'t match any documents"
//                 }
//             });
//         }
//     })
//     .then(function() {
//         res.status(204).end();
//     })
//     .catch(function(error){
//         res.status(500).json({error: error})
//     });
// });


// Delete Router
router.delete('/hospital/:id', (req,res) => {
    Hospital.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/hospital')
    });
    // Hospital.findById(req.params.id)
    // .then(function(hospital){
    //     if (hospital){
    //         hospital.remove()
    //         res.redirect('/hospital')
    //         //return hospital.remove()
    //     } else {
    //         res.status(404).json({
    //             error: {
    //                 name: 'DocumentNotFoundError',
    //                 message: 'The provided ID doesn\'t match any documents'
    //             }
    //         });
    //     }
    // })
    // .then(function(){
    //     res.status(204).end();
    // })
    // .catch(function(error){
    //     res.status(500).json({error: error})
    // });
});

module.exports = router;
const express = require('express');

const router = express.Router();

router.get('/', (req,res) => {
    //res.send("Good Morning Warda");
    res.render('../app/views/home/index.ejs')    
});

module.exports = router;
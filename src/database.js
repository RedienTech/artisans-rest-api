const mongoose = require('mongoose');

const url = 'mongodb://localhost/artisans';

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(db => {
        console.log("mongoDB Database is Connected".blue);
        
    })
    .catch(err => {
        console.log(err);
        
    });

module.exports = mongoose;

// This error function will only be invoked if there's an error in the REQUEST PROCESSING PIPELINE
const winston = require('winston');
// Express Function for handling errors which has 4 parameters
module.exports = function(err,req,res,next){  
    // Winston will log the error on the console & in the log file which was created in index.js
    // The level of this logging will be error but you can also pass info,debug etc.  
    winston.error(err.message,err);    
    res.status(500).send('Something Failed.');
}
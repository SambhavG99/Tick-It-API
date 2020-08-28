require('express-async-errors');
const winston = require('winston');

// process.on('uncaughtException', (err) => winston.error(err.message,err)); // Handling any uncaught exception
module.exports = function() {
    winston.handleExceptions(
        new winston.transports.Console({colorize:true, prettyPrint: true}),   
        new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    );
    
    process.on('unhandledRejection', (err) =>{
        throw err; // Giving control to winston exception handler
    }); // Handling any uncaught exception
    
    winston.add(winston.transports.File, { filename:'logfile.log' });
}
const helmet = require('helmet');
const genreRouter = require('../routes/genreRouter');
const customerRouter = require('../routes/customerRouter');
const movieRouter = require('../routes/moviesRouter');
const rentalRouter = require('../routes/rentalRouter');
const userRouter = require('../routes/userRouter');
const auth = require('../routes/auth');
const error = require('../middleware/error');


module.exports = function(express,app){
    app.use(express.json());
    app.use(express.urlencoded( {extended: true} ));
    app.use(helmet());
    app.use('/api/genres',genreRouter);
    app.use('/api/customers',customerRouter);
    app.use('/api/movies', movieRouter);
    app.use('/api/rental', rentalRouter);
    app.use('/api/users' , userRouter);
    app.use('/api/auth' , auth);
    app.use(error)
};
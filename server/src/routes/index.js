const userRouter = require('./user.route')

const {notFound, errorHandle} = require('../middlewares/errorHandler')

const initRoutes = (app) =>{
    app.use('/v1/api/user', userRouter)


    app.use(notFound)
    app.use(errorHandle)
}

module.exports = initRoutes
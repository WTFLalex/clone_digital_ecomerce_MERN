// const notFound = (req, res, next) =>{
//     const error = new Error(`Route ${req.orginalUrl} not found!`)
//     error.status = 404
//     next(error)
// }

// const errorHandle = (error, req, res, next) => {
//     const statusCode = error.status || 500
//     return res.status(statusCode).json({
//         status: 'ERROR',
//         code: statusCode,
//         message: error.message || 'Internal Server Error'
//     })
// }


const notFound = (req, res, next) => {
    const error = new Error(`Route ${req.orginalUrl} not found!`)
    res.status(404)
    next(error)
}

const errorHandle = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    return res.status(statusCode).json({
        success: false,
        mes: error?.message
    })
}

module.exports = {
    notFound, 
    errorHandle
}
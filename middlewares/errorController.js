const errorController = (err,req,res,next) => {
    console.log(err);

    res.status(err.httpStatus || 500).send({
        status: 'error',
        message: err.message
    })
}

export default errorController;
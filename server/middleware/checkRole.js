const checkPatientRole = async (req,res,next) => {

    if(req.body.role === 'Patient'){
        next();
    }
    else {
        res.status(500).json( {message:"Access Denied"} );
    }
}


const checkDoctor = async (req,res,next) => {

    if(req.body.role === 'Doctor'){
        next();
    }
    else {
        res.status(500).json( {message:"Access Denied"} );
    }
}

const checkAdmin = async (req,res,next) => {

    if(req.body.role === 'Admin'){
        next();
    }
    else {
        res.status(500).json( {message:"Access Denied"} );
    }
}
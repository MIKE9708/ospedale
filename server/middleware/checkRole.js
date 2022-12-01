const checkRole =(role)=>{

    return async (req,res,next) => {
        if(role==role){
            next();
        }
        else {
            res.status(500).json( {message:"Access Denied"} );
        }
    }
}

module.exports = checkRole;


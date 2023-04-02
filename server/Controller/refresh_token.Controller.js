const jwt = require ( 'jsonwebtoken');
const sql = require('../database/db');



exports.handleRefreshToken = async(req,res) => {
    const cookies = req.cookies;
    
    if(!cookies?.jwt){
        return res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;

    sql.query('select * from token where token = ?',[refreshToken],(err,result) => {

        if(err){
            return res.sendStatus(500);
        }
        else if (result.length === 0){
            return res.sendStatus(403);
        }
        else {
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN,
                (err,decode) => {
                    if(err || result[0].username !== decode.username){
                        return res.sendStatus(403);   
                    }
                    const role = decode.role;
                    const access_token = jwt.sign(
                            {
                            "username":result[0].username,
                            "role": decode.role,
                            "id":decode.id
                            },
                        process.env.ACCESS_TOKEN,
                        {"expiresIn":'15m'}
                        
                    );
                    res.status(200).json({role,access_token,username:result[0].username,id:decode.id});
                }
            )
        }
    })

}

exports.handleAdminRefreshToken = async(req,res) => {
    const cookies = req.cookies;
    
    if(!cookies?.jwt){
        return res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;

    sql.query('select * from admin_token where token = ?',[refreshToken],(err,result) => {

        if(err){
            return res.sendStatus(500);
        }
        else if (result.length === 0){
            return res.sendStatus(403);
        }
        else {
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN,
                (err,decode) => {
                    if(err || result[0].username !== decode.username){
                        return res.sendStatus(403);   
                    }
                    const role = decode.role;
                    const access_token = jwt.sign(
                            {
                            "username":result[0].username,
ù                            },
                        process.env.ACCESS_TOKEN,
                        {"expiresIn":'15m'}
                        
                    );
                    res.status(200).json({role,access_token,username:result[0].username,id:decode.id});
                }
            )
        }
    })

}




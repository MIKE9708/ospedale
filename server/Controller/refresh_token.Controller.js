const jwt = require ( 'jsonwebtoken');



const handleRefreshToken = async(req,res) => {
    const cookies = req.cookies;
    
    if(!cookies?.jwt){
        return res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;
    
    sql.query('select * from token where token= ?',[refreshToken],(err,res) => {
        if(err){
            return res.sendStatus(500);
        }
        else if (!res){
            return res.sendStatus(403);
        }
        else {
            jwt.verify(
                refreshToken,process.env.REFRESH_TOKEN,
                (err,decode) => {
                    if(err || res.username !== decode.username){
                        return res.sendStatus(403);   
                    }
                    const role = res.role;

                    const access_token = jwt.sign(

                        {"UserInfo":
                            {
                            "username":res.username,
                            "role": refreshToken.role
                            }
                        },
                        process.env.ACCESS_TOKEN,
                        {"expiresIn":'15m'}
                        
                    );
                    res.json({role,access_token});
                }
            )
        }
    })

}


module.exports = handleRefreshToken;
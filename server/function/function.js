const sql = require('../database/db');
const nodemailer = require('nodemailer');


exports.delete_expired = ()=>{
    let time = new Date()
    time.setHours(time.getHours());
    time=time.toISOString().slice(0, 19).replace('T', ' ');

    sql.query("DELETE FROM admin WHERE email = (SELECT email FROM admin_activation WHERE time < ?)",[time],(err,_)=>{
        if(err){
            console.log(err);
        }
        else{
            sql.query("DELETE FROM admin_activation WHERE time<?",[time],(err,_)=>{
                if(err){
                    console.log(err);
                }

            })
        }
        
    })
}

exports.delete_expired_device_check = ()=>{
    let time = new Date()
    time.setHours(time.getHours());
    time=time.toISOString().slice(0, 19).replace('T', ' ');

    sql.query("DELETE FROM device_code_check WHERE time < ?)",[time],(err,_)=>{
        if(err){
            console.log(err);
        }
        else{
            return;
        }
        
    })
}




exports.create_salt = (len) => {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    let result = "";

    for( let i=0; i<len; i++ ){
        result += characters.charAt( Math.floor( Math.random() * charactersLength ) );
    }

    return result;
}


exports.send_mail=(obj)=>{
    let result = "OK";
    const transporter = nodemailer.createTransport({
        port: 465,               // true for 465, false for other ports
        host: "smtp.gmail.com",
           auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS_MAIL,
             },
        secure: true,
        });

    const mailData = {from: process.env.EMAIL,  // sender address
        to: obj.to,   // list of receivers
        subject: obj.subject,
        text: obj.text,
        html: obj.html
      };
    transporter.sendMail(mailData, (err, info)=>{
        if(err){
          console.log(err);
          result= "Errore durante l'operazione";
        }
        else {
            result= "OK";
        }
    })
    return result;
}
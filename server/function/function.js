


exports.create_salt = (len) => {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    let result = "";
    for( let i=0; i<len; i++ ){
        result += characters.charAt( Math.floor( Math.random() * charactersLength ) );
    }

    return result;
}



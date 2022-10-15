const express= require("express");
const cors = require("cors");
const {Wallets,Gateway}= require('fabric-network');
const fabricGateway = require('./middleware/fabricConnect');
const corsOptions = require('./config/corsOptions'); 
const path=require('path');
const fs=require('fs');
require('dotenv').config({path:'../.env'});
global.database = require('./database/db');

const app= express();

app.use(cors(corsOptions,{credentials:true}));
app.use(fabricGateway);
//app.use('/Login/',require( './routes/Users/LoginUser' ));
//app.use('/refreshToken/',require('./routes/refreshToken/refreshToken'));
//app.use(CheckAdminMiddleware);
app.use('/Users',require('./routes/Users/AddUsers'))
app.use( '/Dottore/' , require('./routes/Doctor/Doctor'));
app.use('/Admin/',require('./routes/Admin/Admin'));
app.use('/Record',require('./routes/Record/Record'));

app.listen(8060,async()=>{
    const ccpPath=path.resolve(__dirname,'..','..','test-network','organizations','peerOrganizations','org1.example.com','connection-org1.json');
    global.ccp=JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    global.gateway=new Gateway();
    const walletPath = path.join(process.cwd(),'/wallet');
    global.wallet = await Wallets.newFileSystemWallet(walletPath);

    console.log("API running on http://localhost:8060");
    
})



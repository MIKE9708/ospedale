require('dotenv').config({path:'../.env'});

const express= require("express");
const cors = require("cors");
const {Wallets,Gateway} = require('fabric-network');
const fabricGateway = require('./middleware/fabricConnect');
const corsOptions = require('./config/corsOptions'); 
const path = require('path');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const originCheck = require('./middleware/checkOrigin');
const bodyParseer= require('body-parser');
const verifyJWT = require('./middleware/verifyToken');

global.database = require('./database/db');
const app= express();

app.use(cookieParser());
app.use(bodyParseer.json());
app.use(originCheck);
app.use(cors(corsOptions,{credentials:true}));

app.use('/Login/',require( './routes/Users/LoginUser' ));
app.use('/Logout/',require( './routes/Users/LogoutUser' ));
app.use('/Admin/',require('./routes/Admin/Admin'));

app.use('/refresh/',require('./routes/refreshToken/refreshToken'));
//app.use(CheckAdminMiddleware);
app.use(verifyJWT);
app.use(fabricGateway);

app.use( '/Dottore/' , require('./routes/Doctor/Doctor'));
app.use('/Record',require('./routes/Record/Record'));

app.use('/Users',require('./routes/Users/AddUsers'))

app.listen(8060,async()=>{

    const ccpPath=path.resolve(__dirname,'..','..','test-network','organizations','peerOrganizations','org1.example.com','connection-org1.json');
    global.ccp=JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    global.gateway = new Gateway();
    const walletPath = path.join(process.cwd(),'/wallet');
    global.wallet = await Wallets.newFileSystemWallet(walletPath);

    console.log("API running on http://localhost:8060");
    
})



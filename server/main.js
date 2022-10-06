const express= require("express");
const cors = require("cors");
const {Wallets,Gateway}= require('fabric-network');
const fabricGateway = require('./middleware/fabricConnect');
require('dotenv').config({path:'../.env'});

const app= express();
global.database = require('./database/db');

app.use(fabricGateway);
app.use('/Login/',require( './routes/Users/LoginUser' ));
//app.use(CheckAdminMiddleware);
app.use('/Users',require('./routes/Users/AddUsers'))




app.listen(8060,async()=>{
    const ccpPath=path.resolve(__dirname,'..','..','test-network','organizations','peerOrganizations','org1.example.com','connection-org1.json');
    global.ccp=JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
    global.gateway=new Gateway();
    const walletPath = path.join(process.cwd(),'/wallet');
    global.wallet = await Wallets.newFileSystemWallet(walletPath);

    console.log("API running on http://localhost:8060");
    
})
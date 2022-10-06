
const gatewayConnectionTetstChain= async (req,res,next)=>{
    try{
        await gateway.connect(ccp,{wallet,identity:'appUser',discovery:{enabled:true,asLocalhost:true}});
        const network=await gateway.getNetwork('mychannel');
        global.contract=network.getContract('ospedale');
        next();
    }
    catch(error){
        console.log(error);
        await gateway.disconnect();
        res.status(500).json()
    }
}

module.exports = gatewayConnectionTetstChain;
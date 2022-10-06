#echo "Pulizia rete"
./network.sh down

#echo "Creazione rete e Canale"
./network.sh up createChannel -ca -s couchdb

#echo "Installazione CC"
./network.sh deployCC -ccn ospedale -ccp ../ospedale/chaincode/  -ccl typescript -ccv 1 

#Variabili di ambiente
export PATH=${PWD}/../bin:$PATH  
export FABRIC_CFG_PATH=$PWD/../config/
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051


rm -r ../ospedale/server/wallet/*
cd ../ospedale/server/addUser

node AddAdmin.js && node AddUser.js

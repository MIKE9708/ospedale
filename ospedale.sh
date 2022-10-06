#echo "Pulizia rete"
cd ../test-network/
./network.sh down

#echo "Creazione rete e Canale"
./network.sh up createChannel -ca -s couchdb

#echo "Installazione CC"
./network.sh deployCC -ccn ospedale -ccp ../ospedale/chaincode  -ccl typescript -ccv 1 

#Variabili di ambiente
export PATH=${PWD}/../test-network/bin:$PATH  
export FABRIC_CFG_PATH=$PWD/../test-network/config/
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/../test-network/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/../test-network/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051

#echo "INIT LEDGER"
#peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n basic --peerAddresses localhost:7051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt" --peerAddresses localhost:9051 --tlsRootCertFiles "${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt" -c '{"function":"InitLedger","Args":[]}'

rm -r ../ospedale/server/wallet
cd ../ospedale/server/addUsers

node AddAdmin.ts && node AddUser.ts
#peer lifecycle chaincode package mychaincode_node_1.0.tar.gz --path ../comunita/chaincode/ --lang node --label mychaincode_node__1.0

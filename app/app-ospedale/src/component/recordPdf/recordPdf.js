import React from 'react';
import { Page, Text, View, Document,StyleSheet ,Image} from '@react-pdf/renderer';
import Record from '../../media/images/recordLogo.png'
import { ReactComponent as Back } from '../../media/back.svg';
import { useState } from 'react';

const styles = StyleSheet.create({
    
    page: {
      display:"flex",
      flexDirection: 'column',
      backgroundColor: '#E4E4E4',
      width:"90%",
      margin:"auto",
      marginTop:20,
      borderRadius:8,
      marginBottom:30
    },
    section: {
      display:"flex",
      flexDirection:"row",
      padding: 20,
      marginLeft:220
    },
    fieldTitle:{
        fontWeight:800,
        fontSize:20,
        paddingRight:10

    },
    field:{
        fontWeight:500,
        fontSize:20,
        paddingRight:20

    },

    title:{
        fontSize:30,
        fontWeight:900,
        paddingTop:10
    },

    sectionTitle:{
        fontWeight:600,
        fontSize:20,
        backgroundColor:"#29b1aa",
        color:"white",
        width:"1200px",
        margin:"auto" ,
        marginTop:90,
        marginBottom:60,
        borderRadius:5
      }



  });


const RecordDocument = (params) => {

  const [patient,setPatient] = useState(params.patientData[0]);

return(
  <div>
     <div className = "BackClass" onClick = { () => params.back() }>
        <Back className="Back"/>
      </div>
    <Document>
      <Page size="A4" style={styles.page}>

        <View >
            
            <Text style={styles.title}>Cartella Paziente</Text>
        </View>

        <View style={styles.sectionTitle}>
            <Text style = {{fontSize:20,fontWeight:700}} >Dati Personali</Text>
        </View>

        <View style={styles.section}>
          <Text style = {styles.fieldTitle}>Nome : </Text>

          <Text style = {styles.field}>  {patient.personalData.name} </Text>

          <Text style = {styles.fieldTitle}>Cognome : </Text>
          <Text style = {styles.field}>  {patient.personalData.surname} </Text>

          <Text style = {styles.fieldTitle}>CF : </Text>
          <Text style = {styles.field}>  {patient.personalData.cf} </Text>

        </View>


        <View style={styles.section}>
          <Text style = {styles.fieldTitle}>Peso : </Text>
          <Text style = {styles.field}>  {patient.personalData.weight}</Text>
          <Text style = {styles.fieldTitle}>Altezza : </Text>
          <Text style = {styles.field}>  {patient.personalData.heigth} </Text>
        </View>



        <View style={styles.section}>
          <Text style = {styles.fieldTitle}>Telefono : </Text>
          <Text style = {styles.field}>  {patient.personalData.number} </Text>
        </View>


        <View style={styles.section}>
            <Text style = {styles.fieldTitle}>Data di nascita : </Text>
            <Text style = {styles.field}>  {patient.personalData.birth}</Text>
        </View>
        <View style={styles.sectionTitle}>
            <Text style = {{fontSize:20,fontWeight:700}} >Dati Medici</Text>
        </View>

        <View style={styles.section}>
          <Text style = {styles.fieldTitle}>Allergie : </Text>
          <Text style = {styles.field}>  Arena </Text>
        </View>

        <View style={styles.section}>
          <Text style = {styles.fieldTitle}>Problemi Medici Passati : </Text>
          <Text style = {styles.field}>  Arena </Text>
        </View>

        <View style={styles.section}>
          <Text style = {styles.fieldTitle}>Medicine : </Text>
          <Text style = {styles.field}>  Arena </Text>
          <Image src = {Record} />
        </View>


      </Page>
    </Document>
    </div>
)
};


  export default RecordDocument;
import React from 'react';
import { Page, Text, View, Document,StyleSheet ,  PDFViewer} from '@react-pdf/renderer';
import { ReactComponent as Back } from '../../media/back.svg';
import { useState } from 'react';

const styles = StyleSheet.create({
    
    page: {
      display:"flex",
      flexDirection: 'column',
      backgroundColor: '#E4E4E4',
      width:"90%",
      margin:"auto",
      marginBottom:30
    },
    section: {
      display:"flex",
      flexDirection:"row",
      
    },
    fieldTitle:{
        fontWeight:800,
        fontSize:20,
        paddingRight:10,
        margin:"auto"

    },
    field:{
        fontWeight:700,
        fontSize:20,
        paddingRight:20,
        margin:"auto"

    },

    title:{
        fontSize:30,
        fontWeight:900,
    },

    sectionTitle:{
        marginTop:"10px",
        fontWeight:600,
        fontSize:20,
        backgroundColor:"#29b1aa",
        color:"white",
        width:"100%",
        marginBottom:20,
        borderRadius:5
      },

    container:{
      padding:"10px",
      margin:"auto",
      display:"inline"

    },
    viewer: {
      marginTop:"20px",
      width: "85%", //the pdf viewer will take up all of the width and height
      height: "500px",
    },
  });


const RecordDocument = (params) => {
  // eslint-disable-next-line
  const [patient,setPatient] = useState(params.patientData[0]);
  console.log(patient)
return(
  <div>
    { params.role !=="patient" && <div className = "BackClass" onClick = { () => params.back() }>
        <Back className="Back"/>
      </div> }
      <PDFViewer style={styles.viewer}>
    <Document>
      <Page size="A4" style={styles.page}>

        <View >
            
            <Text style={styles.title}>Cartella Paziente</Text>
        </View>

        <View style={styles.sectionTitle}>
            <Text style = {{fontSize:20,fontWeight:700,margin:"auto"}} >Dati Personali</Text>
        </View>

        <View style={styles.section}>
          <div style= {styles.container}>
          <Text style = {styles.fieldTitle}>Nome :<Text style = {styles.field}>  {patient.personalData.name} </Text> </Text>

          <p style = {styles.field}>  {patient.personalData.name} </p>

          <Text style = {styles.fieldTitle}>Cognome :<Text style = {styles.field}>  {patient.personalData.surname} </Text></Text>

          <Text style = {styles.fieldTitle}>CF :<Text style = {styles.field}>  {patient.personalData.cf} </Text></Text>  
          </div>
        </View>


        <View style={styles.section}>
        <div style= {styles.container}>
          <Text style = {styles.fieldTitle}>Peso : <Text style = {styles.field}>  {patient.personalData.weight}Kg</Text> </Text>
          
          <Text style = {styles.fieldTitle}>Altezza :<Text style = {styles.field}>  {patient.personalData.height}m </Text></Text>

          <Text style = {styles.fieldTitle}>Telefono :<Text style = {styles.field}>  {patient.personalData.number} </Text></Text>
        </div>
        </View>

        <View style={styles.section}>
        <div style= {styles.container}>
            <Text style = {styles.fieldTitle}>Data di nascita : <Text style = {styles.field}>  {patient.personalData.birth}</Text> </Text>
        </div>
        </View>

        <View style={styles.sectionTitle}>
            <Text style = {{fontSize:20,fontWeight:700,margin:"auto"}} >Dati Medici</Text>
        </View>

        <View style={styles.section}>
        <div style= {styles.container}>
            <Text style = {styles.fieldTitle}>Allergie : <Text style = {styles.field}>  {patient.info.allergies ? (patient.info.allergies) : ("N/A")} </Text> </Text>
            <Text style = {styles.fieldTitle}>Medicine : <Text style = {styles.field}>  {patient.info.medicinesTaken ? (patient.info.medicinesTaken) : ("N/A")} </Text> </Text>
            <Text style = {styles.fieldTitle}>Problemi Medici Passati : <Text style = {styles.field}>  {patient.info.pastMedicalProblems ? (patient.info.pastMedicalProblems) : ("N/A")}</Text> </Text>
        </div>
        </View>

      </Page>
    </Document>
    </PDFViewer>
    </div>
)
};


  export default RecordDocument;
// AdmitCard.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#f0e6d2',
    padding: 40,
    fontFamily: 'Helvetica',
    border: '2px solid black',
    borderRadius: 5,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 5,
  },
  logo: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 40,
    left: 40,
  },
  admitCardText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  line: {
    borderBottom: '1px solid black',
    width: '70%',
  },
  instruction: {
    fontSize: 12,
    marginLeft: 20,
  },
  signature: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  signatureLine: {
    borderBottom: '1px solid black',
    width: '30%',
  },
});

// Admit Card Component
const AdmitCard = ({ student_id="DD6373DE", class_name="6th", exam_name="Annual Exam", full_name="Shakibul Islam", fathers_name="MD Yousuf", mothers_name="Momtaz Begum" }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>SCHOOL NAME OF HIGHER SECONDARY</Text>
        <Text style={styles.subtitle}>{exam_name}</Text>
      </View>

      {/* Logo */}
      <Image src="https://via.placeholder.com/50"  style={styles.logo} />

      {/* Admit Card Text */}
      <Text style={styles.admitCardText}>ADMIT CARD</Text>

      {/* Student Details Section */}
      <View style={styles.section}>
        <Text>Name of Student</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.section}>
        <Text>{`Father's Name`}</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.section}>
        <Text>Class</Text>
        <View style={styles.line} />
        <Text>Section</Text>
        <View style={styles.line} />
      </View>

      {/* Instruction Section */}
      <Text style={styles.instruction}>Instruction</Text>
      <Text style={styles.instruction}> {`->`} Don&apos;t carry Mobile in the Exam Hall</Text>
      <Text style={styles.instruction}> {`->`} Don&apos;t carry Digital watch in the Exam Hall</Text>

      {/* Signature Section */}
      <View style={styles.signature}>
        <View style={styles.signatureLine} />
        <Text>Class Teacher</Text>
        <View style={styles.signatureLine} />
        <Text>Principal</Text>
      </View>
    </Page>
  </Document>
);

export default AdmitCard;
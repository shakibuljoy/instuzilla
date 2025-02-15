// import React from 'react';
// import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// // Create styles
// const styles = StyleSheet.create({
//   page: {
//     padding: 30,
//     fontFamily: 'Helvetica',
//   },
//   section: {
//     marginBottom: 10,
//   },
//   header: {
//     fontSize: 20,
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#4A90E2',
//   },
//   businessName: {
//     fontSize: 16,
//     marginBottom: 10,
//     color: '#333',
//   },
//   invoiceDetails: {
//     fontSize: 12,
//     marginBottom: 20,
//     color: '#666',
//   },
//   table: {
//     display: 'flex',
//     width: 'auto',
//     marginBottom: 20,
//   },
//   tableRow: {
//     flexDirection: 'row',
//   },
//   tableCol: {
//     width: '25%',
//     borderStyle: 'solid',
//     borderWidth: 1,
//     borderColor: '#bfbfbf',
//     padding: 5,
//   },
//   tableCellHeader: {
//     backgroundColor: '#f3f3f3',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   tableCell: {
//     fontSize: 10,
//     color: '#333',
//   },
//   total: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     textAlign: 'right',
//     marginTop: 10,
//   },
//   image: {
//     width: 150,
//     height: 150,
//     marginBottom: 10,
//   },
// });


// const invoice = {
//   businessName: "Tech Solutions Ltd.",
//   invoiceNumber: "INV-20240101",
//   dateOfIssue: "2025-02-02",
//   address: "123 Main Street, New York, NY 10001",
//   items: [
//       {
//           name: "Website Development",
//           qty: 1,
//           rate: 1500,
//           amount: 1500,
//       },
//       {
//           name: "SEO Optimization",
//           qty: 1,
//           rate: 500,
//           amount: 500,
//       },
//       {
//           name: "Hosting (12 months)",
//           qty: 1,
//           rate: 200,
//           amount: 200,
//       }
//   ],
//   subtotal: 2200,
//   discount: 100,
//   total: 2210
// };

// const InvoicePDF = () => (
//   <Document>
//     <Page style={styles.page}>
//       <Text style={styles.header}>Invoice</Text>
//       <View style={styles.section}>
//         <Text style={styles.businessName}>{invoice.businessName}</Text>
//         <Image style={styles.image} src="https://placehold.co/100x100" />
//         <Text style={styles.invoiceDetails}>Invoice Number: {invoice.invoiceNumber}</Text>
//         <Text style={styles.invoiceDetails}>Date of Issue: {invoice.dateOfIssue}</Text>
//         <Text style={styles.invoiceDetails}>Address: {invoice.address}</Text>
//       </View>
//       <View style={styles.table}>
//         <View style={styles.tableRow}>
//           <View style={[styles.tableCol, styles.tableCellHeader]}>
//             <Text>Item</Text>
//           </View>
//           <View style={[styles.tableCol, styles.tableCellHeader]}>
//             <Text>Quantity</Text>
//           </View>
//           <View style={[styles.tableCol, styles.tableCellHeader]}>
//             <Text>Rate</Text>
//           </View>
//           <View style={[styles.tableCol, styles.tableCellHeader]}>
//             <Text>Amount</Text>
//           </View>
//         </View>
//         {invoice.items.map((item, index) => (
//           <View style={styles.tableRow} key={index}>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCell}>{item.name}</Text>
//             </View>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCell}>{item.qty}</Text>
//             </View>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCell}>{item.rate}</Text>
//             </View>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCell}>{item.amount}</Text>
//             </View>
//           </View>
//         ))}
//       </View>
//       <Text style={styles.total}>Total: {invoice.items.reduce((acc, item) => acc + item.amount, 0)}</Text>
//     </Page>
//   </Document>
// );



import React from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    backgroundColor: "#F5E6C8",
    border: "2px solid black",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    textAlign: "center",
    fontSize: 14,
    marginBottom: 10,
  },
  cardContainer: {
    textAlign: "center",
    padding: 10,
    border: "1px solid black",
    marginBottom: 15,
  },
  section: {
    marginBottom: 10,
    paddingBottom: 5,
    display: "flex",
    flexDirection: "row",
  },
  text: {
    fontSize: 10,
    marginBottom: 4,
  },
  boldText: {
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    fontSize: 14,
  },
});

const InvoicePDF = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>SCHOOL NAME OF HIGHER SECONDARY</Text>
      <Text style={styles.subHeader}>FINAL EXAMINATION 2022-2023</Text>
      <View style={styles.cardContainer}>
        <Text style={[styles.text, styles.boldText]}>ADMIT CARD</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Name of Student: ______________________________</Text>
        <Text style={styles.text}>Father’s Name: ______________________________</Text>
        <Text style={styles.text}>Class: ______________ Section: ______________</Text>
      </View>
      <View>
        <Text style={styles.boldText}>Instruction:</Text>
        <Text>- Don’t carry Mobile in the Exam Hall</Text>
        <Text>- Don’t carry Digital watch in the Exam Hall</Text>
      </View>
      <View style={styles.footer}>
        <Text>__________________</Text>
        <Text>__________________</Text>
      </View>
      <View style={styles.footer}>
        <Text>Class Teacher</Text>
        <Text>Principal</Text>
      </View>
    </Page>
  </Document>
);
export default InvoicePDF;
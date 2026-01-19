import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { formatDateTime } from "@/lib/utils";

const styles = StyleSheet.create({
  page: {
    width: 226,
    padding: 10,
    fontSize: 10,
    border: "1px solid #ccc",
    borderRadius: 8,
  },
  headerContainer: {
    textAlign: "center",
    marginBottom: 8,
  },
  logo: {
    width: 40,
    height: 40,
    marginBottom: 2,
    alignSelf: "center",
  },
  hospitalName: {
    fontSize: 12,
    fontWeight: "bold",
  },
  tokenTitle: {
    fontSize: 12,
    marginTop: 8,
    marginBottom: 5,
    border: "2px solid #ccc",
    padding: 3,
  },
  row: {
    marginBottom: 4,
  },
  label: {
    fontWeight: "bold",
  },
  divider: {
    marginVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginHorizontal: 0,
  },
  centerText: {
    textAlign: "center",
  },
  footer: {
    marginTop: 10,
    fontSize: 8,
    textAlign: "center",
  },
  blueLine: {
    height: 4,
    backgroundColor: "#3B82F6",
    marginTop: 6,
  },
});

const TokenSlipPDF = ({ data }) => {
  const { date, time } = formatDateTime(data.createdAt?.$date || data.createdAt);

  return (
    <Document>
      <Page size={[226, 350]} style={styles.page}>
        <View style={styles.headerContainer}>
          {/* <Image style={styles.logo} src="/path/to/logo.png" /> */}
          <Text style={styles.hospitalName}>Rehmat Rehman Hospital</Text>
          <Text style={styles.tokenTitle}>Token Slip</Text>
        </View>

        {/* Token Info */}
        <View style={styles.row}>
          <Text>
            <Text style={styles.label}>Token No : </Text>
            {data.tokenNo}
          </Text>
        </View>

        <View style={styles.row}>
          <Text>
            <Text style={styles.label}>MRID : </Text>
            {data.mrid}
          </Text>
        </View>

        <View style={styles.row}>
          <Text>
            <Text style={styles.label}>Patient Name : </Text>
            {data.patientName}
          </Text>
        </View>

        <View style={styles.row}>
          <Text>
            <Text style={styles.label}>Phone Number : </Text>
            {data.phoneNumber}
          </Text>
        </View>


        <View style={styles.row}>
          <Text>
            <Text style={styles.label}>Date : </Text>
            {date}
          </Text>
        </View>

        <View style={styles.row}>
          <Text>
            <Text style={styles.label}>Time : </Text>
            {time}
          </Text>
        </View>

        <View style={styles.row}>
          <Text>
            <Text style={styles.label}>Estimated Time for Checkup : </Text>
            {data.estimatedTime}
          </Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Waiting message */}
        <Text style={styles.centerText}>Please wait for your turn</Text>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>+92 301 7479752</Text>
          <Text>Khanewal Road, Multan</Text>
        </View>

        {/* Blue bottom line */}
        <View style={styles.blueLine} />
      </Page>
    </Document>
  );
};

export default TokenSlipPDF;

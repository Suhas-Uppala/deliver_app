import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const DeliveryTrackingScreen = () => {
  const routeStops = [
    { time: '08:00 AM', address: '206 Beach Blvd, Miami, FL' },
    { time: '09:50 AM', address: 'NW Ave, Coral Gables, FL' },
    { time: '11:25 AM', address: '2771 Haskell Ave, Dallas, TX' },
    { time: '12:45 PM', address: '150 Travis St, Chicago, IL' },
    { time: '01:50 PM', address: '102 Collins Ave, Chicago, IL' },
  ];

  // Render each route stop
  const renderRouteStop = ({ item }) => (
    <View style={styles.routeItem}>
      <Text style={styles.routeTime}>{item.time}</Text>
      <Text style={styles.routeAddress}>{item.address}</Text>
    </View>
  );

  return (
    <FlatList
      data={routeStops} // Dynamic data for route stops
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderRouteStop}
      // Static content before the list
      ListHeaderComponent={
        <View>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>OptiDeliver</Text>
          </View>

          {/* Tracking Card */}
          <View style={styles.trackingCard}>
            <Text style={styles.trackingNumber}>#657890</Text>
            <Text style={styles.status}>On The Way</Text>
            <View style={styles.estimatedTime}>
              <Text style={styles.timeLabel}>Estimated Time</Text>
              <Text style={styles.time}>11:45 AM</Text>
              <Text style={styles.date}>Dec 9, 2024</Text>
            </View>
            <Text style={styles.address}>206 Beach Blvd, Miami, FL</Text>
            <Text style={styles.address}>102 Collins Ave, Chicago, IL</Text>
          </View>

          {/* Map Section */}
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 41.8781,
                longitude: -87.6298,
                latitudeDelta: 5,
                longitudeDelta: 5,
              }}
            >
              <Marker
                coordinate={{ latitude: 41.8781, longitude: -87.6298 }}
                title="Current Location"
              />
            </MapView>
          </View>

          {/* Route Details Header */}
          <Text style={styles.detailsHeader}>Route Details</Text>
        </View>
      }
      // Static content after the list
      ListFooterComponent={
        <View style={styles.footer}>
          <Text style={styles.footerText}>All deliveries are on schedule!</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  body:{
    padding:20
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#007BFF',
    padding: 16,
  },
  headerText: {
    color: '#FFF',
    fontSize: 20,
    margin: 8,
    fontWeight: 'bold',
  },
  trackingCard: {
    backgroundColor: '#FFF',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  trackingNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    color: '#FFA500',
    marginVertical: 8,
    fontWeight: 'bold',
  },
  estimatedTime: {
    marginVertical: 8,
  },
  timeLabel: {
    color: '#6C757D',
    fontSize: 14,
  },
  time: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    color: '#6C757D',
  },
  address: {
    color: '#212529',
    marginVertical: 4,
  },
  mapContainer: {
    height: 200,
    margin: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  detailsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 16,
  },
  routeItem: {
    flexDirection: 'row',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  routeTime: {
    color: '#6C757D',
    width: 80,
  },
  routeAddress: {
    color: '#212529',
    flex: 1,
  },
  footer: {
    marginTop: 16,
    alignItems: 'center',
    padding: 16,
  },
  footerText: {
    color: '#6C757D',
    fontStyle: 'italic',
  },
});

export default DeliveryTrackingScreen;

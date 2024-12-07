import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your API key

const DeliveryTrackingScreen = () => {
  const routeStops = [
    { 
      id: '1', 
      time: '08:00 AM', 
      address: 'Charminar, Hyderabad, Telangana', 
      latitude: 17.3616, 
      longitude: 78.4747 
    },
    { 
      id: '2', 
      time: '09:30 AM', 
      address: 'HITEC City, Hyderabad, Telangana', 
      latitude: 17.4448, 
      longitude: 78.3489 
    },
    { 
      id: '3', 
      time: '11:00 AM', 
      address: 'Gachibowli, Hyderabad, Telangana', 
      latitude: 17.4304, 
      longitude: 78.3398 
    },
    { 
      id: '4', 
      time: '12:15 PM', 
      address: 'Banjara Hills, Hyderabad, Telangana', 
      latitude: 17.4125, 
      longitude: 78.4483 
    },
    { 
      id: '5', 
      time: '01:30 PM', 
      address: 'Secunderabad, Hyderabad, Telangana', 
      latitude: 17.4399, 
      longitude: 78.4983 
    },
  ];

  const [selectedDelivery, setSelectedDelivery] = useState(routeStops[0]);

  const renderRouteStop = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.routeItem,
        selectedDelivery.id === item.id && styles.selectedItem,
      ]}
      onPress={() => setSelectedDelivery(item)}
    >
      <Text style={styles.routeTime}>{item.time}</Text>
      <Text style={styles.routeAddress}>{item.address}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={routeStops}
      keyExtractor={(item) => item.id}
      renderItem={renderRouteStop}
      ListHeaderComponent={
        <View>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>OptiDeliver</Text>
          </View>

          {/* Tracking Card */}
          <View style={styles.trackingCard}>
            <Text style={styles.trackingNumber}>#HYD657890</Text>
            <Text style={styles.status}>On The Way</Text>
            <View style={styles.estimatedTime}>
              <Text style={styles.timeLabel}>Estimated Time</Text>
              <Text style={styles.time}>11:45 AM</Text>
              <Text style={styles.date}>Dec 9, 2024</Text>
            </View>
            <Text style={styles.address}>
              From: Charminar, Hyderabad, Telangana
            </Text>
            <Text style={styles.address}>
              To: Secunderabad, Hyderabad, Telangana
            </Text>
          </View>

          {/* Map Section */}
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: selectedDelivery.latitude,
                longitude: selectedDelivery.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
              region={{
                latitude: selectedDelivery.latitude,
                longitude: selectedDelivery.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
            >
              {/* Current Marker */}
              <Marker
                coordinate={{
                  latitude: selectedDelivery.latitude,
                  longitude: selectedDelivery.longitude,
                }}
                title={selectedDelivery.address}
                description={`Scheduled Time: ${selectedDelivery.time}`}
              />

              {/* Next Marker and Route */}
              {selectedDelivery.id !== routeStops[routeStops.length - 1].id && (
                <>
                  {/* Next Stop Marker */}
                  <Marker
                    coordinate={{
                      latitude:
                        routeStops[
                          parseInt(selectedDelivery.id, 10)
                        ].latitude,
                      longitude:
                        routeStops[
                          parseInt(selectedDelivery.id, 10)
                        ].longitude,
                    }}
                    title={
                      routeStops[
                        parseInt(selectedDelivery.id, 10)
                      ].address
                    }
                  />
                  {/* Route Line */}
                  <MapViewDirections
                    origin={{
                      latitude: selectedDelivery.latitude,
                      longitude: selectedDelivery.longitude,
                    }}
                    destination={{
                      latitude:
                        routeStops[
                          parseInt(selectedDelivery.id, 10)
                        ].latitude,
                      longitude:
                        routeStops[
                          parseInt(selectedDelivery.id, 10)
                        ].longitude,
                    }}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="blue"
                  />
                </>
              )}
            </MapView>
          </View>

          {/* Route Details Header */}
          <Text style={styles.detailsHeader}>Route Details</Text>
        </View>
      }
      ListFooterComponent={
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            All deliveries are on schedule!
          </Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
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
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFF',
    elevation: 1,
  },
  selectedItem: {
    backgroundColor: '#E3F2FD',
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

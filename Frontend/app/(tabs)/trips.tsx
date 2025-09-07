import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';

  const API_URL = Platform.OS === 'web' || Platform.OS === 'ios'
  ? 'http://localhost:8080' 
  : 'http://192.168.4.46:8080';

export default function TripsScreen() {
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch(`${API_URL}/api/trips`);
        const data = await res.json();
        console.log('Fetched trips:', data);
        setTrips(data.trips || []);
      } catch (err) {
        console.log('Error fetching trips:', err);
        setTrips([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!trips.length) {
    return (
      <View style={styles.center}>
        <Text>No trips found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={trips}
      keyExtractor={item => item._id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            router.push({
              pathname: '/SummaryScreen',
              params: {
                userData: JSON.stringify(item.user),
                itinerary: JSON.stringify(item.itinerary),
              },
            })
          }
        >
          <Text style={styles.title}>{item.user?.name || 'Trip'}</Text>
          <Text>{item.user?.destination}</Text>
          <Text>{item.user?.startDate} - {item.user?.endDate}</Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={{ padding: 20, paddingBottom: 40, paddingTop: 60 }}

    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  title: { fontWeight: 'bold', fontSize: 18, marginBottom: 4 },
});
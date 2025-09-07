import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  Linking,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";

export default function SummaryScreen({ route }: any) {
  const params = useLocalSearchParams();
  const userData = params.userData
    ? JSON.parse(params.userData as string)
    : null;
  const [itinerary, setItinerary] = useState<any[]>(
    params.itinerary ? JSON.parse(params.itinerary as string) : []
  );
  const [loading, setLoading] = useState(true);
  const API_URL =
    Platform.OS === "web" || Platform.OS === "ios"
      ? "http://localhost:8080"
      : "http://192.168.4.46:8080";
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back", // Hide the label
      // Optionally, you can set a custom label:
      // headerBackTitle: 'Back',
    });
  }, [navigation]);

  const sendTripData = async () => {
    setLoading(true); // Start loader
    try {
      const response = await fetch(`${API_URL}/api/tripAdvise`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userData.name,
          destination: userData.destination,
          startDate: userData.startDate,
          endDate: userData.endDate,
          preferences: userData.preferences,
          googleCalendarSync: userData.googleCalendarSync,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setItinerary(data.itinerary); // <- Save the trip itinerary into state
        Alert.alert("Success", "Trip data sent successfully!");
        console.log("Response:", data);
        // Save to DB after getting itinerary
        await fetch(`${API_URL}/api/saveTrip`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: userData,
            itinerary: data.itinerary,
          }),
        });
      } else {
        Alert.alert("Error", "Failed to send trip data.");
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while sending trip data.");
      console.error("Error:", error);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  useEffect(() => {
    if (!params.itinerary) {
      sendTripData();
    }else{
      setLoading(false); // Stop loader if itinerary is already provided
    }
  }, []);

  const renderCard = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.placeName}>{item.place}</Text>
      <Text style={styles.dateTime}>{item.date_time}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => Linking.openURL(item.location)}>
          <Text style={styles.linkText}>View on Map</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL(item.youtube)}>
          <Text style={styles.linkText}>Watch Video</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#1e90ff" />
        <Text style={{ marginTop: 16 }}>Loading your trip summary...</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={itinerary}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderCard}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
    paddingTop: 30,
  },
  card: {
    backgroundColor: "#f9f9f9",
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    paddingBottom: 10,
  },
  image: {
    height: 200,
    width: "100%",
  },
  placeName: {
    fontSize: 20,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  dateTime: {
    fontSize: 16,
    color: "#555",
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
  },
  linkText: {
    color: "#1e90ff",
    fontSize: 16,
  },
});

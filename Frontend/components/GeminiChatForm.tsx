import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Switch,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { Modal } from "react-native";
interface Props {
  onComplete: (userData: any) => void;
}

const GeminiChatForm = ({ onComplete }: Props) => {
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [endDate, setEndDate] = useState(() => {
    const defaultEnd = new Date();
    defaultEnd.setDate(defaultEnd.getDate() + 2);
    return defaultEnd;
  });
  const [startDate, setStartDate] = useState<Date>(new Date());
  // const [endDate, setEndDate] = useState<Date>(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [preferences, setPreferences] = useState("");
  const [googleCalendarSync, setGoogleCalendarSync] = useState(false);

  const handleSubmit = () => {
    const userData = {
      name,
      destination,
      startDate: format(startDate, "MM/dd/yyyy"),
      endDate: format(endDate, "MM/dd/yyyy"),
      preferences: preferences.split(",").map((pref) => pref.trim()),
      googleCalendarSync: googleCalendarSync ? "Yes" : "No",
    };
    onComplete(userData);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.wrapper}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🧳 Plan Your Trip</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. John Doe"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Destination</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Paris, Tokyo"
          value={destination}
          onChangeText={setDestination}
        />

        <Text style={styles.label}>Start Date</Text>
        <TouchableOpacity
          onPress={() => setShowStartPicker(true)}
          style={styles.dateInput}
        >
          <Text style={styles.dateText}>
            {startDate ? format(startDate, "MM/dd/yyyy") : "Select start date"}
          </Text>
        </TouchableOpacity>

        <Modal
          transparent
          animationType="fade"
          visible={showStartPicker}
          onRequestClose={() => setShowStartPicker(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  if (Platform.OS !== "ios") {
                    setShowStartPicker(false);
                  }
                  if (selectedDate) {
                    setStartDate(selectedDate);
                  }
                }}
              />
              {Platform.OS === "ios" && (
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={() => setShowStartPicker(false)}
                >
                  <Text style={styles.doneText}>Done</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>

        <Text style={styles.label}>End Date</Text>
        <TouchableOpacity
          onPress={() => setShowEndPicker(true)}
          style={styles.dateInput}
        >
          <Text style={styles.dateText}>
            {endDate ? format(endDate, "MM/dd/yyyy") : "Select end date"}
          </Text>
        </TouchableOpacity>

        <Modal
          transparent
          animationType="fade"
          visible={showEndPicker}
          onRequestClose={() => setShowEndPicker(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  if (Platform.OS !== "ios") {
                    setShowEndPicker(false);
                  }
                  if (selectedDate) {
                    setEndDate(selectedDate);
                  }
                }}
              />
              {Platform.OS === "ios" && (
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={() => setShowEndPicker(false)}
                >
                  <Text style={styles.doneText}>Done</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>

        <Text style={styles.label}>Preferences</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Beaches, Adventure, Food"
          value={preferences}
          onChangeText={setPreferences}
        />

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Sync to Google Calendar</Text>
          <Switch
            value={googleCalendarSync}
            onValueChange={setGoogleCalendarSync}
            thumbColor={googleCalendarSync ? "#fff" : "#888"}
            trackColor={{ true: "#007AFF", false: "#ccc" }}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Trip Details</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#f7f9fc",
  },
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 25,
    textAlign: "center",
    color: "#333",
  },
  label: {
    fontSize: 16,
    marginTop: 20,
    color: "#444",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: "#fff",
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginTop: 5,
    backgroundColor: "#fff",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    paddingVertical: 10,
  },
  buttonWrapper: {
    marginTop: 30,
    borderRadius: 10,
    overflow: "hidden",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "85%",
    alignItems: "center",
  },
  doneButton: {
    marginTop: 15,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  doneText: {
    color: "#fff",
    fontSize: 16,
  },
  submitButton: {
    marginTop: 30,
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default GeminiChatForm;

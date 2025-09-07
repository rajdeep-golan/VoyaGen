import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Message {
  text: string;
  user: boolean;
}

interface Props {
  onComplete: (userData: any) => void;
}

const GeminiChat = ({ onComplete }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  const [currentStep, setCurrentStep] = useState<
    "name" | "destination" | "startDate" | "endDate" | "preferences" | "googleCalendarSync" | "done"
  >("name");
  const [userData, setUserData] = useState<any>({
    name: "",
    destination: "",
    startDate: "",
    endDate: "",
    preferences: [],
    googleCalendarSync: "",
  });

  useEffect(() => {
    greetUser();
  }, []);

  const greetUser = () => {
    const welcome = "Hello! Let's plan your trip. What's your name?";
    addBotMessage(welcome);
  };

  const addBotMessage = (text: string) => {
    setMessages((prev) => [{ text, user: false }, ...prev]);
    Speech.speak(text);
    scrollToBottom();
  };

  const handleUserResponse = (input: string) => {
    switch (currentStep) {
      case "name":
        setUserData((prev: any) => ({ ...prev, name: input }));
        setCurrentStep("destination");
        addBotMessage("Great! Where would you like to travel?");
        break;
      case "destination":
        setUserData((prev: any) => ({ ...prev, destination: input }));
        setCurrentStep("startDate");
        addBotMessage("Awesome! What's your start date? (MM/DD/YYYY)");
        break;
      case "startDate":
        setUserData((prev: any) => ({ ...prev, startDate: input }));
        setCurrentStep("endDate");
        addBotMessage("Cool! What's your end date? (MM/DD/YYYY)");
        break;
      case "endDate":
        setUserData((prev: any) => ({ ...prev, endDate: input }));
        setCurrentStep("preferences");
        addBotMessage("Nice! What are your preferences? (e.g., Food, Adventure)");
        break;
      case "preferences":
        const preferencesArray = input.split(",").map((pref) => pref.trim());
        setUserData((prev: any) => ({ ...prev, preferences: preferencesArray }));
        setCurrentStep("googleCalendarSync");
        addBotMessage("Do you want to sync this trip to Google Calendar? (Yes/No)");
        break;
      case "googleCalendarSync":
        setUserData((prev: any) => ({ ...prev, googleCalendarSync: input }));
        setCurrentStep("done");
        addBotMessage("Thank you! Preparing your trip details... 🚀");
        setTimeout(() => {
          onComplete({
            ...userData,
            googleCalendarSync: input,
          });
        }, 500);
        break;
    }
  };

  const sendMessage = () => {
    if (!userInput.trim()) return;

    const userMessage = { text: userInput.trim(), user: true };
    setMessages((prev) => [userMessage, ...prev]);
    handleUserResponse(userInput.trim());
    setUserInput("");
    scrollToBottom();
  };

  const scrollToBottom = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={styles.messageContainer}>
      <Text style={[styles.messageText, item.user && styles.userMessage]}>
        {item.text}
      </Text>
    </View>
  );

  const TAB_BAR_HEIGHT = 80; // assume 70-80px depending on device.

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
  >
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Chat List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        inverted
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-end",
          paddingTop: 20,
          paddingBottom: 100, // very important: leave space for input and tab bar
        }}
      />

      {/* Input Bar Fixed at Bottom */}
      <View style={[styles.inputContainer, { paddingBottom: 90 }]}>
        <TouchableOpacity style={styles.micIcon} onPress={() => Speech.stop()}>
          <FontAwesome name="microphone-slash" size={24} color="white" />
        </TouchableOpacity>
        <TextInput
          placeholder="Type your answer..."
          onChangeText={setUserInput}
          value={userInput}
          onSubmitEditing={sendMessage}
          style={styles.input}
          placeholderTextColor="#fff"
        />
        <TouchableOpacity style={styles.stopIcon} onPress={sendMessage}>
          <Entypo name="controller-play" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
  },
  messageText: {
    fontSize: 16,
  },
  userMessage: {
    fontWeight: "bold",
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#131314",
    minHeight: 70,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#131314",
    borderRadius: 10,
    height: 50,
    color: "white",
    marginHorizontal: 5,
  },
  micIcon: {
    padding: 10,
    backgroundColor: "#131314",
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  stopIcon: {
    padding: 10,
    backgroundColor: "#131314",
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GeminiChat;

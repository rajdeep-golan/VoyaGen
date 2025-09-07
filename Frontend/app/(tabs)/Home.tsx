import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import GeminiChatForm from '../../components/GeminiChatForm';
import { useRouter } from 'expo-router';

export default function Home() {
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();
  
  const handleTripComplete = (data: any) => {
    console.log("Collected User Data:", data);
    setUserData(data);
    handleSubmit(data)
  };
  const handleSubmit = (data: any) => {
    if (data) {
      router.push({
        pathname: '/SummaryScreen',
        params: {
          userData: JSON.stringify(data)  // Pass as string, safer for URL params
        },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <GeminiChatForm onComplete={handleTripComplete} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  buttonContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },
});

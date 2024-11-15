import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Animated, StyleSheet } from 'react-native';
import axios from 'axios';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Header_footer from './header&footer';
import axios from './axiosInstance';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [result, setResult] = useState({});
  const navigation = useNavigation(); // Get the navigation object
  const [fontSizeAnimation] = useState(new Animated.Value(18)); // Start font size at 18
  const [timeLeft, setTimeLeft] = useState(10000); // Timer starts with 10,000 ms (10 seconds)
  const [timerRunning, setTimerRunning] = useState(true); // Track if timer is running

  // Fetch data once when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get('http://10.0.2.2:3000/questions');
        const response = await axiosInstance.get('/questions');
        
        setQuestions(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Timer countdown logic
  useEffect(() => {
    const totalDuration = 10000; // Total duration in milliseconds
    const interval = 1000; // Update every 1ms

    const timerInterval = setInterval(() => {
      if (timeLeft > 0 && timerRunning) {
        setTimeLeft((prevTime) => Math.max(prevTime - interval, 0)); // Decrease by 1ms
      }
    }, interval); // Interval of 1ms

    return () => clearInterval(timerInterval); // Cleanup timer when component unmounts
  }, [timeLeft, timerRunning]); // Only depend on timerLeft and timerRunning

  // Start font size animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fontSizeAnimation, {
          toValue: 40, // Maximum font size
          duration: 5000, // 5 seconds to increase the font size
          useNativeDriver: false,
        }),
        Animated.timing(fontSizeAnimation, {
          toValue: 18, // Back to the original font size
          duration: 5000, // 5 seconds to decrease the font size
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [fontSizeAnimation]); // Depend on fontSizeAnimation to start the loop

  // Handle user answer selection
  const handleInputChange = (index, value) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = value;
    setUserAnswers(updatedAnswers);
    setTimerRunning(false); // Stop the timer when an option is selected
  };

  // Format timeLeft as milliseconds
  const formatTime = (time) => `${time}ms`;

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ padding: 16, backgroundColor: 'black', alignItems: 'center' }}>
        <Text style={{ fontSize: 25, color: 'white', fontWeight: 'bold', marginTop: 10 }}>QUIZ</Text>
      </View>

      {/* Display remaining time in milliseconds */}
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ fontSize: 20, color: 'white' }}>{`Time Left: ${formatTime(timeLeft)}`}</Text>
      </View>

      <FlatList
        data={questions}
        renderItem={({ item, index }) => (
          <View style={styles.questionContainer}>
            {/* Animated font size for question text */}
            <View style={styles.questionBox}>
              <Animated.Text style={[styles.questionText, { fontSize: fontSizeAnimation }]}>
                {`${index + 1}. ${item.Question}`}
              </Animated.Text>
            </View>

            {/* Options */}
            <FlatList
              data={item.Options}
              keyExtractor={(option) => option._id}
              renderItem={({ item: option }) => (
                <View style={styles.optionBox}>
                  <RadioButton.Android
                    value={option.value}
                    status={userAnswers[index] === option.value ? 'checked' : 'unchecked'}
                    onPress={() => handleInputChange(index, option.value)}
                  />
                  <Text style={styles.optionText}>{`${option.value}`}</Text>
                </View>
              )}
            />
          </View>
        )}
      />

      <Header_footer />
    </View>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    padding: 10,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    margin: 15,
    borderRadius: 10,
    backgroundColor: 'lightgrey',
  },
  questionBox: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  questionText: {
    fontWeight: 'bold',
    color: 'black',
  },
  optionBox: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: 10,
    color: 'black',
    fontSize: 16,
  },
});

export default Questions;

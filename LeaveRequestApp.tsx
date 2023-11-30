// LeaveRequestApp.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Alert, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar } from 'react-native-calendars';
import { getDataverseData } from './services'; // Update the path accordingly

const LeaveRequestApp: React.FC = () => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [numberOfDays, setNumberOfDays] = useState<number>(0);
  const [showStartDateCalendar, setShowStartDateCalendar] = useState<boolean>(false);
  const [showEndDateCalendar, setShowEndDateCalendar] = useState<boolean>(false);

  const handleDateSelect = (date: string, isStartDate: boolean) => {
    if (isStartDate) {
      setStartDate(date);
      setShowStartDateCalendar(false);
    } else {
      setEndDate(date);
      setShowEndDateCalendar(false);
    }
    calculateNumberOfDays(date, isStartDate ? endDate : startDate);
  };

  const calculateNumberOfDays = (selectedDate: string, otherDate: string | null) => {
    if (otherDate) {
      const millisecondsPerDay = 24 * 60 * 60 * 1000;
      const selectedTimestamp = new Date(selectedDate).getTime();
      const otherTimestamp = new Date(otherDate).getTime();
      let weekdays = 0;

      for (let timestamp = Math.min(selectedTimestamp, otherTimestamp); timestamp <= Math.max(selectedTimestamp, otherTimestamp); timestamp += millisecondsPerDay) {
        const currentDate = new Date(timestamp);

        // Check if the current day is not a weekend day (Saturday or Sunday)
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
          weekdays++;
        }
      }

      setNumberOfDays(weekdays);
    }
  };

  const handleSubmit = async () => {
    try {
      // Authenticate using MSAL or your preferred authentication method
      // (Make sure to obtain the access token needed for Dataverse API)
      // ...

      // Use the obtained token to make requests to Dataverse API using the service
      const dataverseData = await getDataverseData(/* pass your access token here */);

      // Process the data as needed
      console.log(dataverseData);

      if (numberOfDays > 0) {
        // Show confirmation prompt
        Alert.alert(
          'Confirmation',
          `You have ${numberOfDays} days left on your leave. Would you like to continue?`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Continue',
              onPress: () => showSuccessPrompt(),
            },
          ]
        );
      } else {
        // If no days are selected, show an error alert
        Alert.alert('Error', 'Please select start and end dates.');
      }
    } catch (error) {
      console.error(error);
      // Handle authentication or API call errors
      // Show an error alert or update the UI accordingly
    }
  };

  const showSuccessPrompt = () => {
    // Show success prompt
    Alert.alert(
      'Success!!',
      'Your application has been submitted.',
      [
        {
          text: 'OK',
          onPress: () => resetForm(),
        },
      ]
    );
  };

  const resetForm = () => {
    // Reset the form or navigate to another screen if needed
    setStartDate(null);
    setEndDate(null);
    setNumberOfDays(0);
  };

  return (
    <LinearGradient
      colors={['#00A7DB', '#006098']}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <ImageBackground
        source={require('./assets/1.jpg')} // Background image path
        style={{ flex: 1, width: '100%' }}
      >
        <View style={styles.container}>
          <Image source={require('./assets/DBlogo.png')} style={styles.imgTna} />

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Start Date: {startDate ? startDate.toString() : 'Select Start Date'}</Text>
            </View>
            <Button title="Select Start Date" onPress={() => setShowStartDateCalendar(!showStartDateCalendar)} />
            {showStartDateCalendar && (
              <Calendar
                style={styles.calendar}
                onDayPress={(day) => handleDateSelect(day.dateString, true)}
                markedDates={{ [startDate as string]: { selected: true, selectedColor: 'blue' } }}
              />
            )}

            <View style={styles.labelContainer}>
              <Text style={styles.label}>End Date: {endDate ? endDate.toString() : 'Select End Date'}</Text>
            </View>
            <Button title="Select End Date" onPress={() => setShowEndDateCalendar(!showEndDateCalendar)} />
            {showEndDateCalendar && (
              <Calendar
                style={styles.calendar}
                onDayPress={(day) => handleDateSelect(day.dateString, false)}
                markedDates={{ [endDate as string]: { selected: true, selectedColor: 'blue' } }}
              />
            )}
          </ScrollView>
          <Text style={styles.label}>Number of Days: {numberOfDays}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {/* <Button title="Submit Leave Request" onPress={handleSubmit} /> */}
          <Button title="Submit Leave Request" onPress={handleSubmit} />
        </View>
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 0.4,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  container: {
    marginLeft: 20,
    marginTop: 60,
    width: '90%',
    height: '80%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#006098',
    width: '100%',
    borderRadius: 8,
  },
  imgTna: {
    width: 150,
    height: 150,
  },
  labelContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  calendar: {
    borderRadius: 10,
    marginTop: 10,
  },
  buttonContainer: {
    marginLeft: 40,
    marginTop: 20,
    marginBottom: 100,
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 8,
  },
});

export default LeaveRequestApp;

import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import axios from 'axios';

const SearchScreen = ({ route }) => {
  const { city } = route.params || {};
  const [search, setSearch] = useState(city || '');
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: search,
          appid: 'f40af58044177c6613c10d1bbc618659',
          units: 'metric',
        },
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Weather</Text>
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={setSearch}
        placeholder="Enter city name"
      />
      <Button title="Search" onPress={fetchWeatherData} />
      {weatherData && (
        <View style={styles.weatherInfo}>
          <Text style={styles.city}>{weatherData.name}</Text>
          <Text>Temp: {weatherData.main.temp}°C</Text>
          <Text>Weather: {weatherData.weather[0].description}</Text>
          {/* Add more details as needed */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  weatherInfo: {
    marginTop: 20,
  },
  city: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SearchScreen;

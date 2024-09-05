import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ImageBackground,
} from "react-native";
import axios from "axios";

const predefinedCities = ["kolkata", "Delhi", "Tokyo", "Sydney"];

const HomeScreen = ({ navigation }) => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const requests = predefinedCities.map((city) =>
        axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
          params: {
            q: city,
            appid: "f40af58044177c6613c10d1bbc618659",
            units: "metric",
          },
        })
      );
      const responses = await Promise.all(requests);
      setWeatherData(responses.map((response) => response.data));
    };

    fetchWeatherData();
  }, []);

  return (
    <ImageBackground
      source={{
        uri: "https://img.freepik.com/premium-vector/clear-cloudy-weather-night-mobile-wallpaper_771942-2.jpg",
      }}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Select Cities</Text>
        <FlatList
          data={weatherData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.city}>{item.name}</Text>
              <Text>Temp: {item.main.temp}°C</Text>
              <Text>Weather: {item.weather[0].description}</Text>
              <Text>Feels Like: {item.main.feels_like}°C</Text>
              <Text>High: {item.main.temp_max}°C</Text>
              <Text>Low: {item.main.temp_min}°C</Text>
              <Text>humidity: {item.main.humidity}°C</Text>
              <Text>Rain: {item.rain ? item.rain["1h"] : "0 mm"}°C</Text>

              <Button
                title="View Details"
                onPress={() =>
                  navigation.navigate("CityDetail", { cityName: item.name })
                }
              />
            </View>
          )}
        />
        <Button
          title="Search for a City"
          onPress={() => navigation.navigate("Search")}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: 450,
    height: 900,
    justifyContent: "center", // Align content vertically
    alignItems: "flex-start", // Align content horizontally
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "white",
  },
  item: {
    backgroundColor: "#ffffff",
    marginBottom: 20,
    borderRadius: 10, // Rounded corners
    borderWidth: 1,
    borderColor: "#dddddd",
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: 320,
  },
  city: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});

export default HomeScreen;

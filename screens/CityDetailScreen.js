import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  ImageBackground,
} from "react-native";
import axios from "axios";

const fetchWeather = async (cityName) => {
  const apiKey = "f40af58044177c6613c10d1bbc618659"; // Replace with your API key
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: cityName,
          appid: apiKey,
          units: "metric", // Celsius
        },
      }
    );
    const { main, weather } = response.data;
    const tempweather = response.data.temp;
    console.log(tempweather);

    return {
      temperature: main.temp,
      description: weather[0].description,
      mdescription: weather[0].main,
      feels: main.feels_like,
      icon: weather[0].icon,
      min: main.temp_max,
      max: main.temp_min,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function CityDetailScreen({ route }) {
  const { cityName } = route.params;
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const [backgroundImage, setBackgroundImage] = useState(
    "https://w0.peakpx.com/wallpaper/395/66/HD-wallpaper-meteor-art-astronaut-design-graphic-illustration-night-sky-texture-vector.jpg"
  );

  useEffect(() => {
    const loadWeather = async () => {
      const weatherData = await fetchWeather(cityName);
      setWeather(weatherData);
      setLoading(false);
    };
    loadWeather();
  }, [cityName]);

  const desc = weather ? `${weather.mdescription}` : null;
  console.log(desc);
  let Description = "A good Weather to Enjoy!";
  if (desc === "Haze") {
    Description = "Low visibility with a misty haze in the air.";
  } else if (desc === "Snow") {
    Description = "Snow is falling from the sky.";
  } else if (desc === "Clear") {
    Description = "The sky is clear and sunny.";
  } else if (desc === "Mist") {
    Description = "The air is filled with a thick mist.";
  } else if (desc === "Clouds") {
    Description = "The sky is covered with clouds.";
  }

  const iconUrl = weather
    ? `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
    : null;
  const getDayOfWeek = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date();
    return days[today.getDay()];
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : weather ? (
        <ImageBackground
          source={
            weather.temperature >= 24
              ? require("../assets/ther.jpeg")
              : require("../assets/wether2.jpg")
          }
          style={styles.background}
        >
          <View style={styles.header}>
            <Text>
              <Text style={styles.head1}>Weather</Text>
              <Text style={styles.head2}>Forcast</Text>
            </Text>
          </View>
          <View style={styles.daybox}>
            <Text style={styles.day}>{getDayOfWeek()}</Text>
          </View>
          <View style={styles.box}>
            <View style={styles.containerbox}>
              {/* First Column */}
              <View style={styles.gridItem}>
                {iconUrl && (
                  <Image source={{ uri: iconUrl }} style={styles.weatherIcon} />
                )}
              </View>

              {/* Second Column */}
              <View style={styles.gridItem2}>
                <Text style={styles.textbox}>{weather.max}°</Text>
                <Text style={styles.textbox}>{weather.min}°</Text>
              </View>
            </View>
          </View>
          <View style={styles.citybox}>
            <Text style={styles.citytext}>City: {cityName}</Text>
          </View>
          <View style={styles.desc}>
            <Text style={styles.weather}> {Description}</Text>
          </View>
          <View style={styles.watermarkbox}>
            <Text style={styles.watermark}>Weather App</Text>
          </View>
        </ImageBackground>
      ) : (
        <Text style={styles.error}>Failed to load weather data.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  watermarkbox: {
    marginTop: 50,
  },
  watermark: {
    color: "white",
    fontSize: 17,
    paddingTop: 10,
    fontWeight: "bold",
  },
  desc: {
    height: 150,
    width: 300,
    backgroundColor: "#1D4DA1",
    marginTop: 10,
    opacity: 0.7,
    justifyContent: "center",
  },
  citybox: {
    backgroundColor: "#1D4DA1",
    marginTop: 4,
    width: 100,
    height: 23,
  },
  citytext: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 13,
    paddingTop: 1,
  },
  containerbox: {
    flexDirection: "row", // Set the layout direction to row
    justifyContent: "space-between", // Evenly space items horizontally
    padding: 20,
  },
  gridItem: {
    flex: 1, // Each column will take up equal width
    height: 100, // You can adjust the height of the row
    marginHorizontal: 5, // Spacing between the columns

    justifyContent: "center", // Center the text vertically
    alignItems: "center", // Center the text horizontally
  },
  gridItem2: {
    flex: 1, // Each column will take up equal width
    height: 100, // You can adjust the height of the row
    marginHorizontal: 5, // Spacing between the columns
    fontSize: 30,

    justifyContent: "center", // Center the text vertically
    alignItems: "center", // Center the text horizontally
  },
  textbox: {
    color: "#1D4DA1",
    fontSize: 30,
    fontWeight: "bold",
  },
  box: {
    borderStyle: "solid",
    borderWidth: 6,
    height: 150,
    width: 270,
    margintop: 8,
    borderColor: "#1D4DA1",
  },
  header: {
    paddingBottom: 12,
  },
  head1: {
    color: "#22447A",
    fontSize: 15,
    fontWeight: "bold",
  },
  head2: {
    color: "#508BCC",
    fontSize: 15,
    fontWeight: "bold",
  },
  day: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
  },
  daybox: {
    backgroundColor: "#1D4DA1",
    width: 200,
    height: 40,
    marginBottom: 6,
  },
  container: {
    flex: 1,

    alignItems: "center",
  },
  fontc: {
    color: "white",
  },
  cityName: {
    fontSize: 24,
    marginBottom: 16,
    color: "white",
  },
  weather: {
    fontSize: 23,
    marginBottom: 8,
    color: "white",
    textAlign: "center",

    alignItems: "center",
    fontWeight: "bold",
  },
  weatherIcon: {
    width: 100,
    height: 160,
    marginTop: 10,
  },
  error: {
    fontSize: 18,
    color: "red",
  },
  backgroundImage: {
    flex: 1,
    width: 450,
    height: 900,
    justifyContent: "center", // Align content vertically
    alignItems: "flex-start", // Align content horizontally
  },
  background: {
    flex: 1,
    width: 450,
    height: 940,
    justifyContent: "center",
    alignItems: "center",
  },
});

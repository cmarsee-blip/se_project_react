import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
// import Dashboard from "../Dashboard/Dashboard";

import "./App.css";
import { coordinates, apiKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { addItem, getItems, removeItem } from "../../utils/api";
import { signIn, signUp, checkToken } from "../../utils/auth";
import DeleteConfirmation from "../DeleteConfirmation/DeleteConfirmation";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "warm",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLocating, setIsLocating] = useState(false);
  const [cityPromptVisible, setCityPromptVisible] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const onRegisterUser = (inputValues) => {
    const newUser = {
      name: inputValues.name,
      email: inputValues.email,
      password: inputValues.password,
      avatar: inputValues.avatar,
    };

    signUp(newUser).then(() => {});
  };

  const onLoginUser = (inputValues) => {
    const currentUser = {
      email: inputValues.email,
      password: inputValues.password,
    };

    signIn(currentUser).then(() => {});
  };

  useEffect(() => {
    checkUserToken();
  }, []);

  const checkUserToken = async () => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const userData = await checkToken(token);
      setCurrentUser(userData);
    } catch (error) {
      localStorage.removeItem("jwt");
      console.error("Token validation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (userData) => {
    try {
      const response = await signin(userData);
      localStorage.setItem("jwt", response.token);
      setCurrentUser(response.user);
      setIsLoggedIn(true);
      setIsLoginModalOpen(false);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegistration = async (userData) => {
    try {
      await signup(userData);

      setIsRegisterModalOpen(false);

      const loginResponse = await signin({
        email: userData.email,
        password: userData.password,
      });

      localStorage.setItem("jwt", loginResponse.token);
      setCurrentUser(loginResponse.user);
      setIsLoggedIn(loginResponse.user);
      setIsRegisterModalOpen(false);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };

    addItem(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        // resetForm(defaultValues, {}, false);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardDelete = (card) => {
    let cardId = card.id || card._id;
    removeItem(cardId)
      .then(() => {
        setClothingItems((previous) =>
          previous.filter((item) => (item._id ?? item.id) !== cardId),
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleConfirmClick = () => {
    setActiveModal("confirm");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    setIsLocating(true);
    // Try to get the user's location via the browser Geolocation API.
    // If successful, request weather for that location. Otherwise fall back
    // to the default coordinates from `constants.js`.
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userCoords = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };
          getWeather(userCoords, apiKey)
            .then((data) => {
              const filteredData = filterWeatherData(data);
              setWeatherData(filteredData);
              setIsLocating(false);
            })
            .catch((err) => {
              console.error("Error fetching weather for user location:", err);
              // fallback
              getWeather(coordinates, apiKey)
                .then((data) => {
                  setWeatherData(filterWeatherData(data));
                  setIsLocating(false);
                })
                .catch((e) => {
                  console.error(e);
                  setIsLocating(false);
                });
            });
        },
        (err) => {
          // If the user denies permission or there is an error, prompt the
          // user to enter their city so we can resolve it via OpenWeather
          // Geocoding API (no third-party IP geolocation).
          console.warn(
            "Geolocation failed or denied, prompting for city:",
            err,
          );
          setCityPromptVisible(true);
          setIsLocating(false);
        },
        { timeout: 5000 },
      );
    } else {
      // No geolocation support — use default coordinates
      getWeather(coordinates, apiKey)
        .then((data) => {
          const filteredData = filterWeatherData(data);
          setWeatherData(filteredData);
          setIsLocating(false);
        })
        .catch((e) => {
          console.error(e);
          setIsLocating(false);
        });
    }

    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  async function handleCitySubmit(city) {
    // Return a result object: { success: boolean, message?: string }
    if (!city || !city.trim()) {
      return { success: false, message: "Please enter a city name." };
    }
    setIsLocating(true);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          city,
        )}&limit=1&appid=${apiKey}`,
      );

      if (!res.ok) {
        // HTTP level failure
        console.error("Geocoding HTTP error", res.status);
        setIsLocating(false);
        return {
          success: false,
          message: "Unable to resolve city (network error).",
        };
      }

      const geo = await res.json();
      if (!Array.isArray(geo) || geo.length === 0) {
        setIsLocating(false);
        return { success: false, message: `No results found for "${city}".` };
      }

      const { lat, lon } = geo[0];
      const data = await getWeather({ latitude: lat, longitude: lon }, apiKey);

      if (!data) {
        setIsLocating(false);
        return {
          success: false,
          message: "Weather lookup failed for that location.",
        };
      }

      setWeatherData(filterWeatherData(data));
      setCityPromptVisible(false);
      setIsLocating(false);
      return { success: true };
    } catch (err) {
      console.error("City geocoding failed:", err);
      // keep the prompt visible so user can try again; don't silently fall back
      setIsLocating(false);
      return {
        success: false,
        message: err?.message || "An unexpected error occurred.",
      };
    }
  }

  function handleCityCancel() {
    // user cancelled entering a city: fall back to defaults
    setCityPromptVisible(false);
    setIsLocating(true);
    getWeather(coordinates, apiKey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error)
      .finally(() => setIsLocating(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLocating={isLocating}
              cityPromptVisible={cityPromptVisible}
              onCitySubmit={handleCitySubmit}
              onCityCancel={handleCityCancel}
            />
            <Routes>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      onAddClick={handleAddClick}
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/"
                element={
                  <Main
                    clothingItems={clothingItems}
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                  />
                }
              />
            </Routes>
            <Footer>Cody Marsee</Footer>
          </div>
          <LoginModal
            isOpen={activeModal === "login-user"}
            onClose={closeActiveModal}
            onRegisterUser={onLoginUser}
          ></LoginModal>
          <RegisterModal
            isOpen={activeModal === "register-user"}
            onClose={closeActiveModal}
            onRegisterUser={onRegisterUser}
          ></RegisterModal>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItem={onAddItem}
          ></AddItemModal>
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            handleConfirmClick={handleConfirmClick}
          />
          <DeleteConfirmation
            isOpen={activeModal === "confirm"}
            card={selectedCard}
            onClose={closeActiveModal}
            handleCardDelete={handleCardDelete}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

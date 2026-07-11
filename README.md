# WTWR (What to Wear?) — Front End

A React application that recommends what to wear based on real-time weather conditions at the user's location.

🔗 **Live Demo:** *(not yet deployed — consider adding a hosting link here)* &nbsp;|&nbsp; 🎥 **Demo Video:** https://www.loom.com/share/e35e5e90bb304e7ab9c6c277aa32c205

**Companion repo:** [WTWR — Back End](https://github.com/cmarsee-blip/se_project_express)

---

## 📖 Overview

WTWR helps determine what type of clothing someone should wear based on the current weather conditions in a given location. The goal was to build a full front-end React application that talks to a weather API and to a custom backend to produce personalized recommendations.

## 🛠️ What I Built & How

I built the front end using React with Vite as the build tool. The app fetches live weather data from OpenWeatherAPI, categorizes the current conditions (hot/warm/cold, etc.), and filters clothing item recommendations to match. It pairs with a companion Express/MongoDB backend (see linked repo) for user profiles and clothing item data.

**Key features:**
- Live weather lookup by location via OpenWeatherAPI
- Weather-condition categorization logic
- Clothing recommendations filtered to match current conditions
- Connects to a custom backend API for user/clothing data

**Built with:** React, Vite, JavaScript, CSS, OpenWeatherAPI

## 🖼️ Screenshots

![WTWR front end screenshot](path/to/screenshot.png)

## ⚙️ Running It Locally

Requires Node.js and the companion backend running (see [se_project_express](https://github.com/cmarsee-blip/se_project_express)).

```bash
git clone https://github.com/cmarsee-blip/se_project_react.git
cd se_project_react
npm install
npm run dev
```
You'll also need an OpenWeatherAPI key set in your environment for weather lookups to work.

## ✅ Results

The app successfully retrieves and displays weather-matched clothing recommendations, and integrates with a working backend for persisted user/clothing data.

## 🚀 Future Improvements

- Fix the missing live deployment using a host like Netlify or Vercel to achieve a shareable public demo link.
- Fix [add a specific limitation you noticed] using [your planned approach] to achieve [the outcome].


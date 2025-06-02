# 🕐 Intermittent Fasting Tracker App

A **cross-platform mobile application** built with **React Native (Expo)** to help users **track their intermittent fasting windows**. The app features a **fasting and eating period timer**, allowing users to create, monitor, and review their fasting plans. All data is stored **locally** using `AsyncStorage`.

---

### 📱 Features

- Track intermittent fasting windows
- Start fasting timers
- View recent fasting history (last 5 sessions)
- Simple, intuitive interface
- Data stored locally on the device (offline functionality)

---

### 🔧 Tech Stack & Tools

- **React Native** (via [Expo](https://expo.dev/))
- **TypeScript**
- **Libraries Used**:
   - `@react-navigation/native` – Navigation
   - `@react-native-async-storage/async-storage` – Local data storage
   - `react-native-svg` – Visual elements and icons    
   - And more...

---

### 🖥️ App Screens

1. **Welcome Screen**  
    Landing page where users can view their **last 5 fasting plans** and create a new one. Tapping a plan navigates to the Timer screen.
    
2. **Fasting Screen**  
    Displays a **list of all saved fasting plans**. Each entry can be tapped to open the respective timer screen.
    
3. **Timer Screen**  
    Shows detailed information about a selected fasting plan and includes a **start button** to initiate the fasting counter.

---

### 🚀 Setup & Installation

1. **Prerequisites**:
    
    - Node.js and npm installed: [Download here](https://nodejs.org/)
        
    - [Expo CLI](https://docs.expo.dev/get-started/installation/) installed globally:
        
        ```bash
        npm install -g expo-cli
        ```
        
2. **Clone the repository**:
    
    ```bash
    git clone <your-repo-url>
    cd <project-folder>
    ```
    
3. **Install dependencies**:
    
    ```bash
    npm install
    ```
    
4. **Start the development server**:
    
    ```bash
    npm start
    ```
    
5. **Build for Android/iOS (optional)**:  
    Make sure you have [EAS CLI](https://docs.expo.dev/eas/) installed and configured:
    
    ```bash
    npm install -g eas-cli
    ```
    
    Then run:
    
    ```bash
    eas build --platform android --profile production
    # or
    eas build --platform ios --profile production
    ```
    

---

### 🛠️ Upcoming Improvements

This is an **initial version** of the fasting tracker app. Planned features for future releases include:

- 🌗 Light/Dark theme toggle
    
- 🔔 Reminder notifications (start/end of fasting)
    
- ⏸️ Pause/Resume fasting session
    
- 💬 Motivational quotes during fasting windows
    
- 📊 Analytics & streak tracking
    
- 🎯 Personalized fasting recommendations

### Screenshots of the app

https://github.com/user-attachments/assets/5010e140-9e55-4ae5-8c0f-4f00c4f11229

<p align="center">
  <img alt="1" src="https://github.com/user-attachments/assets/9dc3938e-3aa1-48bd-9e2c-4b3729632688" width="30%">
  <img alt="2" src="https://github.com/user-attachments/assets/949b4608-49d3-499e-a03b-09d9894d111b" width="30%">
  <img alt="3" src="https://github.com/user-attachments/assets/b31b2f68-8ce9-4168-8430-f0872d0e6ed6" width="30%">
  <img alt="4" src="https://github.com/user-attachments/assets/e6e071f5-184d-4296-ad33-13f23c0fb7a6" width="30%">
  <img alt="5" src="https://github.com/user-attachments/assets/35c36e23-f83a-4019-8f0b-1bf4e6f8162a" width="30%">
  <img alt="6" src="https://github.com/user-attachments/assets/3c5065e3-5ba1-42c9-bfe3-8af08600c84b" width="30%">
</p>

---

### 📄 License

This project is licensed under the [MIT License](https://chatgpt.com/c/LICENSE).

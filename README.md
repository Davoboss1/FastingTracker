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
    

---

### 📄 License

This project is licensed under the [MIT License](https://chatgpt.com/c/LICENSE).
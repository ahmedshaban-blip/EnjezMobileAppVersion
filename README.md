# Enjez Mobile App 🏠✨

<div align="center">
  <img src="./assets/logo%202.png" alt="Enjez Logo" width="200"/>

  [![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/ahmedshaban-blip/EnjezMobileAppVersion)

  **Connect with trusted home service providers - anytime, anywhere**
</div>

---

## 🚀 Overview

Enjez is a cross-platform mobile application built with React Native and Expo, designed to connect users with trusted home service providers. The app provides a seamless platform for finding, booking, and managing a wide range of services such as cleaning, maintenance, tutoring, and more. It features distinct interfaces for both clients and administrators.

## 📱 App Screenshots

<div align="center">
<p align="center">
  <img src="assets/Screenshots/1.png" alt="Screen" width="350"/>
  <img src="assets/Screenshots/2.png" alt="Screen" width="350"/>
  <img src="assets/Screenshots/3.png" alt="Screen" width="350"/>
  <img src="assets/Screenshots/4.png" alt="Screen" width="350"/>
</p>
</div>

## ✨ Key Features

### User Features
- **User Authentication**: Secure sign-up and login functionality with role-based navigation
- **Service Discovery**: Browse, search, and filter services by category
- **Personalized Recommendations**: "Picked Just for You" section based on booking history
- **Detailed Service Information**: View comprehensive service details including pricing, duration, and images
- **Seamless Booking Process**: Multi-step booking form with provider, date, and time selection
- **Flexible Payments**: Integrated PayPal support via WebView with offline payment option
- **Booking Management**: Track booking status (Pending, Confirmed, Completed) and view progress
- **Cancel Bookings**: Easy cancellation of service requests
- **Profile Management**: View profile information and change password with re-authentication

## 👥 Team Members

<div align="center">

| **Ahmed Shaban** | **Jovany Wahba** | **Youshia Zakaria** |
|:---:|:---:|:---:|
| 📧 [ahmed.shabaan.dev@gmail.com](mailto:ahmed.shabaan.dev@gmail.com) | 📧 [Jovywahba@gmail.com](mailto:Jovywahba@gmail.com) | 📧 [youshiaz@gmail.com](mailto:youshiaz@gmail.com) |
| Team Leader & Front-end & Cross-Platform Developer | Front-end & Mobile Developer | Front-end & Mobile Developer |
| [![GitHub](https://img.shields.io/badge/GitHub-ahmedshaban--blip-black?style=flat&logo=github)](https://github.com/ahmedshaban-blip) | [![GitHub](https://img.shields.io/badge/GitHub-jovywahba-black?style=flat&logo=github)](https://github.com/jovywahba) | [![GitHub](https://img.shields.io/badge/GitHub-YouShiaZ-black?style=flat&logo=github)](https://github.com/YouShiaZ) |

| **Tassnem Abd Elrazik** | **Maram Ahmed** | **Doha Abo Elkassem** |
|:---:|:---:|:---:|
| 📧 [tasneem.ar.work@gmail.com](mailto:tasneem.ar.work@gmail.com) | 📧 [maramahmed1818@gmail.com](mailto:maramahmed1818@gmail.com) | 📧 [Kassemhossam878@gmail.com](mailto:Kassemhossam878@gmail.com) |
| Front-end & Mobile Developer | Front-end & Mobile Developer | Front-end & Mobile Developer |
| [![GitHub](https://img.shields.io/badge/GitHub-tasneem--abdelrazek-black?style=flat&logo=github)](https://github.com/tasneem-abdelrazek) | [![GitHub](https://img.shields.io/badge/GitHub-MaramAhmed18-black?style=flat&logo=github)](https://github.com/MaramAhmed18) | [![GitHub](https://img.shields.io/badge/GitHub-Doha--AboElkasem-black?style=flat&logo=github)](https://github.com/Doha-AboElkasem) |

</div>

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React Native with Expo |
| **UI Library** | React Native Paper |
| **Styling** | NativeWind (Tailwind CSS for React Native) |
| **Navigation** | React Navigation (Drawer, Stack) |
| **Backend & Database** | Firebase (Firestore, Authentication) |
| **State Management** | React Context API (`AuthContext`, `LoadingContext`) |
| **Date & Time** | react-native-paper-dates |
| **Animations** | React Native Reanimated |
| **Payments** | PayPal Integration |

## 📂 Project Structure

The project follows a standard React Native structure, with the core logic organized within the `src/` directory.

```
EnjezMobileAppVersion/
├── assets/              # App images, icons, and static resources
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── client/      # Client-facing UI components
│   │   ├── common/      # Shared components across the app
│   │   └── layout/      # Layout components (AuthLayout, Navbar)
│   ├── config/          # Configuration files (Firebase, notifications)
│   ├── context/         # Global state management contexts
│   ├── hooks/           # Custom hooks (useAuth, AuthContext)
│   ├── navigation/      # Navigation setup and Drawer configuration
│   ├── pages/           # Top-level screen components
│   │   ├── auth/        # Login and Signup screens
│   │   └── client/      # Main client screens (Home, Services, etc.)
│   └── utils/           # Utility functions (firebaseHelpers)
├── App.js               # Root application component
├── app.json             # Expo configuration
└── package.json         # Dependencies and scripts
```

## ⚙️ Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (LTS version recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- [Expo Go](https://expo.dev/expo-go) app on your mobile device **OR** an Android/iOS emulator
- An active [Firebase](https://firebase.google.com/) project

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ahmedshaban-blip/EnjezMobileAppVersion.git
   cd EnjezMobileAppVersion
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Firebase Configuration

The application uses Firebase for backend services. Follow these steps to configure it:

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project
2. Enable **Firestore Database** and **Authentication** (Email/Password provider)
3. Navigate to Project Settings and add a web app to get your configuration credentials
4. Open `src/config/firebase.js` and replace the `firebaseConfig` object with your credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Running the App

1. **Start the Expo development server:**
   ```bash
   npm start
   ```
   or
   ```bash
   expo start
   ```

2. **Run on a device or emulator:**
   - **Mobile Device**: Scan the QR code with Expo Go app (iOS/Android)
   - **Android Emulator**: Press `a` in the terminal
   - **iOS Simulator**: Press `i` in the terminal (macOS only)

## 📦 Build & Deploy

### Building APK for Android

```bash
expo build:android
```

### Building for iOS

```bash
expo build:ios
```

For detailed build instructions, refer to the [Expo Build Documentation](https://docs.expo.dev/build/introduction/).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available for educational purposes.

## 📧 Contact

For any inquiries or support, feel free to reach out to any team member above.

Project Link: [https://github.com/ahmedshaban-blip/EnjezMobileAppVersion](https://github.com/ahmedshaban-blip/EnjezMobileAppVersion)

---

<div align="center">
  Made with ❤️ by Enjez Team
</div>

# Fitness-tracker

[App Logo](./assets/icon.png)

This is a React Native project built with Expo.

## Description

This app accurately records your steps and burned calories, giving you a report of your progress.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Node.js (LTS recommended)
* npm or yarn
* Expo CLI (`npm install -g expo-cli`)
* Expo Go app (for testing on physical devices) or an emulator/simulator

### Installation

1.  Clone the repository:

    ```bash
    git clone [repository URL]
    cd Fitness-tracker
    ```

2.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

### Running the App

1.  Start the development server:

    ```bash
    npx expo start
    # or
    yarn expo start
    # or
    npm start
    ```

2.  You can then:

    * Scan the QR code with the Expo Go app on your mobile device.
    * Run on an iOS simulator (press `i` in the terminal).
    * Run on an Android emulator (press `a` in the terminal).
    * Run in the web browser (press `w` in the terminal).

## Project Structure

Fitness-tracker/
├── assets/         # Images, fonts, and other assets.
├── components/     # Reusable React components
├── screens/        # App screens/pages
├── navigation/     # Navigation setup (e.g., React Navigation / using Bottom Tabs Navigator)
├── utils/          # Utility functions and helpers
├── hooks/          # Reusable hooks
├── constants/      # organize values that are used throughout codebase and don't change during the program's execution
├── shared/         # Adding reusable types & interfaces
├── store/          # Redux store
├── app.json        # Expo app configuration
├── package.json    # Project dependencies and scripts
└── app.tsx         # Main app entry point

## Dependencies

`react-navigation`: For app navigation.
`expo-notifications`: For push notifications.
`reduxjs/toolkit`: For Redux store.
`expo-font`: For custom fonts.
`expo-splash-screen`: For Splash screen.
`react-native-csv, expo-sharing`: For export as CSV.
`react-native-progress`: For progress bar.
`react-native-calendars`: For Calenders.
`expo-sqlite`: For store data locally on device.
`expo-sensors`: For access hardware device's accelerometer, gyroscope, magnetometer, and pedometer.
`expo-image-picker`: For pickup image from device.

# React Native Playground

Welcome to the React Native Playground! This project is a space I use experimenting with React Native features and libraries.

## Content:

- Right now the app just contains one screen demonstarting how we can implement scrolling while drag and dropping using react-native-reanimated

# Setup

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or later)
- Yarn or npm (package managers)
- React Native CLI
- Xcode (for iOS development)
- Android Studio and Android SDK (for Android development)

Complete the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) before proceeding.

## Installation

1. Clone the repository to your local machine.

2. Navigate to the project directory and install the dependencies:

   ```bash
   yarn install
   # or
   npm install
   ```

3. For iOS, navigate to the `ios` folder and install CocoaPods dependencies:
   ```bash
   cd ios
   pod install
   cd ..
   ```

## Running the Application

### Start the Metro Bundler

Metro is the JavaScript bundler for React Native. Start it by running:

```bash
yarn start
# or
npm start
```

### Run the App

With Metro Bundler running, open a new terminal in the project root.

#### For Android:

```bash
yarn android
# or
npm run android
```

#### For iOS:

```bash
yarn ios
# or
npm run ios
```

If everything is set up correctly, you should see the app running in your Android Emulator or iOS Simulator.

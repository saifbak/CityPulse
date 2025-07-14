# CityPulse - Event Discovery App

CityPulse is a React Native application that helps users discover and track local events. The app supports both English and Arabic languages with full RTL support.

## Features

- 🌍 Bilingual Support (English/Arabic) with RTL
- 🎫 Event Discovery and Details
- 🗺️ Event Map View
- ⭐ Favorite Events System
- 👤 User Authentication
- 🔍 Event Search

## Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- React Native development environment
- Xcode (for iOS development)
- Android Studio (for Android development)
- Firebase project setup

## Installation

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   cd CityPulse
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. iOS specific setup:
   ```bash
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

4. Configure Firebase:
   - Add `google-services.json` to `android/app/`
   - Add `GoogleService-Info.plist` to your iOS project

## Running the App

### Start Metro Server
```bash
npm start
# or
yarn start
```

### iOS
```bash
npm run ios
# or
yarn ios
```

### Android
```bash
npm run android
# or
yarn android
```

## Project Structure

```
src/
├── assets/         # Images and static assets
├── components/     # Reusable UI components
├── core/
│   ├── context/    # React Context providers
│   ├── hooks/      # Custom React hooks
│   ├── i18n/       # Internationalization setup
│   ├── services/   # API and external services
│   ├── store/      # State management
│   └── utils/      # Helper functions
├── navigation/     # Navigation configuration
└── screens/        # App screens
```

## Key Features Implementation

### Internationalization

The app uses `i18n-js` and `react-native-localize` for language management:
- Language switching with RTL support
- Automatic language detection
- Translation fallbacks

### Navigation

Implemented using React Navigation with:
- Authentication flow
- Bottom tab navigation
- Stack navigation for screens

### State Management

- React Context for global state
- Custom hooks for business logic

### Troubleshooting

#### Language/RTL Issues
- Clear app cache and restart
- Ensure all translations are properly set up in `src/core/i18n/translations`
- Check RTL support in custom components

#### Build Issues
- For iOS, ensure CocoaPods is properly installed and run `bundle exec pod install`
- For Android, check your Android SDK setup and Gradle configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

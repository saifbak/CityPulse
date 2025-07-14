# 🌆 City Pulse – Local Events Explorer

City Pulse is a modern React Native mobile app that helps users discover, bookmark, and explore local events. Built with Firebase authentication, a clean splash experience, and dynamic navigation, it's designed to be fast, responsive, and engaging.

---



---

## 📱 App Screenshots

### LTR (English UI)

| Login | Signup | Home | Event Details | Profile |
| ----- | ------ | ---- | ------------- | ------- |
| ![](./assets/screenshots/login.png) | ![](./assets/screenshots/signup.png) | ![](./assets/screenshots/home.png) | ![](./assets/screenshots/details.png) | ![](./assets/screenshots/profile.png) |

### RTL (Arabic UI)

| تسجيل الدخول | إنشاء حساب | الصفحة الرئيسية | تفاصيل الفعالية | الملف الشخصي |
| ------------ | ---------- | --------------- | --------------- | ------------ |
| ![](./assets/screenshots/login_rtl.png) | ![](./assets/screenshots/signup_rtl.png) | ![](./assets/screenshots/home_rtl.png) | ![](./assets/screenshots/details_rtl.png) | ![](./assets/screenshots/profile_rtl.png) |


## 🌐 Live Demo

🚧 *Currently not hosted live. You can run the app locally using the instructions below.*

---

## 📆 Tech Stack

- ⚛️ **React Native** – Cross‑platform mobile development
- 🔥 **Firebase Auth** – Secure authentication (Email/Password & **Fingerprint/Biometric**)
- 🚦 **React Navigation** – Stack & Tab navigation
- 🌍 **Context API** – Global user state management
- 🌐 **RTL Support** – Built‑in right‑to‑left layout handling (Arabic ready)
- ⏳ **Splash Logic** – 1‑second guaranteed display
- 📍 **Event Location Preview** – View map previews for events

---

## ✨ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/city-pulse-app.git
cd city-pulse-app
```

### 2. Install Dependencies

```bash
yarn install
# or
npm install
```

### 3. Setup Firebase

- Create a Firebase project
- Enable **Email/Password** authentication
- Download and place:
  - `google-services.json` in `android/app/`
  - `GoogleService-Info.plist` in `ios/`

---

## 🔧 Firebase + Splash Logic

`UserContext.tsx` ensures:

- Auth state is checked on app launch
- Splash screen is shown for **minimum 1 second**:

```tsx
useEffect(() => {
  const delay = new Promise(res => setTimeout(res, 1000));
  const authCheck = new Promise<void>((res) => {
    const sub = auth().onAuthStateChanged((fbUser) => {
      setUser(fbUser);
      res();
    });
    return () => sub();
  });

  Promise.all([delay, authCheck]).then(() => setInitialising(false));
}, []);
```

---

## 📂 Folder Structure

```
project-root/
│
├── src/
│   ├── assets/
│   │   ├── bookmark.png
│   │   ├── fingerprint.png
│   │   ├── home.png
│   │   ├── left-arrow.png
│   │   ├── right-arrow.png
│   │   ├── star.png
│   │   ├── unstar.png
│   │   ├── user.png
│   │   └── logo.png
│   │
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── FormTextInput.tsx
│   │   ├── Header.tsx
│   │   ├── LanguageSelector.tsx
│   │   ├── Loader.tsx
│   │   └── SearchBar.tsx
│   │
│   ├── core/
│   │   ├── context/
│   │   │   ├── UserContext.tsx
│   │   │   └── LocalizationContext.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useEventsQuery.ts
│   │   │   ├── useFavorite.ts
│   │   │   ├── useInfiniteEvents.ts
│   │   │   └── useLocalization.ts
│   │   ├── i18n/
│   │   │   └── translations/
│   │   │       └── index.ts
│   │   ├── schema/
│   │   │   ├── login.schema.ts
│   │   │   └── signup.schema.ts
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── biometrics.ts
│   │   │   ├── Credentials.ts
│   │   │   └── storage.ts
│   │   ├── store/
│   │   ├── types/
│   │   │   └── navigation.types.ts
│   │   └── utils/
│   │       └── helper.ts
│   │
│   ├── navigation/
│   │   ├── AuthStack.tsx
│   │   ├── HomeStack.tsx
│   │   ├── MainTab.tsx
│   │   └── RootNavigator.tsx
│   │
│   ├── screens/
│   │   ├── EventDetails/
│   │   │   └── index.tsx
│   │   ├── Favorite/
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── Profile/
│   │   ├── SignUp/
│   │   └── Splash/
│   │
│   └── App.tsx
├── android/
├── ios
```

---

## 📊 Future Enhancements

- 🌓 Light/Dark theme toggle

---

## 🧑‍💻 Author

**Saif Bin Abdulkarim**\
Senior Mobile Developer | React Native Specialist\
🌝 UAE 

---

## 📄 License

MIT License – feel free to fork and use!

---

## 🔗 Connect

- GitHub: [github.com/](https://github.com/your-username)saifbak
- LinkedIn: [linkedin.com/in/](https://linkedin.com/in/your-profile)saifbinabdulkarim

---


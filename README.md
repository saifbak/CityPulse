# 🌆 City Pulse – Local Events Explorer

City Pulse is a modern React Native mobile app that helps users discover, bookmark, and explore local events. Built with Firebase authentication, a clean splash experience, and dynamic navigation, it's designed to be fast, responsive, and engaging.

---



---

## 📱 App Screenshots

| Splash Screen | Login Page | Home Page |
| ------------- | ---------- | --------- |
|               |            |           |

> 💡 Tip: Store your screenshots under `assets/screenshots/` and update paths accordingly.

---

## 🌐 Live Demo

🚧 *Currently not hosted live. You can run the app locally using the instructions below.*

---

## 📆 Tech Stack

- ⚛️ **React Native** – Cross-platform mobile development
- 🔥 **Firebase Auth** – Secure authentication
- 🚦 **React Navigation** – Stack & Tab navigation
- 🌍 **Context API** – Global user state management
- ⏳ **Splash Logic** – 1-second guaranteed display

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
├── navigation/
│   ├── RootNavigator.tsx
│   ├── AuthStack.tsx
│   └── MainTab.tsx
│
├── screens/
│   ├── Splash.tsx
│   ├── Login.tsx
│   └── Home.tsx
│
├── core/
│   └── context/
│       └── UserContext.tsx
├── assets/
│   └── logo-citypulse.png
│   └── screenshots/
├── App.tsx
└── README.md
```

---

## 📊 Future Enhancements

- 🔒 Biometric Login (Face ID / Fingerprint)
- 🗘️ Event location preview with Maps
- 🌑 Light/Dark theme toggle
- 🌐 RTL & Arabic support

---

## 🧑‍💻 Author

**Saif Bin Abdulkarim**\
Senior Mobile Developer | React Native Specialist\
🌝 UAE | 🇵🇰 + 🇾🇪 roots\
📧 [Your Email or Portfolio Link]

---

## 📄 License

MIT License – feel free to fork and use!

---

## 🔗 Connect

- GitHub: [github.com/your-username](https://github.com/your-username)
- LinkedIn: [linkedin.com/in/your-profile](https://linkedin.com/in/your-profile)

---


<!-- .github/copilot-instructions.md -->

# Project guidance for AI coding agents

This file gives targeted, actionable guidance for an AI coding assistant working in this repository (an Expo React Native mobile app).

1. Purpose

- Short: help contributors make quick, correct edits across an Expo + Firebase React Native codebase.

2. Big-picture architecture

- Expo-managed React Native app; entry: `App.js`.
- Navigation: React Navigation (stack + drawer). Root navigator is created in `App.js` and the drawer lives at `src/navigation/UserDrawer.jsx`.
- Auth & state: lightweight React Contexts. Example: `src/hooks/AuthContext.jsx` (Firebase auth + Firestore user lookup). Loading UI via `src/context/LoadingContext.jsx`.
- Data / backend: Firebase Auth and Firestore are initialized in `src/config/firebase.js` (client config present in repo). Treat this as an external service integration point.

3. Key developer workflows / commands

- Start dev server: `npm run start` (runs `expo start`).
- Run on Android emulator/device: `npm run android`.
- Run on iOS simulator (mac only): `npm run ios`.
- Web: `npm run web`.
- If adding native dependencies, prefer `expo install <pkg>` to keep versions aligned with the Expo SDK.

4. Project-specific conventions & patterns

- Files in `src/components/common/` are small, reusable UI pieces (`AuthCard.jsx`, `ServiceCard.jsx`, `BookingForm.jsx`). Prefer reusing these over adding duplicated markup.
- UI primitives are in `src/ui/` (`Input.jsx`, `Button.jsx`); use them to ensure consistent props and behavior.
- Context hooks: use `useAuth()` from `src/hooks/AuthContext.jsx` for authentication state; it returns `{ user, authLoading, login, signup, logout }`.
- Navigation screens are registered in `App.js`'s `RootNavigator`. To add a screen, import it at the top of `App.js` and add a `<Stack.Screen name="X" component={X} />` entry (see `BookingDetails` example already present).
- The app imports `react-native-reanimated` at the very top of `App.js` (this is required by Reanimated). Do not remove or reorder that import.
- Gesture handling: keep `GestureHandlerRootView` wrapping the app to avoid gesture issues.

5. Integration points and external dependencies

- Firebase: `src/config/firebase.js` — used by `AuthContext` and various helpers in `src/utils/firebaseHelpers.js`.
- UI libs: `react-native-paper` (themable components) and `react-native-vector-icons`.
- Navigation: `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/drawer`.
- Tailwind / Nativewind: project includes `tailwind.config.js` and `nativewind.config.js`. Use the `className`/tailwind pattern via `nativewind` for styling.

6. Common pitfalls & tips

- Expo + native libs: use `expo install` for compatibility; running plain `npm i` may select incompatible native binaries.
- Reanimated must be imported before other imports that use it — keep `import "react-native-reanimated";` at the top of `App.js`.
- Auth loading: `AuthProvider` returns `null` while `authLoading` is true. When modifying auth flows, ensure loading state doesn't block navigation unexpectedly.
- Sensitive data: `src/config/firebase.js` contains client keys. These are expected in client apps but avoid adding server secrets to the repo.

7. Where to look for examples

- Add authentication logic: `src/hooks/AuthContext.jsx`.
- Add or reuse UI components: `src/components/common/` and `src/ui/`.
- Firestore usage: `src/config/firebase.js` and `src/utils/firebaseHelpers.js`.
- Navigation patterns: `App.js` and `src/navigation/UserDrawer.jsx`.

8. Style and PR expectations

- Follow existing component patterns: small presentational components for UI and context/hooks for logic.
- Keep changes focused: update only the files necessary to implement a single feature/bugfix and include clear PR description.

If something above is unclear or you want more examples (e.g., code snippets for adding a screen or a new context), tell me which area to expand.

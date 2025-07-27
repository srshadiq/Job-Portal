import React from "react";
import "./App.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "@mantine/tiptap/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import theme from "./Colors/Theme";

import { Notifications } from "@mantine/notifications";
import { Provider } from "react-redux";
import Store from "./Store";
import AppRoutes from "./Pages/AppRoutes";
import { ThemeProvider, useTheme } from "./Context/ThemeContext";

function AppContent() {
  const { isDarkMode } = useTheme();

  // Apply theme class to body for global background
  React.useEffect(() => {
    document.body.className = isDarkMode ? "dark" : "light";
  }, [isDarkMode]);

  return (
    <MantineProvider
      defaultColorScheme={isDarkMode ? "dark" : "light"}
      forceColorScheme={isDarkMode ? "dark" : "light"}
      theme={theme}
    >
      <Notifications position="top-center" zIndex={1000} />
      <AppRoutes />
    </MantineProvider>
  );
}

function App() {
  return (
    <Provider store={Store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}

export default App;

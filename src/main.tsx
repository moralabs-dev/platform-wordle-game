import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import App from "./game";

const theme: MantineThemeOverride = {
  primaryColor: "blue",
  defaultRadius: "md",
  fontFamily: "Open Sans, sans-serif",
  headings: {
    fontFamily: "Open Sans, sans-serif",
  },
  breakpoints: {
    xs: "320px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
  },
  components: {
    Button: {
      defaultProps: {
        radius: "md",
      },
    },
    TextInput: {
      defaultProps: {
        radius: "md",
        pattern: "[A-Za-z]",
        maxLength: 1,
        onKeyPress: (e: React.KeyboardEvent) => {
          if (!/[A-Za-z]/.test(e.key)) {
            e.preventDefault();
          }
        },
      },
    },
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);

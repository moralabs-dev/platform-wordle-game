import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from "../pages/Game";
import { Leaderboard } from "../pages/Leaderboard";
import { Shop } from "../pages/Shop";

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
};

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <MantineProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<Game />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/shop" element={<Shop />} />
                </Routes>
            </Router>
        </MantineProvider>
    </React.StrictMode>
);

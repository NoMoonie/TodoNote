import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./Config/routes";
import GlobalStyle from "./Styles/GlobalStyle";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./Styles/themes";

const Root = styled.div`
    background-color: ${(props) => props.theme.backgroundcolor};
    overflow-y: hidden;
`;

function App() {
    const [theme, setTheme] = useState("dark");

    const changeTheme = () => {
        theme === "dark" ? setTheme("light") : setTheme("dark");
    };

    return (
        <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
            <Root>
                <GlobalStyle />
                <Router>
                    <Routes>
                        {routes.map((route, index) => {
                            return <Route key={index} path={route.path} element={<route.component name />} />;
                        })}
                    </Routes>
                </Router>
            </Root>
        </ThemeProvider>
    );
}

export default App;

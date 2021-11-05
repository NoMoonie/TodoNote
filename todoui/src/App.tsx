import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./Config/routes";
import GlobalStyle from "./Styles/GlobalStyle";
import styled, { ThemeProvider } from "styled-components";
import theme from "./Styles/Themes/theme.json";

const Root = styled.div`
    background-color: ${(props) => props.theme.main.BackgroundColor};
    overflow-y: hidden;
`;

function App() {
    return (
        <ThemeProvider theme={theme}>
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

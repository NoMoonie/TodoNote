import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./Config/routes";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    {routes.map((route, index) => {
                        return <Route key={index} path={route.path} element={<route.component name />} />;
                    })}
                </Routes>
            </Router>
        </>
    );
}

export default App;

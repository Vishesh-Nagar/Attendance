import React from "react";
import "./MainContentWrapper.css";

const MainContentWrapper = ({ children }) => (
    <main className="MainContentWrapper">
        {children}
    </main>
);

export default MainContentWrapper;
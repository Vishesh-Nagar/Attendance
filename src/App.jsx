import React from "react";
import Header from "./components/Header/Header";
import MainContentWrapper from "./components/MainContent/MainContentWrapper";
import MainContent from "./components/MainContent/MainContent";
import "./App.css";

function App() {
    return (
        <div className="App">
            <Header />
            <MainContentWrapper>
                <MainContent />
            </MainContentWrapper>
        </div>
    );
}

export default App;
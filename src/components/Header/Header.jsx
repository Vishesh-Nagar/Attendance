import React from "react";
import "./Header.css";
import Logo from "./../Logo/Logo";
import Title from "./../Title/Title";

function Header() {
    return (
        <div className="Header">
            <div className="Logo">
                <Logo />
            </div>
            <div className="Title">
                <Title />
            </div>
        </div>
    );
}

export default Header;
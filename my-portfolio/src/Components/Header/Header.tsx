import React from "react";



import NavigationBar from "./SubComponents/NavigationBar";
const Header: React.FC = () => {
    return(
        <header className="header" id="header" >
            <NavigationBar />
        </header>
    );
}

export default Header;
import React from "react";

interface NavLinkProps {
    section: string,
    icon_classes: string[]
}

const NavLink:React.FC <NavLinkProps> = ({section, icon_classes}) => {
    return(
        <li className="nav__item">
            <a href={`#${section.toLowerCase()}`} className="nav__link">
                <i className={`${icon_classes.join(' ')} nav__icon`}></i> { section }
            </a>
        </li>
    );
}

export default NavLink;
import React from "react";
import { logo } from "../../assets/assets";
import "./header.css";

function Header() {
	return (
		<div className="header">
			<img src={logo} className="logo" alt="logo" />
		</div>
	);
}

export default Header;

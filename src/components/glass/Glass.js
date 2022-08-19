import React from "react";
import "./glass.css";

export default function Glass({ noBounce, children, styles }) {
	const _x = {
		glass: {
			animationName: noBounce ? "none" : "bounceIn",
			// width: width ?? "100%",
			// height: height ?? "100%",
		},
	};

	return (
		<div style={{ ..._x.glass, ...styles }} className="glass">
			{children}
		</div>
	);
}

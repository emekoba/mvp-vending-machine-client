import PulseLoader from "react-spinners/PulseLoader";
import { css } from "@emotion/react";
import "./loader.css";

function Loader({ isLoading, size, type, loaderStyles }) {
	const override = css`
		display: block;
		margin: 0 auto;
		border-color: red;
		background: none;
	`;

	const _loader_props = {
		color: "var(--accent)",
		loading: isLoading,
		css: override,
		size: size ?? 6,
	};

	return (
		<div>
			<PulseLoader {..._loader_props} />
		</div>
	);
}

export default Loader;

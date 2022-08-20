import PulseLoader from "react-spinners/PulseLoader";
import { css } from "@emotion/react";

function Loader({ isLoading, size, loaderStyles }) {
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
		size: size ?? "1.2vw",
	};

	return (
		<div>
			<PulseLoader {..._loader_props} />
		</div>
	);
}

export default Loader;

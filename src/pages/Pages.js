import Onboarding from "./onboarding/Onboarding";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router";
import "./pages.css";
import { AppPages } from "../globals";

export default function Pages() {
	return (
		<div className="pages">
			<p>MVP Vending Machine</p>

			<div style={{ height: "100%" }}>
				<Routes>
					<Route exact path={"/"} element={<Home />} />
					{/* <Route exact path={"/"} element={<Onboarding />} /> */}
					<Route
						exact
						path={AppPages.ONBOARDING_PAGE}
						element={<Onboarding />}
					/>
					<Route exact path={AppPages.HOME_PAGE} element={<Home />} />
					<Route path="*" element={<Navigate to="/" replace />} />
					<Route
						path="/"
						element={<Navigate to={AppPages.ONBOARDING_PAGE} replace />}
					/>
				</Routes>
			</div>
		</div>
	);
}

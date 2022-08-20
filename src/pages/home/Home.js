import React, { useState } from "react";
import { connect } from "react-redux";
import { logoutIcon } from "../../assets/assets";
import { DispatchCommands } from "../../globals";
import "./home.css";
import { useNavigate } from "react-router-dom";
import UserTab from "./userTab/UserTab";
import ProductTab from "./productTab/ProductTab";

function Home({ username, role, wallet, logoutUser }) {
	const tabs = ["User", "Products"];
	const [home, setHome] = useState({
		currentTab: tabs[1],
		deposit: "",
		buy: "",
		productName: "",
	});

	const navigate = useNavigate();

	function switchTabs(e) {
		setHome({ ...home, currentTab: e });
	}

	function logout() {
		logoutUser();
		navigate("/auth");
	}

	function getTabs() {
		switch (home.currentTab.toLowerCase()) {
			case "user":
				return <UserTab />;
			case "products":
				return <ProductTab />;

			default:
				break;
		}
	}

	return (
		<div className="home">
			<button className="logout" onClick={logout}>
				<img src={logoutIcon} />
			</button>

			<div className="home-tabs">
				<div>
					{tabs.map((e) => (
						<button
							key={e}
							style={
								!(home.currentTab === e)
									? {
											background: "var(--accent)",
											border: "1px solid var(--text)",
											color: "var(--text)",
									  }
									: {}
							}
							onClick={() => switchTabs(e)}
						>
							{e}
						</button>
					))}
				</div>

				<div className="user-info">
					{username}
					<p>{`¢${wallet}`}</p>
				</div>
			</div>

			<div className="home-main">{getTabs()}</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		username: state.currentUser.username,
		wallet: state.currentUser.deposit,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		logoutUser: () =>
			dispatch({
				type: DispatchCommands.LOGOUT,
			}),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

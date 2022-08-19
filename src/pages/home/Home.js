import React, { useState } from "react";
import { connect } from "react-redux";
import { logoutIcon } from "../../assets/assets";
import { asyncBuy, asyncDeposit } from "../../backend";
import Loader from "../../components/Loader";
import { DispatchCommands } from "../../globals";
import "./home.css";
import { useNavigate } from "react-router-dom";
import UserTab from "./UserTab";

function Home({ username, role, wallet, updateWallet, logoutUser }) {
	const tabs = ["User", "Products"];
	const [home, setHome] = useState({
		currentTab: tabs[0],
		deposit: "",
		buy: "",
		productName: "",
	});
	const [loader, setloader] = useState({
		depLoading: false,
		buyLoading: false,
	});
	const navigate = useNavigate();

	function switchTabs(e) {
		setHome({ ...home, currentTab: e });
	}

	// function updateField(e, field) {
	// 	if (!loader.depLoading && field === "deposit") {
	// 		setHome({ ...home, [`${field}`]: e.target.value });
	// 	}

	// 	if (!loader.buyLoading && (field === "buy" || field === "productName")) {
	// 		setHome({ ...home, [`${field}`]: e.target.value });
	// 	}
	// }

	function deposit() {
		if (home.deposit !== "") {
			setloader({ ...loader, depLoading: true });
			asyncDeposit(home)
				.then((res) => {
					console.log(res);
					updateWallet(home.deposit);
				})
				.catch((e) => {})
				.finally(() => {
					setloader({ ...loader, depLoading: false });
				});
		}
	}

	function buy() {
		setloader({ ...loader, depLoading: true });
		asyncBuy(home)
			.then((res) => {
				console.log(res);
				// updateWallet(home.deposit);
			})
			.catch((e) => {})
			.finally(() => {
				setloader({ ...loader, depLoading: false });
			});
	}

	function logout() {
		logoutUser();
		navigate("/auth");
	}

	function getTabs() {
		switch (home.currentTab.toLowerCase()) {
			case "user":
				return <UserTab />;

			default:
				break;
		}
	}

	return (
		<div className="home">
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
					<div>
						<div>{username}</div>
						{role}
					</div>
					<p>{`$${wallet}`}</p>
				</div>
			</div>

			<div className="home-main">
				{getTabs()}

				<button className="logout" onClick={logout}>
					<img src={logoutIcon} />
				</button>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		username: state.currentUser.username,
		wallet: state.currentUser.deposit,
		role: state.currentUser.role,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		updateWallet: (amount) =>
			dispatch({
				type: DispatchCommands.UPDATE_WALLET,
				amount,
			}),

		logoutUser: () =>
			dispatch({
				type: DispatchCommands.LOGOUT,
			}),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

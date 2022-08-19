import React, { useState } from "react";
import { connect } from "react-redux";
import { asyncDeposit } from "../../backend";
import Loader from "../../components/loader/Loader";
import "./home.css";

function Home({ username, cost }) {
	const tabs = ["Transactions", "Products"];
	const [home, setHome] = useState({
		currentTab: tabs[0],
		deposit: "",
		buy: "",
	});
	const [loader, setloader] = useState(true);

	function switchTabs(e) {
		setHome({ ...home, currentTab: e });
	}

	function updateField(e, field) {
		setHome({ ...home, [`${field}`]: e.target.value });
	}

	function deposit() {
		setloader(true);
		asyncDeposit(home)
			.then((res) => {
				// console.log(res);
			})
			.catch((e) => {});
	}

	function buy() {}

	function logout() {}

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
					{username}
					<p>{`$${cost}`}</p>
				</div>
			</div>

			<div className="home-main">
				<div className="home-left">
					<div className="item-input-cntr">
						<div className="input-cntr">
							<input
								value={home.deposit}
								className="home-item-input"
								onChange={(e) => updateField(e, "deposit")}
								type="number"
							/>
							<button className="home-btn" onClick={deposit}>
								{loader ? <Loader /> : "deposit"}
							</button>
						</div>
					</div>

					<div className="item-input-cntr">
						<div className="input-cntr">
							<input
								value={home.buy}
								className="home-item-input"
								onChange={(e) => updateField(e, "buy")}
								type="number"
							/>
							<button className="home-btn" onClick={buy}>
								Buy
							</button>
						</div>
					</div>
				</div>

				{/* <button className="logout" onClick={logout}></button> */}
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		username: state.currentUser.username,
		cost: state.currentUser.cost,
	};
}

export default connect(mapStateToProps)(Home);

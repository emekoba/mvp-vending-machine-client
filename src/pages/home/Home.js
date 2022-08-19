import React, { useState } from "react";
import "./home.css";

function Home() {
	const tabs = ["Transactions", "Products"];
	const [home, setHome] = useState({
		currentTab: tabs[0],
	});

	function switchTabs(e) {
		setHome({ ...home, currentTab: e });
	}

	function updateField(e, field) {
		setHome({ ...home, [`${field}`]: e.target.value });
	}

	function deposit() {}

	function buy(e, field) {}

	return (
		<div className="home">
			<div className="home-tabs">
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

			<div className="home-main">
				<div className="home-left">
					<div className="item-input-cntr">
						<div className="input-cntr">
							<input
								value={home.deposit}
								className="home-item-input"
								onChange={(e) => updateField(e, "deposit")}
							/>
							<button className="home-btn" onClick={deposit}>
								deposit
							</button>
						</div>
					</div>

					<div className="item-input-cntr">
						<div className="input-cntr">
							<input
								value={home.deposit}
								className="home-item-input"
								onChange={(e) => updateField(e, "deposit")}
							/>
							<button className="home-btn" onClick={buy}>
								Buy
							</button>
						</div>
					</div>
				</div>

				<div className="home-right"></div>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		stashDb: state.stash,
	};
}

export default connect(mapStateToProps)(Home);

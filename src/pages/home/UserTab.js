import React, { useState } from "react";
import { asyncUpdate } from "../../backend";
import Loader from "../../components/Loader";

export default function UserTab({ user }) {
	const [userScheme, setuserScheme] = useState({
		user,
	});
	const [loader, setloader] = useState(true);

	function update() {
		setloader({ ...loader, depLoading: true });
		asyncUpdate(userScheme.user)
			.then((res) => {
				console.log(res);
				// updateWallet(home.deposit);
			})
			.catch((e) => {})
			.finally(() => {
				setloader({ ...loader, depLoading: false });
			});
	}

	function updateField(e, field) {
		// if (!loader.depLoading && field === "deposit") {
		// 	setHome({ ...home, [`${field}`]: e.target.value });
		// }
		// if (!loader.buyLoading && (field === "buy" || field === "productName")) {
		// 	setHome({ ...home, [`${field}`]: e.target.value });
		// }
	}

	return (
		<div className="user-tab">
			<div className="item-input-cntr">
				<div className="input-cntr">
					<input
						value={userScheme.user?.username}
						className="home-item-input"
						onChange={(e) => updateField(e, "buy")}
						type="number"
						placeholder="amount"
					/>
					<input
						value={userScheme.user?.role}
						className="home-item-input"
						onChange={(e) => updateField(e, "buy")}
						type="number"
						placeholder="amount"
					/>

					<input
						value={userScheme.user?.roleductName}
						className="home-item-input"
						onChange={(e) => updateField(e, "productName")}
						placeholder="product name"
					/>
					<button className="home-btn" onClick={update}>
						{loader ? <Loader /> : "Update"}
					</button>
				</div>
			</div>

			{/* <div className="item-input-cntr blok">
				<div className="input-cntr">
					<input
						value={userScheme.user.roleosit}
						className="home-item-input"
						onChange={(e) => updateField(e, "deposit")}
						type="number"
						placeholder="amount"
					/>
					<button className="home-btn" onClick={deposit}>
						{loader.depLoading ? <Loader /> : "deposit"}
					</button>
				</div>
			</div> */}
		</div>
	);
}

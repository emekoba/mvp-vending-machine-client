import React, { useState } from "react";
import { asyncReset, asyncUpdate } from "../../../backend";
import Loader from "../../../components/Loader";
import { connect } from "react-redux";
import { asyncDeposit } from "../../../backend";
import { DispatchCommands } from "../../../globals";

function UserTab({ user, updateWallet, updateUser, resetWallet }) {
	const [userScheme, setUserScheme] = useState({
		user,
		deposit: "",
	});
	const [loader, setloader] = useState({
		depLoading: false,
		updateLoading: false,
		resetLoading: false,
	});

	async function update() {
		if (userScheme.user.username !== "") {
			setloader({ ...loader, updateLoading: true });
			const resp = await asyncUpdate({
				...userScheme.user,
				username:
					userScheme.user.username === user.username
						? ""
						: userScheme.user.username,
			});

			if (resp.success) {
				console.log(resp.data);
				updateUser(resp.data.updatedUser);
			} else {
				alert(resp.error);
			}
			setloader({ ...loader, updateLoading: false });
		}
	}

	function updateField(e, field) {
		if (field === "deposit")
			setUserScheme({
				...userScheme,
				deposit: e.target.value,
			});
		else
			setUserScheme({
				...userScheme,
				user: { ...userScheme.user, [`${field}`]: e.target.value },
			});
	}

	async function deposit() {
		if (userScheme.deposit !== "") {
			setloader({ ...loader, depLoading: true });

			const resp = await asyncDeposit(userScheme.deposit);

			if (resp.success) {
				updateWallet(userScheme.deposit);
			} else {
				alert(resp.error);
			}
			setloader({ ...loader, depLoading: false });
		}
	}

	async function reset() {
		setloader({ ...loader, resetLoading: true });

		const resp = await asyncReset();

		if (resp.success) {
			resetWallet(0);
		} else {
			alert(resp.error);
		}
		setloader({ ...loader, resetLoading: false });
	}

	return (
		<div className="user-tab">
			<div className="item-input-cntr">
				<div className="input-cntr">
					<input
						value={userScheme.user?.username}
						className="home-item-input"
						onChange={(e) => updateField(e, "username")}
						placeholder="username"
					/>

					{/* <select
						onChange={(e) => updateField(e, "role")}
						className="home-item-select"
						value={userScheme.user.role}
					>
						<option value="BUYER">BUYER</option>
						<option value="SELLER">SELLER</option>
					</select> */}

					<button className="home-btn" onClick={update}>
						{loader.updateLoading ? <Loader /> : "Update"}
					</button>
				</div>
			</div>

			{user.role === "BUYER" && (
				<div className="item-input-cntr">
					<div className="input-cntr">
						<input
							value={userScheme.deposit}
							className="home-item-input"
							onChange={(e) => updateField(e, "deposit")}
							placeholder="deposit"
							min="1"
							type="number"
						/>
						<button className="home-btn" onClick={deposit}>
							{loader.depLoading ? <Loader /> : "Deposit"}
						</button>
						<button
							className="home-btn"
							style={{ marginLeft: 20 }}
							onClick={reset}
						>
							{loader.resetLoading ? <Loader /> : "Reset"}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

function mapStateToProps(state) {
	return {
		user: state.currentUser,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		updateWallet: (amount) =>
			dispatch({
				type: DispatchCommands.UPDATE_WALLET,
				amount,
			}),

		updateUser: (user) =>
			dispatch({
				type: DispatchCommands.UPDATE_USER,
				user,
			}),

		logoutUser: () =>
			dispatch({
				type: DispatchCommands.LOGOUT,
			}),

		resetWallet: (amount) =>
			dispatch({
				type: DispatchCommands.RESET_WALLET,
				amount,
			}),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTab);

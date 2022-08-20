import React, { useState } from "react";
import { AuthStates, DispatchCommands } from "../../globals";
import { asyncLogin, asyncRegister } from "../../backend";
import "./onboarding.css";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

function Onboarding({ user, loginUser, registerUser }) {
	const [authForm, setAuthForm] = useState({
		username: "ambrose",
		password: "Password1$",
		confirmPassword: "",
		deposit: "0",
		role: "buyer",
		state: AuthStates.LOGIN,
	});
	const navigate = useNavigate();

	function updateField(e, field) {
		setAuthForm({ ...authForm, [`${field}`]: e.target.value });
	}

	async function login() {
		const resp = await asyncLogin(authForm);

		if (resp.success) {
			console.log(resp.data);
			navigate("/home");
			loginUser(resp.data.user);
		} else {
			alert(resp.error);
		}
	}

	async function register() {
		if (Object.keys(authForm).filter((e) => authForm[e] === "").length === 0) {
			const resp = await asyncRegister(authForm);

			if (resp.success) {
				console.log(resp.data);
				// registerUser(resp.data.user);
				setAuthForm({ ...authForm, state: AuthStates.LOGIN });
			} else {
				alert(resp.error);
			}
		} else {
			alert("Fill All Fields To Contine");
		}
	}

	function toggleAuth() {
		setAuthForm({
			...authForm,
			state:
				authForm.state === AuthStates.REGISTER
					? AuthStates.LOGIN
					: AuthStates.REGISTER,
		});
	}

	return (
		<div className="onboarding">
			<div className="onboarding-leftside">
				<div className="item-input-cntr">
					<p>Username</p>
					<input
						value={authForm.username}
						className="item-input"
						onChange={(e) => updateField(e, "username")}
					/>
				</div>

				<div className="item-input-cntr">
					<p>Password</p>
					<input
						value={authForm.password}
						className="item-input"
						onChange={(e) => updateField(e, "password")}
						type="password"
					/>
				</div>

				{authForm.state === AuthStates.REGISTER && (
					<>
						<div className="item-input-cntr">
							<p>Confirm Password</p>
							<input
								value={authForm.confirmPassword}
								className="item-input"
								onChange={(e) => updateField(e, "confirmPassword")}
								type="password"
							/>
						</div>
						<div className="item-input-cntr">
							<p>Deposit</p>
							<input
								value={authForm.deposit}
								className="item-input"
								onChange={(e) => updateField(e, "deposit")}
								type="number"
							/>
						</div>
						<div className="item-input-cntr">
							<p>Role</p>
							{/* <input
								value={authForm.role}
								className="item-input"
								onChange={(e) => updateField(e, "role")}
							/> */}

							<select
								onChange={(e) => updateField(e, "role")}
								value={authForm.role}
							>
								<option value="BUYER">BUYER</option>
								<option value="SELLER">SELLER</option>
							</select>
						</div>
					</>
				)}
			</div>

			<div className="onboarding-rightside">
				<div>
					<p className="toggle-auth" onClick={toggleAuth}>
						go to{" "}
						{authForm.state === AuthStates.REGISTER ? "sign in" : "sign up"}
					</p>
					<button
						onClick={authForm.state === AuthStates.REGISTER ? register : login}
					>
						{authForm.state === AuthStates.REGISTER ? "Sign Up" : "Sign In"}
					</button>
				</div>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		role: state.currentUser.role,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		loginUser: (user) =>
			dispatch({
				type: DispatchCommands.LOGIN,
				user,
			}),
		registerUser: (user) =>
			dispatch({
				type: DispatchCommands.REGISTER,
				user,
			}),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);

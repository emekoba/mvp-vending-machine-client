import React, { useState } from "react";
import { AuthStates, DispatchCommands } from "../../globals";
import { asyncLogin } from "../../backend";
import "./onboarding.css";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

function Onboarding({ loginUser }) {
	const [authForm, setAuthForm] = useState({
		username: "rex",
		password: "Password1$",
		confirmPassword: "",
		deposit: "",
		role: "",
		state: AuthStates.LOGIN,
	});
	const navigate = useNavigate();

	function updateField(e, field) {
		setAuthForm({ ...authForm, [`${field}`]: e.target.value });
	}

	function login() {
		asyncLogin(authForm)
			.then((res) => {
				console.log(res.data);
				loginUser(res.data.user);
				navigate("home");
			})
			.catch((e) => {});
	}

	function register() {
		// control.dispatch({
		// 	type: DispatchCommands.REGISTER,
		// 	name: authForm.name,
		// 	email: authForm.email,
		// 	password: authForm.password,
		// });
		// setAuthForm({ ...auth, signState: "sign-in" });
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
			<div className="bottom-right-effect" />

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
							/>
						</div>
						<div className="item-input-cntr">
							<p>Deposit</p>
							<input
								value={authForm.deposit}
								className="item-input"
								onChange={(e) => updateField(e, "deposit")}
							/>
						</div>
						<div className="item-input-cntr">
							<p>Role</p>
							<input
								value={authForm.role}
								className="item-input"
								onChange={(e) => updateField(e, "role")}
							/>
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

function mapDispatchToProps(dispatch) {
	return {
		loginUser: (user) =>
			dispatch({
				type: DispatchCommands.LOGIN,
				user,
			}),
	};
}

export default connect(null, mapDispatchToProps)(Onboarding);

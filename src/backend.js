import axios from "axios";

const API_URL = "http://localhost:2000/";

const ROUTES = {
	auth: "user/",
	product: "product/",
	transaction: "transaction/",
};

const ENDPOINT = {
	signup: "create",
	signin: "login",
	deposit: "update",
};

function authHeader() {
	const russbank = JSON.parse(sessionStorage.getItem("russbank-user"));

	if (russbank && russbank.token) {
		return { Authorization: "Bearer " + russbank.token };
	} else {
		return {};
	}
}

// function registers(form) {
// 	// return axios
// 	return fetch(API_URL + ROUTES.auth + ENDPOINT.signup, {
// 		method: "POST",
// 		body: JSON.stringify({
// 			first_name: form.firstName,
// 			user_role: form.userRole,
// 			last_name: form.lastName,
// 			phone_number: form.phoneNumber,
// 			address: form.address,
// 			email: form.email,
// 			password: form.password,
// 			confirm_password: form.cpassword,
// 		}),

// 		header: {
// 			"Content-Type": "application/json",
// 		},
// 	})
// 		.then((res) => {
// 			return {
// 				success: true,
// 				data: res.data,
// 			};
// 		})
// 		.catch((e) => {

// 			return { success: false, messages: [e?.response?.data?.message] };
// 		});
// }

function asyncLogin(form) {
	return axios
		.post(API_URL + ROUTES.auth + ENDPOINT.signin, {
			username: form.username,
			password: form.password,
		})
		.then((res) => {
			if (res.data.token) {
				const sessionObject = {
					loginTime: new Date().getTime(),
					expiresAt: 720,
					token: res.data.token,
				};

				sessionStorage.setItem("mvp-user", JSON.stringify(sessionObject));
			}

			return {
				success: true,
				data: res.data,
			};
		})
		.catch((e) => {
			return { success: false, messages: [e?.response?.data?.message] };
		});
}

function asyncRegister(form) {
	return axios
		.post(API_URL + ROUTES.auth + ENDPOINT.signup, {
			username: form.username,
			password: form.password,
			confirmPassword: form.confirmPassword,
			deposit: form.deposit,
			role: form.role,
		})
		.then((res) => {
			return {
				success: true,
				data: res.data,
			};
		})
		.catch((e) => {
			return { success: false, messages: [e?.response?.data?.message] };
		});
}

// function transfer(form) {
// 	return axios
// 		.post(
// 			API_URL + ROUTES.product + ENDPOINT.transfer,
// 			{
// 				recipient: form.recipient,
// 				amount: parseInt(form.amount),
// 			},
// 			{ headers: authHeader() }
// 		)
// 		.then((res) => {
// 			return {
// 				success: true,
// 				data: res.data,
// 			};
// 		})
// 		.catch((e) => {
// 			return { success: false, messages: [e?.response?.data?.message] };
// 		});
// }

function asyncDeposit(form) {
	return axios
		.post(
			API_URL + ROUTES.transaction + ENDPOINT.deposit,
			{
				amount: parseInt(form.amount),
			},
			{ headers: authHeader() }
		)
		.then((res) => {
			return {
				success: true,
				data: res.data,
			};
		})
		.catch((e) => {
			return { success: false, messages: [e?.response?.data?.message] };
		});
}

// function withdraw(form) {
// 	return axios
// 		.post(
// 			API_URL + ROUTES.product + ENDPOINT.withdraw,
// 			{
// 				amount: parseInt(form.amount),
// 			},
// 			{ headers: authHeader() }
// 		)
// 		.then((res) => {
// 			return {
// 				success: true,
// 				data: res.data,
// 			};
// 		})
// 		.catch((e) => {
// 			return { success: false, messages: [e?.response?.data?.message] };
// 		});
// }

// function getAllUsers() {
// 	return axios
// 		.get(API_URL + ROUTES.transaction + ENDPOINT.all, { headers: authHeader() })
// 		.then((res) => {
// 			return {
// 				success: true,
// 				data: res.data,
// 			};
// 		})
// 		.catch((e) => {
// 			return { success: false, messages: [e?.response?.data?.message] };
// 		});
// }

// function deleteUser(account_number) {
// 	return axios
// 		.delete(
// 			API_URL +
// 				ROUTES.transaction +
// 				ENDPOINT.delete +
// 				`account_number=${account_number}`,

// 			{ headers: authHeader() }
// 		)
// 		.then((res) => {
// 			return {
// 				success: true,
// 				data: res.data,
// 			};
// 		})
// 		.catch((e) => {
// 			return { success: false, messages: [e?.response?.data?.message] };
// 		});
// }

// function getTransactions() {
// 	return axios
// 		.get(API_URL + ROUTES.product + ENDPOINT.transactions, {
// 			headers: authHeader(),
// 		})
// 		.then((res) => {
// 			return {
// 				success: true,
// 				data: res.data,
// 			};
// 		})
// 		.catch((e) => {
// 			return { success: false, messages: [e?.response?.data?.message] };
// 		});
// }

export {
	asyncLogin,
	asyncRegister,
	asyncDeposit,
	// transfer,
	// deposit,
	// withdraw,
	// getAllUsers,
	// deleteUser,
	// getTransactions,
};

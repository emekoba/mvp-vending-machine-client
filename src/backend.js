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
	update: "update",
	deposit: "deposit",
	buy: "buy",
};

function authHeader() {
	const russbank = JSON.parse(sessionStorage.getItem("russbank-user"));

	if (russbank && russbank.token) {
		return { Authorization: "Bearer " + russbank.token };
	} else {
		return {};
	}
}

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

function asyncBuy(form) {
	return axios
		.post(
			API_URL + ROUTES.transaction + ENDPOINT.buy,
			{
				productId: form.productId,
				amount: form.amount,
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

function asyncUpdate({ role, username }) {
	return axios
		.put(
			API_URL + ROUTES.user + ENDPOINT.update,
			{
				role,
				username,
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

function asyncGetProduct(id) {
	return axios
		.get(API_URL + ROUTES.product + `${id}`, { headers: authHeader() })
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
	asyncGetProduct,
	asyncBuy,
	asyncUpdate,
};

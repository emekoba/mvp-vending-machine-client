import axios from "axios";

const API_URL = "http://localhost:2000/";
const ROUTES = {
	auth: "user/",
	product: "product/",
	transaction: "transaction/",
};
const ENDPOINT = {
	create: "create",
	signin: "login",
	update: "update",
	deposit: "deposit",
	buy: "buy",
	all: "all",
	delete: "delete/",
	reset: "reset",
};

function authHeader() {
	const mvpUser = JSON.parse(sessionStorage.getItem("mvp-user"));

	if (mvpUser && mvpUser.token) {
		return { Authorization: "Bearer " + mvpUser.token };
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
					user: res.data.user,
				};

				sessionStorage.setItem("mvp-user", JSON.stringify(sessionObject));
			}

			return {
				success: true,
				data: res.data,
			};
		})
		.catch((e) => {
			return { success: false, error: e?.response.data.error };
		});
}

function asyncRegister(form) {
	return axios
		.post(API_URL + ROUTES.auth + ENDPOINT.create, {
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
			return { success: false, error: e?.response.data.error };
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
			return { success: false, error: e?.response.data.error };
		});
}

function asyncUpdate({ role, username }) {
	return axios
		.put(
			API_URL + ROUTES.auth + ENDPOINT.update,
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
			return { success: false, error: e?.response.data.error };
		});
}

function asyncDeposit(amount) {
	return axios
		.post(
			API_URL + ROUTES.transaction + ENDPOINT.deposit,
			{
				amount,
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
			return { success: false, error: e?.response.data.error };
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
			return { success: false, error: e?.response.data.error };
		});
}

function asyncGetAllProducts() {
	return axios
		.get(API_URL + ROUTES.product + ENDPOINT.all, { headers: authHeader() })
		.then((res) => {
			return {
				success: true,
				data: res.data,
			};
		})
		.catch((e) => {
			return { success: false, error: e?.response.data.error };
		});
}

function asyncCreateProduct({ productName, cost, amountAvailable }) {
	return axios
		.post(
			API_URL + ROUTES.product + ENDPOINT.create,
			{
				productName,
				cost,
				amountAvailable,
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
			return { success: false, error: e?.response.data.error };
		});
}

function asyncDeleteProduct(productId) {
	return axios
		.delete(API_URL + ROUTES.product + ENDPOINT.delete + productId, {
			headers: authHeader(),
		})
		.then((res) => {
			return {
				success: true,
				data: res.data,
			};
		})
		.catch((e) => {
			return { success: false, error: e?.response.data.error };
		});
}

function asyncReset() {
	return axios
		.post(
			API_URL + ROUTES.transaction + ENDPOINT.reset,
			{},
			{
				headers: authHeader(),
			}
		)
		.then((res) => {
			return {
				success: true,
				data: res.data,
			};
		})
		.catch((e) => {
			return { success: false, error: e?.response.data.error };
		});
}

export {
	asyncLogin,
	asyncRegister,
	asyncDeposit,
	asyncGetProduct,
	asyncBuy,
	asyncUpdate,
	asyncCreateProduct,
	asyncGetAllProducts,
	asyncDeleteProduct,
	asyncReset,
};

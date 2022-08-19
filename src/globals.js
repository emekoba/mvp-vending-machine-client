export const AppPages = {
	HOME_PAGE: "/home",
	ONBOARDING_PAGE: "/auth",
};

export const AuthStates = {
	LOGIN: "LOGIN",
	REGISTER: "REGISTER",
};

export const DispatchCommands = {
	LOGIN: "LOGIN",
	REGISTER: "REGISTER",
	GET_USER: "GET_USER",
	LOGOUT: "LOGOUT",
	CHANGE_CURRENT_PAGE: "CHANGE_CURRENT_PAGE",
	ADD_ITEM_TO_INVENTORY: "ADD_ITEM_TO_INVENTORY",
	CREATE_PRODUCT: "CREATE_PRODUCT",
	UPDATE_WALLET: "UPDATE_WALLET",
};

export function generateId(length) {
	if (!length) {
		length = 20;
	}

	let result = "";

	let characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	let charactersLength = characters.length;

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}

export function removeArrItem(arr, value) {
	var i = 0;
	while (i < arr.length) {
		if (arr[i] === value) {
			arr.splice(i, 1);
		} else {
			++i;
		}
	}
	return arr;
}

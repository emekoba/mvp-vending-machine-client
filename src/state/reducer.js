import { AppPages, DispatchCommands, generateId } from "../globals";

export const globalStore = {
	isLoggedIn: false,
	currentAppPage: AppPages.HOME_PAGE,
	currentUser: {
		...JSON.parse(sessionStorage.getItem("mvp-user"))?.["user"],
	},
	productList: [],
	// sessionStorage.getItem("productList") !== null
	// 		? JSON.parse(sessionStorage.getItem("productList"))
	// 		:
};

function createItem(item, state) {
	let ordered_item = { ...JSON.parse(localStorage.getItem("items")) };

	console.log(globalStore.currentUser);

	ordered_item[generateId()] = {
		...item,
		creator: state.currentUser.id,
		createdAt: new Date(),
	};

	localStorage.setItem("items", JSON.stringify(ordered_item));

	return {
		...state,
	};
}

function updateUser(user, state) {
	let mvpUser = JSON.parse(sessionStorage.getItem("mvp-user"));

	let update = {
		...mvpUser["user"],
		...user,
	};

	console.log(update);

	sessionStorage.setItem(
		"mvp-user",
		JSON.stringify({ ...mvpUser, user: update })
	);

	return {
		...state,
		currentUser: update,
	};
}

function updateProductList(productList, state) {
	sessionStorage.setItem("productList", productList);

	return {
		...state,
		productList,
	};
}

export function globalReducer(state = globalStore, action) {
	switch (action.type) {
		case DispatchCommands.LOGIN:
			return {
				...state,
				isLoggedIn: true,
				currentUser: action.user,
			};

		case DispatchCommands.LOGOUT:
			return {
				...state,
				isLoggedIn: false,
				currentUser: {},
			};

		case DispatchCommands.UPDATE_USER:
			return updateUser(action.user, state);

		case DispatchCommands.CHANGE_CURRENT_PAGE:
			return {
				...state,
				currentAppPage: action.payload,
			};

		case DispatchCommands.CREATE_PRODUCT:
			return createItem(action.item, state);

		case DispatchCommands.UPDATE_PRODUCT_LIST:
			return updateProductList(action.productList, state);

		case DispatchCommands.UPDATE_WALLET:
			return updateUser(
				{
					...state.currentUser,
					deposit:
						parseInt(state.currentUser.deposit) + parseInt(action.amount),
				},
				state
			);

		default:
			return state;
	}
}

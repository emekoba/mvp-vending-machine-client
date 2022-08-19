import { createContext } from "react";
import { AppPages, DispatchCommands, generateId } from "../globals";

export const Control = createContext();

export const globalStore = {
	isLoggedIn: false,
	currentAppPage: AppPages.HOME_PAGE,
	currentUser: {},
};

function registerUser(name, email, password, state) {
	const usersDb = JSON.parse(localStorage.getItem("users"));

	let newUsersDb = {
		...usersDb,
		[`${generateId()}`]: {
			name,
			email,
			password,
			createdAt: new Date(),
		},
	};

	localStorage.setItem("users", JSON.stringify(newUsersDb));

	return state;
}

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

// function addItemToInventory(inventoryId, itemId) {
// 	let inventoriesDb = JSON.parse(localStorage.getItem("inventories"));

// 	inventoriesDb[inventoryId] = {
// 		...inventoriesDb[inventoryId],
// 		items: {
// 			...inventoriesDb[inventoryId]["items"],
// 			[`${itemId}`]: {
// 				addedAt: new Date(),
// 			},
// 		},
// 	};

// 	localStorage.setItem("inventories", JSON.stringify(inventoriesDb));
// }

// function getInventories(state) {
// 	return {
// 		...state,
// 		inventories: JSON.parse(localStorage.getItem("inventories")),
// 	};
// }

export function globalReducer(state = globalStore, action) {
	switch (action.type) {
		case DispatchCommands.LOGIN:
			return {
				...state,
				isLoggedIn: true,
				currentUser: action.user,
			};

		case DispatchCommands.REGISTER:
			return registerUser(action.name, action.email, action.password, state);

		case DispatchCommands.LOGOUT:
			return {
				...state,
				isLoggedIn: false,
			};

		case DispatchCommands.CHANGE_CURRENT_PAGE:
			return {
				...state,
				currentAppPage: action.payload,
			};

		case DispatchCommands.CREATE_PRODUCT:
			return createItem(action.item, state);

		case DispatchCommands.UPDATE_WALLET:
			return {
				...state,
				currentUser: {
					...state.currentUser,
					cost: parseInt(state.currentUser.cost) + parseInt(action.amount),
				},
			};

		default:
			return state;
	}
}

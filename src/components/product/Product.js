import React from "react";
import "./product.css";

function Product({ name, cost, amountAvailable }) {
	function buy() {
		// setloader({ ...loader, depLoading: true });
		// asyncBuy(home)
		// 	.then((res) => {
		// 		console.log(res);
		// 		// updateWallet(home.deposit);
		// 	})
		// 	.catch((e) => {})
		// 	.finally(() => {
		// 		setloader({ ...loader, depLoading: false });
		// 	});
	}

	function deleteProduct() {
		// setloader({ ...loader, depLoading: true });
		// asyncBuy(home)
		// 	.then((res) => {
		// 		console.log(res);
		// 		// updateWallet(home.deposit);
		// 	})
		// 	.catch((e) => {})
		// 	.finally(() => {
		// 		setloader({ ...loader, depLoading: false });
		// 	});
	}

	return (
		<div className="product">
			<div id="product-name">{name}</div>
			<div id="product-name">{cost}</div>
			<div id="product-name">{amountAvailable} available</div>

			<div className="product-options">
				<button onClick={deleteProduct}>D</button>
				<button onClick={buy}>B</button>
			</div>
		</div>
	);
}

export default Product;

import React, { useState } from "react";
import { buyIcon, deleteIcon } from "../../assets/assets";
import { asyncBuy, asyncDeleteProduct } from "../../backend";
import "./product.css";

function Product({
	userRole,
	name,
	cost,
	amountAvailable,
	buy,
	deleteProduct,
}) {
	const [amountNeeded, setAmountNeeded] = useState("3");

	return (
		<div className="product">
			<div className="product-header">
				<div id="product-cost">¢{cost}</div>
				<div id="product-amtAv">stock: {amountAvailable}</div>
			</div>

			<div className="product-bottom">
				<div id="product-name">{name}</div>

				<div className="product-options">
					{userRole === "BUYER" ? (
						<>
							<input
								value={amountNeeded}
								className="product-item-input"
								onChange={(e) => setAmountNeeded(e.target.value)}
								placeholder="amt"
								type="number"
								min="1"
							/>

							<button onClick={buy}>
								<img src={buyIcon} />
							</button>
						</>
					) : (
						<button onClick={deleteProduct}>
							<img src={deleteIcon} />
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Product;

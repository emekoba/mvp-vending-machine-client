import React, { useState } from "react";
import { asyncCreateProduct, asyncUpdate } from "../../../backend";
import Loader from "../../../components/Loader";
import Product from "../../../components/product/Product";
import { connect } from "react-redux";
import "./productTab.css";
import { DispatchCommands } from "../../../globals";

function ProductTab({ productList, updateProductList }) {
	const [productScheme, setproductScheme] = useState({
		productList: [
			{
				amountAvailable: "23",
				cost: "32",
				productName: "wuyikl",
				productName: "wuyikl",
			},
		],
		form: {
			productName: "wuyikl",
			amountAvailable: "23",
			cost: "32",
		},
	});
	const [loader, setloader] = useState({
		createLoading: false,
	});

	async function update() {
		if (
			Object.keys(productScheme.form).filter(
				(e) => productScheme.form[e] === ""
			).length === 0
		) {
			setloader({ ...loader, createLoading: true });

			const resp = await asyncCreateProduct(productScheme.form);

			if (resp.success) {
				console.log(resp.data.newProduct);

				let newList = [resp.data.newProduct, ...productScheme.productList];
				setproductScheme({ ...productScheme, productList: newList });
				updateProductList(newList);
			} else {
				alert(resp.error);
			}
		} else {
			alert(`Fill All Fields To Contine`);
		}
		setloader({ ...loader, createLoading: false });
	}

	function updateField(e, field) {
		setproductScheme({
			...productScheme,
			form: { ...productScheme.form, [`${field}`]: e.target.value },
		});
	}

	// console.log(productList);
	return (
		<div className="product-tab">
			<div className="create-product">
				<div className="create-product-field">
					<div className="product-input-cntr">
						<input
							value={productScheme.form.productName}
							className="product-item-input"
							onChange={(e) => updateField(e, "productName")}
							placeholder="name"
						/>

						<input
							value={productScheme.form.cost}
							className="product-item-input t-cen"
							onChange={(e) => updateField(e, "cost")}
							placeholder="cost"
							type="number"
						/>

						<input
							value={productScheme.form.amountAvailable}
							className="product-item-input t-cen"
							onChange={(e) => updateField(e, "amountAvailable")}
							placeholder="amount available"
							type="number"
						/>

						<div className="product-row">
							<button className="home-btn" onClick={update}>
								{loader.createLoading ? <Loader /> : "Create"}
							</button>
						</div>
					</div>
				</div>

				<div className="create-product-field">
					{productScheme.productList.map((e) => (
						<Product name={e.productName} />
					))}
				</div>
			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		productList: state.productList,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		updateProductList: (productList) =>
			dispatch({
				type: DispatchCommands.UPDATE_PRODUCT_LIST,
				productList,
			}),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductTab);

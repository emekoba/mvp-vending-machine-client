import React, { useEffect, useState } from "react";
import {
	asyncBuy,
	asyncCreateProduct,
	asyncDeleteProduct,
	asyncGetAllProducts,
	asyncUpdate,
} from "../../../backend";
import Loader from "../../../components/Loader";
import Product from "../../../components/product/Product";
import { connect } from "react-redux";
import "./productTab.css";
import { DispatchCommands, generateId } from "../../../globals";

function ProductTab({ userRole, productList, updateProductList, debitWallet }) {
	const [productScheme, setproductScheme] = useState({
		productList,
		form: {
			productName: "wuyikl",
			amountAvailable: "23",
			cost: "32",
		},
	});

	useEffect(() => {
		async function fetchProduct() {
			const resp = await asyncGetAllProducts();

			// console.log(resp);

			if (resp.success) {
				console.log(resp.data.products);
				setproductScheme({ ...productScheme, productList: resp.data.products });
				updateProductList(resp.data.products);
			} else {
				alert("error fetching sellers products " + resp.error);
			}
		}

		fetchProduct();
	}, []);

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

	async function buy(id, amt, cost) {
		const resp = await asyncBuy({
			productId: id,
			amount: amt,
		});

		if (resp.success) {
			console.log(resp.data);
			debitWallet(cost);
		} else {
			alert(resp.error);
		}
	}

	async function deleteProduct(id) {
		const resp = await asyncDeleteProduct(id);

		if (resp.success) {
			let filtered = productList.filter((e) => e.id !== id);

			updateProductList(filtered);
			setproductScheme({ ...productScheme, productList: filtered });
		} else {
			alert(resp.error);
		}
	}

	return (
		<div
			className="product-tab"
			style={
				userRole === "SELLER"
					? {
							gridTemplateColumns: `20vw 1fr`,
					  }
					: {
							display: "block",
					  }
			}
		>
			{userRole === "SELLER" ? (
				<>
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
								min="1"
								type="number"
							/>

							<input
								value={productScheme.form.amountAvailable}
								className="product-item-input t-cen"
								onChange={(e) => updateField(e, "amountAvailable")}
								placeholder="amount available"
								min="1"
								type="number"
							/>

							<div className="product-row">
								<button className="home-btn" onClick={update}>
									{loader.createLoading ? <Loader /> : "Create"}
								</button>
							</div>
						</div>
					</div>

					{productScheme.productList.length === 0 ? (
						<div className="product-empty">Your Products Show Up Here</div>
					) : (
						<div
							className="create-product-field"
							style={{
								display: "grid",
								gridTemplateColumns: "1fr 1fr 1fr",
								gap: 20,
							}}
						>
							{productScheme.productList.map((e) => (
								<Product
									key={generateId()}
									userRole={userRole}
									name={e.productName}
									cost={e.cost}
									amountAvailable={e.amountAvailable}
									buy={() => buy(e.id, e.amountAvailable, e.cost)}
									deleteProduct={() => deleteProduct(e.id)}
								/>
							))}
						</div>
					)}
				</>
			) : (
				<>
					<div></div>
					{productScheme.productList.length === 0 ? (
						<div className="product-empty">
							Vending Machine Empty Please Try Again Later
						</div>
					) : (
						<div
							className="create-product-field"
							style={{
								display: "grid",
								gridTemplateColumns: "repeat(4, 1fr)",
								gap: 20,
							}}
						>
							{productScheme.productList.map((e) => (
								<Product
									key={generateId()}
									userRole={userRole}
									name={e.productName}
									cost={e.cost}
									amountAvailable={e.amountAvailable}
									buy={() => buy(e.id, e.amountAvailable)}
									delete={() => deleteProduct(e.id)}
								/>
							))}
						</div>
					)}
				</>
			)}
		</div>
	);
}

function mapStateToProps(state) {
	return {
		userRole: state.currentUser.role,
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

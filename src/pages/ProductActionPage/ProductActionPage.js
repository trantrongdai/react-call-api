import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { actAddProductRequest, actGetProductRequest, actUpdateProductRequest } from './../../actions/index';
import { connect } from 'react-redux';

class ProductActionPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			id: '',
			txtName: '',
			txtPrice: '',
			ckbStatus: ''
		}
	}

	componentDidMount() {
		var { match } = this.props;
		if (match) {
			this.props.getProduct(match.params.id);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps && nextProps.itemEditing) {
			var { itemEditing } = nextProps;
			this.setState({
				id: itemEditing.id,
				txtName: itemEditing.name,
				txtPrice: itemEditing.price,
				ckbStatus: itemEditing.status
			})
		}

	}


	onChange = (event) => {
		var target = event.target;
		var name = target.name;
		var value = target.type === 'checkbox' ? target.checked : target.value;
		this.setState({
			[name]: value
		})
	}

	onSave = (event) => {
		event.preventDefault();
		console.log("onSave");
		var { id, txtName, txtPrice, ckbStatus } = this.state;
		var { history } = this.props;
		var product = {
			id : id,
			name: txtName,
			price: txtPrice,
			status: ckbStatus
		}
		if (id === '') {
			this.props.addProduct(product);
			history.goBack();
		} else {
			this.props.onUpdateProduct(product);
			history.goBack();
		}

	}

	render() {
		var { txtName, txtPrice, ckbStatus } = this.state;
		return (
			<div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">

				<form onSubmit={this.onSave}>
					<div className="form-group">
						<label>Product Name</label>
						<input
							type="text"
							className="form-control"
							name="txtName"
							value={txtName}
							onChange={this.onChange}
						/>
					</div>
					<div className="form-group">
						<label>Price</label>
						<input
							type="text"
							className="form-control"
							name="txtPrice"
							value={txtPrice}
							onChange={this.onChange}
						/>
					</div>

					<div className="form-group">
						<label>Status</label>
					</div>
					<div className="checkbox">
						<label>
							<input
								type="checkbox"
								value={ckbStatus}
								name="ckbStatus"
								onChange={this.onChange}
								checked={ckbStatus}
							/>
							Available
						</label>
					</div>

					<Link
						to="/product-list"
						className="btn btn-default mr-10"
					>
						Back
					</Link>
					<button type="submit" className="btn btn-primary">Save</button>
				</form>

			</div>
		);
	}

}

const mapStateToProps = state => {
	return {
		itemEditing: state.itemEditing
	}

}

const mapDispatchToProps = (dispatch, props) => {
	return {
		addProduct: (product) => {
			dispatch(actAddProductRequest(product))
		},
		getProduct: (id) => {
			dispatch(actGetProductRequest(id))
		},
		onUpdateProduct: (product) => {
			dispatch(actUpdateProductRequest(product))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);

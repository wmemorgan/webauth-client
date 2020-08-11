import React, { Component } from "react";
import axios from "axios"; /** External API calls only **/
//import { connect } from 'react-redux' /** Redux only **/
//import { EventEmitter } from "../../utils/events";

import * as S from "../SharedComponents/FormStyles";
import Button from "../DesignComponents/Button";

//import {  } from '../../actions' /** Redux only **/
/**
 * User Signup Form
 */
class Form extends Component {
	state = {
		username: "",
		firstname: "",
		lastname: "",
		primaryemail: "",
		password: "",
		status: null,
		errorMesage: "",
	};

	/**
	 * Populate form entries to state
	 * @param {*} e
	 */
	handleInput = (e) => {
		this.setState({ [e.target.id]: e.target.value });
	};

	resetForm() {
		this.setState({
			username: "",
			firstname: "",
			lastname: "",
			primaryemail: "",
			password: "",
		});
	}

	addData = async (e) => {
		// prevent default
		e.preventDefault();

		// gather form data
		const newRecord = {
			username: this.state.username,
			firstname: this.state.firstname,
			lastname: this.state.lastname,
			primaryemail: this.state.primaryemail,
			password: this.state.password,
		};

		// send new record to api
		try {
			const endpoint = "/users/user";
			const data = await axios.post(endpoint, newRecord);
			console.log(`ADD USER: `, data);
			if (data.status === 201) {
				this.setState({ status: data.status });
				this.props.history.push("/login");
			}
		} catch (err) {
			console.error(err.response);
			this.setState({
				status: err.status,
				errorMessage: err.response.data.error,
			});
		}
		
		this.resetForm();

		// this.props.history.push("/users"); /** React-Router only **/
	};

	submitHandler = (e) => {
		e.preventDefault();
		if (this.props.update) {
			this.updateData(e);
		} else if (this.props.delete) {
			this.deleteData(e);
		} else {
			this.addData(e);
		}
	};

	componentDidMount() {
		if (this.props.update) {
			this.prePopulateForm(this.props.id);
		}
	}

	render() {
		return (
			<S.FormContainer {...this.props}>
				<div className="windowFrame"></div>
				<form onSubmit={this.submitHandler}>
					{(this.props.update || this.props.delete) && (
						<input
							name="id"
							type="number"
							placeholder="ID"
							onChange={this.handleInput}
							value={this.state.id}
						/>
					)}
					{!this.props.delete && (
						<main>
							<label htmlFor="username" />
							<input
								id="username"
								type="text"
								placeholder="Username"
								onChange={this.handleInput}
								value={this.state.username}
								required
							/>
							<label htmlFor="firstname" />
							<input
								id="firstname"
								type="text"
								placeholder="First Name"
								onChange={this.handleInput}
								value={this.state.firstname}
								required
							/>
							<label htmlFor="lastname" />
							<input
								id="lastname"
								type="text"
								placeholder="Last Name"
								onChange={this.handleInput}
								value={this.state.lastname}
								required
							/>
							<label htmlFor="primaryemail" />
							<input
								id="primaryemail"
								type="text"
								placeholder="Email"
								onChange={this.handleInput}
								value={this.state.primaryemail}
								required
							/>
							<label htmlFor="password" />
							<input
								id="password"
								type="password"
								placeholder="Password"
								onChange={this.handleInput}
								value={this.state.password}
								required
							/>
						</main>
					)}
					<Button type="submit" {...this.props}>
						Sign Up
					</Button>
				</form>
				{this.state.errorMessage !== null ? (
					<p>{this.state.errorMessage}</p>
				) : (
					""
				)}
			</S.FormContainer>
		);
	}
}

export default Form;

/** Redux only **/
// export default connect(null, {
//   addData: '',
//   updateData: '',
//   deleteData: ''
// })(Form)

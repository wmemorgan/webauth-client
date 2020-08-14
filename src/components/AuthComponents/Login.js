import React, { Component } from "react";
import axios from "axios"; /** External API calls only **/
//import { connect } from 'react-redux' /** Redux only **/
import * as S from "../SharedComponents/FormStyles";
import Button from "../DesignComponents/Button";

//import {  } from '../../actions' /** Redux only **/

/**
 * User Login form
 */
class Form extends Component {
	state = {
		id: "",
		username: "",
		password: "",
		status: null,
		errorMesage: null,
	};

	/**
	 * Populate form entries to state
	 * @param {*} e - the event being fired
	 */
	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	resetForm() {
		// reset form fields
		this.setState({
			username: "",
			password: "",
		});
	}

	redirectAfterLogin () {
		if (this.state.status === 200) {
			this.props.history.push("/");
		} else {
			console.log(`errorMessage: `, this.state.errorMessage);
		}
	}

	login = async () => {
		// send new record to api
		try {
			// gather form data
			const credentials = `grant_type=password&username=${this.state.username}&password=${this.state.password}`;
			const endpoint = "/login";
			const clientId = process.env.REACT_APP_OAUTHCLIENTID;
			const clientSecret = process.env.REACT_APP_OAUTHCLIENTSECRET;
			const headers = {
				headers: {
				// btoa is converting our client id/client secret into base64
				Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
				"Content-Type": "application/x-www-form-urlencoded",
				},
			};
			// send login data to auth API
			const data = await axios.post(endpoint, credentials, headers);
			console.log(`LOGIN SUCCESS `, data);
			localStorage.setItem("token", data.data.access_token);
			this.setState({
				status: data.status
			});
		} catch (err) {
			console.log(`LOGIN FAILURE `, err.response);
			console.error(err.response);
			this.setState({
				status: err.status,
				errorMessage: err.response.status === 400 ?
				"Invalid username or password" :
				err.response.data.error_description
			});
		}
		
		this.resetForm()
		this.redirectAfterLogin();
	};

	/**
	 * Auto login using demo account credentials
	 * @param {*} e - the event being fired
	 */
	demoLogin = (e) => {
		e.preventDefault();
		this.setState({
			username: "demo",
			password: "demo"
		}, () => this.login())
	}

	/**
	 * Form Handler
	 * @param {*} e - the event being fired
	 */
	submitHandler = (e) => {
		e.preventDefault();
		this.login();
	};

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
						<>
							<input
								name="username"
								type="text"
								placeholder="Username"
								onChange={this.handleInput}
								value={this.state.username}
								required
							/>
							<input
								name="password"
								type="password"
								placeholder="Password"
								onChange={this.handleInput}
								value={this.state.password}
								required
							/>
						</>
					)}
					<Button type="submit" {...this.props}>
						{`${this.props.add ? "Add" : ""} 
						${this.props.update ? "Update" : ""}  
						${this.props.delete ? "Delete" : ""}   
						Login`}
					</Button>
				</form>
				<Button onClick={this.demoLogin} update>
					Demo Login
				</Button>
				{this.state.errorMessage !== null ? <p>{this.state.errorMessage}</p> : ""}
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

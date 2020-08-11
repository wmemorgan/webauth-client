import React, { Component } from "react";
import axios from "axios"; /** External API calls only **/
//import { connect } from 'react-redux' /** Redux only **/
import { EventEmitter } from "../../utils/events";
import * as S from "../SharedComponents/FormStyles";
import Button from "../DesignComponents/Button";

//import {  } from '../../actions' /** Redux only **/

class Form extends Component {
	state = {
		id: "",
		username: "",
		password: "",
		status: null,
		greeting: "",
		errorMesage: null,
	};

	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	addData = async () => {
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
        status: data.status,
        greeting: data.data.message,
        errorMessage: "",
      });
    } catch (err) {
      console.log(`LOGIN FAILURE `, err.response);
      console.error(err.response);
      this.setState({
        status: err.status,
        errorMessage: err.response.status === 400 ?
          err.response.data.error :
          err.response.data.detail,
      });
    }

		// reset form fields
		this.setState({
			username: "",
			password: "",
    });
    
    if (this.state.status === 200) {
      EventEmitter.dispatch("getData");
      this.props.history.push("/users");
    } else {
      console.log(`errorMessage: `, this.state.errorMessage);
    }

	};

	// pre-populate form with existing data
	prePopulateForm = () => {};

	submitHandler = (e) => {
		e.preventDefault();
		this.addData();
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
              Login
            `}
					</Button>
				</form>
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

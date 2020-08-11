import React, { Component } from 'react';
import axios from 'axios'
import { EventEmitter } from '../../utils/events'

import * as S from './UserStyles'
import Button from '../DesignComponents/Button'

/**
 * User Component used for displaying, updating, 
 * and deleting individual user record
 */
class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
			id: null,
			username: "",
			firstname: "",
			lastname: "",
			primaryemail: "",
			roles: "",
			status: null,
			errorMesage: "",
		};
	}

	/**
	 * Populate local state from passed down props
	 */
	prePopulateForm = () => {
		const {
			username,
			firstname,
			lastname,
			primaryemail,
			roles,
			userid,
		} = this.props.user;
		this.setState(
			{
				id: userid,
				username,
				firstname,
				lastname,
				primaryemail,
				roles,
			},
			() => this.verifyAdmin()
		);
	};

	/**
	 * Populate form entries to state
	 * @param {*} e
	 */
	handleInput = (e) => {
		this.setState({ [e.target.name]: e.target.value });
  };
  
  resetForm() {
    this.setState({
      username: "",
      firstname: "",
      lastname: "",
      primaryemail: "",
    });
  }

	toggleEdit() {
    this.setState(
      (prevState) => ({ edit: !prevState.edit }),
      () => this.getUser()
		);
	}

  /**
   * Get profile information of authenticated user
   */
  getUser = async () => {
    let endpoint;
    try {
      // Retrieve user info (ADMIN access)
      if (this.state.id && localStorage.getItem("isAdmin")) {
        endpoint = `/users/user/${this.state.id}`
      } else {
        // Retrieve user profile
        endpoint = `/users/user/profile`;
      }

			const data = await axios.get(endpoint);
			console.log(`GET USER DATA `, data);
			// Populate locale state
			const {
				username,
				firstname,
				lastname,
				primaryemail,
				roles,
				userid,
			} = data.data;

			this.setState(
				{
					id: userid,
					username,
					firstname,
					lastname,
					primaryemail,
					roles,
				},
				() => this.verifyAdmin()
			);
		} catch (err) {
			console.error(err.response);
			this.setState({
				status: err.status,
				errorMessage: err.response.data.error,
			});
		}
	};

	updateUser = async () => {
		// gather updated data
		const updatedData = {
			username: this.state.username,
			firstname: this.state.firstname,
			lastname: this.state.lastname,
			primaryemail: this.state.primaryemail,
			roles: this.state.roles,
		};

		try {
			console.log(`USER ID: `, this.props.user);
			const endpoint = "/users/user";
			const data = await axios.patch(
				`${endpoint}/${this.state.id}`,
				updatedData
			);
			if (data) {
				this.toggleEdit();
        this.getUser();
			}
		} catch (err) {
			console.error(err.response);
			this.setState({
				status: err.status,
				errorMessage: err.response.data.error,
			});
		}

		console.log(`Form submitted data sent: ${JSON.stringify(updatedData)}`);
	};

	deleteUser = async (id) => {
		try {
			const endpoint = "/users/user";
			const data = await axios.delete(`${endpoint}/${id}`);
			if (data) {
				console.log(`${this.state.username} successfully deleted`);
        // reset form fields
        this.resetForm();
				this.props.history.push("/");
			}
		} catch (err) {
			console.error(err.response);
			this.setState({
				status: err.status,
				errorMessage: err.response.data.error,
			});
		}
	};

  /**
   * Verify authenticated user has ADMIN rights
   * Retrieve all API user data if current user has access
   */
	verifyAdmin = () => {
		console.log(`this.state.roles, `, this.state.roles);
		if (
			this.state.roles.length > 0 &&
			this.state.roles.find((role) => role.role.name.toUpperCase() === "ADMIN")
		) {
			localStorage.setItem("isAdmin", true);
			EventEmitter.dispatch("getData");
		}

		EventEmitter.dispatch("updateMenu");
	};

	componentDidMount() {
		if (this.props.user) {
			this.prePopulateForm();
		} else {
			this.getUser();
		}
	}

	render() {
		const {
			userid,
			username,
			firstname,
			lastname,
			primaryemail,
			roles,
		} = this.state;
		return (
			<>
				<S.UserInfoContainer>
					<header>
						<i className="far fa-edit" onClick={() => this.toggleEdit()}></i>
						<i
							className="fa fa-trash"
							onClick={() => this.deleteUser(userid)}
						></i>
					</header>
					<div className="user-info">
						{!this.state.edit ? (
							<h3 className="stat-data">{username}</h3>
						) : (
							<input
								name="username"
								type="text"
								placeholder="Username"
								onChange={this.handleInput}
								value={this.state.username}
							/>
						)}
						<div className="user-stats">
							<div className="stat-category">First Name:</div>
							{!this.state.edit ? (
								<div className="stat-data">{firstname}</div>
							) : (
								<input
									name="firstname"
									type="text"
									placeholder="firstname"
									onChange={this.handleInput}
									value={this.state.firstname}
								/>
							)}
						</div>
						<div className="user-stats">
							<div className="stat-category">Last Name:</div>
							{!this.state.edit ? (
								<div className="stat-data">{lastname}</div>
							) : (
								<input
									name="lastname"
									type="text"
									placeholder="Department"
									onChange={this.handleInput}
									value={this.state.lastname}
								/>
							)}
						</div>
						<div className="user-stats">
							<div className="stat-category">Email:</div>
							{!this.state.edit ? (
								<div className="stat-data">{primaryemail}</div>
							) : (
								<input
									name="primaryemail"
									type="text"
									placeholder="Department"
									onChange={this.handleInput}
									value={this.state.primaryemail}
								/>
							)}
						</div>
						<div className="user-stats">
							<div className="stat-category">Roles:</div>
							<div className="list-stats">
								{roles.length > 0 &&
									roles.map((role) => (
										<div className="list-item" key={role.role.roleid}>
											{role.role.name}
										</div>
									))}
							</div>
						</div>
						<S.ButtonMenu {...this.state} onClick={() => this.updateUser()}>
							<Button update>Update</Button>
						</S.ButtonMenu>
					</div>
					{this.state.errorMessage !== null ? (
						<p>{this.state.errorMessage}</p>
					) : (
						""
					)}
				</S.UserInfoContainer>
			</>
		);
	}
}

export default User;


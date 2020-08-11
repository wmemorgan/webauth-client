import React, { Component } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import { EventEmitter } from "./utils/events";

import Login from "./components/AuthComponents/Login";
import Signup from "./components/AuthComponents/Signup";
import ProtectedRoute from "./components/AuthComponents/ProtectedRoute";
import UserList from "./components/UserComponents/UserList";
import User from "./components/UserComponents/User";

/**
 * Define all application routes
 */
class Routes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: null,
			userList: [],
			errorMessage: "",
		};
		EventEmitter.subscribe("getData", (event) => this.getDataHandler(event));
	}

	/**
	 * Retrieve all users from API
	 */
	getData = async () => {
		try {
			const endpoint = "/users/users";
			const data = await axios.get(endpoint);
			console.log(`GETDATA: `, data);
			this.setState(
				{
					status: data.status,
					userList: data.data,
				},
				() => console.log(this.state.status)
			);
		} catch (err) {
			console.error(err.response);
			this.setState({
				status: err.status,
				errorMessage: err.response.data.error_description,
			});
		}
	};

	getDataHandler = () => {
		const token = localStorage.getItem("token");
		console.log(`Is there a token: `, token);
		if (token) {
			this.getData();
		}
	};

	componentDidMount() {
		console.log(`CDM: `, this.state.userList);
		if (this.state.userList.length === 0) {
			this.getDataHandler();
		}
	}

	render() {
		return (
			<>
				<Route
					exact
					path="/"
					render={() =>
						localStorage.getItem("token") ? (
							<Redirect to={{ pathname: "/profile", state: { ...this.state } }} />
						) : (
							<Redirect to="/login" />
						)
					}
				/>
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<ProtectedRoute path="/profile" component={User} />
				<Route
					exact
					path="/users"
					render={(props) => <UserList {...props} {...this.state} />}
				/>
				{this.state.userList.map((user) => (
					<Route
						key={user.userid}
						path={`/users/${user.userid}`}
						render={(props) => <User {...props} {...this.state} user={user} />}
					/>
				))}
			</>
		);
	}
}

export default withRouter(Routes);

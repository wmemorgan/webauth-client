import React from "react";
import axios from "axios";

// Pass authentication token to API call
axios.interceptors.request.use(
	function (requestConfig) {
		if (localStorage.getItem("token")) {
			requestConfig.headers.authorization = `Bearer ${localStorage.getItem(
				"token"
			)}`;
		}
		return requestConfig;
	},
	function (error) {
		return Promise.reject(error);
	}
);

// Display component if user has been authenticated
const Authenticated = (Component) => {
	return class extends React.Component {
		render() {
			const token = localStorage.getItem("token");
			return (
				<>
					{token ? (
						<Component {...this.props} />
					) : (
						<h1>Please login to access page.</h1>
					)}
				</>
			);
		}
	};
};

export default Authenticated;

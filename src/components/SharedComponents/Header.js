import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { EventEmitter } from "../../utils/events";

import * as S from "./HeaderStyles";
import MobileMenuIcon from "../DesignComponents/MobileMenuIcon";
import CloseIconMobile from "../DesignComponents/CloseIconMobile";

/**
 * Application header and navigation menu
 */
class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			isAuthenticated: false,
			isAdmin: false,
		};
		EventEmitter.subscribe("updateMenu", (event) => this.updateMenu(event));
	}

	logout = () => {
		localStorage.clear();
		this.setState(
			{
				isAuthenticated: false,
				isAdmin: false,
			},
			() => this.props.history.push("/login")
		);
	};

	/**
	 * Open and close specific navigation elements
	 */
	toggleDisplay = () => {
		this.setState((prevState) => ({
			show: !prevState.show,
		}));
	};

	/**
	 * Update navigation menu based on auth
	 */
	updateMenu = () => {
		if (localStorage.getItem("token")) {
			this.setState({ isAuthenticated: true });
		}

		if (localStorage.getItem("isAdmin")) {
			this.setState({ isAdmin: localStorage.getItem("isAdmin") });
		}
	};

	render() {
		return (
			<S.HeaderContainer>
				<MobileMenuIcon {...this.state} onClick={this.toggleDisplay}>
					<i className="fas fa-bars"></i>
				</MobileMenuIcon>
				<CloseIconMobile {...this.state} onClick={this.toggleDisplay}>
					<i className="fa fa-times" aria-hidden="true"></i>
				</CloseIconMobile>
				<S.Nav {...this.state}>
					<NavLink exact to="/" onClick={this.toggleDisplay}>
						Home
					</NavLink>
					<S.CrudNav>
						{this.state.isAuthenticated === false ? (
							<>
								<NavLink to="/login" onClick={this.toggleDisplay}>
									Login
								</NavLink>
								<NavLink to="/signup" onClick={this.toggleDisplay}>
									Sign Up
								</NavLink>
							</>
						) : (
							<>
								{this.state.isAdmin && (
									<NavLink to="/users" onClick={this.toggleDisplay}>
										Users
									</NavLink>
								)}
								<div className="logout" onClick={this.logout}>
									Logout
								</div>
							</>
						)}
					</S.CrudNav>
				</S.Nav>
			</S.HeaderContainer>
		);
	}
}

export default withRouter(Header);

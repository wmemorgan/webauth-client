import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

import * as S from "./HeaderStyles";
import MobileMenuIcon from "../DesignComponents/MobileMenuIcon";
import CloseIconMobile from "../DesignComponents/CloseIconMobile";

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = { show: false };
	}

	logout = () => {
		localStorage.clear();
		this.props.history.push("/login");
	};

	// Open and close specific navigation elements
	toggleDisplay = () => {
		this.setState((prevState) => ({
			show: !prevState.show,
		}));
	};

	render() {
		const token = localStorage.getItem("token");

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
						{!token ? (
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
								<NavLink to="/users" onClick={this.toggleDisplay}>
									Users
								</NavLink>
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

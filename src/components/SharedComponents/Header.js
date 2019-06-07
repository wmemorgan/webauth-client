import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import { HeaderContainer, Nav } from './HeaderStyles'
import MobileMenuIcon from '../DesignComponents/MobileMenuIcon'
import CloseIconMobile from '../DesignComponents/CloseIconMobile'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = { show: false }
  }

  // Open and close specific navigation elements
  toggleDisplay = () => {
    this.setState(prevState => (
      {
        show: !prevState.show
      }
    ))
  }

  render() {
    return (
      <HeaderContainer>
        <MobileMenuIcon
          {...this.state}
          onClick={this.toggleDisplay}
        >
          <i className="fas fa-bars"></i>
        </MobileMenuIcon>
        <CloseIconMobile
          {...this.state}
          onClick={this.toggleDisplay}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </CloseIconMobile>
        <Nav {...this.state}>
          <NavLink exact to='/' onClick={this.toggleDisplay}>
            Home
        </NavLink>
        <NavLink to='/add' onClick={this.toggleDisplay}>
          Add Smurf
        </NavLink>
        </Nav>
      </HeaderContainer>
    )
  }
}

export default Header
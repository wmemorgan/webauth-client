import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'

import * as S from './HeaderStyles'
import MobileMenuIcon from '../DesignComponents/MobileMenuIcon'
import CloseIconMobile from '../DesignComponents/CloseIconMobile'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = { show: false }
  }

  logout = () => {
    localStorage.removeItem('jwt')
    this.props.history.push('/signin')
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
    const token = localStorage.getItem('jwt')

    return (
      <S.HeaderContainer>
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
        <S.Nav {...this.state}>
          <NavLink exact to='/' onClick={this.toggleDisplay}>
            Home
        </NavLink>
        <S.CrudNav>
          {!token ?
            <NavLink to='/signin' onClick={this.toggleDisplay}>
              Sign In
            </NavLink> :
            <div className="logout" onClick={this.logout}>Log Out</div>
          }
          <NavLink to='/signup' onClick={this.toggleDisplay}>
            Sign Up
          </NavLink>
        </S.CrudNav>
        </S.Nav>
      </S.HeaderContainer>
    )
  }
}

export default withRouter(Header)
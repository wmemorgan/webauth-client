import React from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'

import requiresAuth from '../AuthComponents/requiresAuth'

import * as S from './UserStyles'

const UserList = props => {
  return (
    <S.UserListContainer>
      <h2>User List</h2>
      {props.errorMessage ? props.errorMessage :
        (props.userList.length > 0 ? (props.userList.map(user => (
          <Link key={user.id} to={`/users/${user.id}`}>
            <S.Preview>
              <div>
                {user.username}
              </div>
              <div>
                id: {user.id}
              </div>
            </S.Preview>
          </Link>))) : (
          <S.SpinnerContainer>
            <h2>Loading...</h2>
            <Loader type="Puff" color='#265077' height='60' width='60' />
          </S.SpinnerContainer>
        ))
      }
    </S.UserListContainer>
  )
}

export default requiresAuth(UserList)
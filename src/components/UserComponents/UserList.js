import React from 'react'
// import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import * as S from './UserStyles'


const UserList = props => {
  console.log(`UserList props: `, props)
  return (
    <S.UserListContainer>
      <h2>User List</h2>
      {props.status === 200 ?
        (props.userList.length > 0 ? (props.userList.map(user => (
          <S.Preview key={user.id}>
            <div>
              {user.username}
            </div>
            <div>
              id: {user.id}
            </div>
          </S.Preview>))) : (
          <S.SpinnerContainer>
            <h2>Loading...</h2>
            <Loader type="Puff" color='#265077' height='60' width='60' />
          </S.SpinnerContainer>
          )) :
        <div>{props.errorMessage}</div>
      }
    </S.UserListContainer>
  )
}

export default UserList
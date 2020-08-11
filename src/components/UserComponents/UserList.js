import React from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'

import requiresAuth from '../AuthComponents/requiresAuth'

import * as S from './UserStyles'
/**
 * Component used to display all the users in the API
 * and to populate dynamic routes based on individual user info
 * 
 * @param {C} props 
 */
const UserList = props => {
  console.log(`USERLIST: `, props);
  return (
		<S.UserListContainer>
			<h2>User List</h2>
			{props.status !== 200 ? (
				<h3>{props.errorMessage}</h3>
			) : props.userList.length > 0 ? (
				props.userList.map((user) => (
					<Link key={user.userid} to={`/users/${user.userid}`}>
						<S.Preview>
							<div>{user.username}</div>
							<div>id: {user.userid}</div>
						</S.Preview>
					</Link>
				))
			) : (
				<S.SpinnerContainer>
					<h2>Loading...</h2>
					<Loader type="Puff" color="#265077" height="60" width="60" />
				</S.SpinnerContainer>
			)}
		</S.UserListContainer>
	);
}

export default requiresAuth(UserList)
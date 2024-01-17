import React from 'react'
import * as constants from '../generalHelpers/constants'
import styled from 'styled-components'
import Spinner from 'react-bootstrap/Spinner'

const LoadingContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`

export const Loading = ({style, className}) => {
	return (
		<LoadingContainer style={style} className={className}>
			<Spinner variant='primary' animation='border'/>
		</LoadingContainer>
	)
}

export const ProfilePhotoLoading = styled(Loading)`
  width: ${constants.profilePhotoDiameter};
  height: ${constants.profilePhotoDiameter};
  padding: ${props => props.padding ?? 0};
  border-radius: 50%;
`

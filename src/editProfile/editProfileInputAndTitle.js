import React from 'react'
import styled from 'styled-components'
import * as constants from '../generalHelpers/constants'

export const Subtitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: 0.2px;
`

export const EditProfileInput = styled.input`
  width: calc(100vw);
  height: 50px;
  border: none;
  outline: none;
  font-weight: normal;
  font-size: 16px;
  letter-spacing: 0.2px;
  color: rgba(0, 0, 0, 0.55);
  padding: 0 0 0 20px;
  background-color: ${props => props.warning ? constants.editProfileInputWarning : 'white'};

  &:focus {
    background-color: #FDFFD8;
  }
`

export function EditProfileInputAndTitle({handleChange, value, title, validValue}) {
	return (
		<div>
			<Subtitle style={{marginLeft: '20px', marginBottom: '10px', alignSelf: 'flex-start'}}>
				{title}
			</Subtitle>
			<EditProfileInput
				style={{marginBottom: '20px'}} value={value} warning={!validValue} onChange={handleChange}/>
		</div>
	)
}
import React from 'react'
import {Column} from '../generalComponents/containers'
import {EditProfileInputContainer} from './editPhoneNumberInput'
import styled from 'styled-components'
import {gentleBlackColor} from '../generalHelpers/generalStyles'
import {Subtitle} from './editProfileInputAndTitle'
import Spinner from 'react-bootstrap/Spinner'


const ButtonText = styled.p`
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.2px;
  ${gentleBlackColor};
  // Need it because bootstrap add default margin bottom for p elements for some reason.
  margin-bottom: 0;
`

export const EditProfileButton = ({handleClick, Icon, text, style, loading}) => {
	return (
		<Column style={style}>
			<Subtitle style={{marginLeft: '20px', marginBottom: '10px'}}>
				{text}
			</Subtitle>
			<EditProfileInputContainer onClick={loading ? null : handleClick}>
				<Icon style={{marginLeft: '20px', marginRight: '20px'}}/>
				<ButtonText>
					{text}
				</ButtonText>
				{loading ? <Spinner
					style={{marginLeft: '20px'}}
					as="span" animation="border" size="sm" role="status"
				/> : null}
			</EditProfileInputContainer>
		</Column>
	)
}
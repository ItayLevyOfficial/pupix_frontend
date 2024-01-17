import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {Column} from '../generalComponents/containers'
import {getCountryCallingCode, parsePhoneNumber} from 'libphonenumber-js'
import ReactFlagsSelect from 'react-flags-select'
import {EditProfileInput, Subtitle} from './editProfileInputAndTitle'
import * as constants from '../generalHelpers/constants'
import {isValidPhoneNumber, onlyDigits} from './formValidation'

export const EditProfileInputContainer = styled.div`
  width: 100vw;
  height: 50px;
  background-color: ${props => props.warning ? constants.editProfileInputWarning : 'white'};
  display: flex;
  align-items: center;

  &:focus-within {
    background-color: #FDFFD8;
  }
`

const StyledReactFlagsSelect = styled(ReactFlagsSelect)`
  & > ul {
    width: 200px;
  }

  & > button {
    border: none;
  }
`

/**
 * @param phoneNumber str: The phone number, in format '972544677134'
 * @return {string}: The country code that's appropriate to the given phone number.
 */
const getPhoneNumberCountry = (phoneNumber) => {
	try {
		return parsePhoneNumber('+' + phoneNumber).country
	} catch (error) {
		return ''
	}
}

/**
 * The edit profile phone number input field.
 *
 * @param phoneNumber: The current phone number
 * @param handleChange newPhoneNumber => {}: Handles a legal change to the phone number.
 * @param style Object: Styles to add to the input container.
 * @return {JSX.Element}: The rendered component.
 */
export const EditPhoneNumberInput = ({phoneNumber, handleChange = () => {}, style}) => {
	const [countryPhoneCode, setCountryPhoneCode] = useState('')
	const [selected, setSelected] = useState('')
	
	/**
	 * Sets the first country code when user phone number is loaded.
	 */
	useEffect(() => {
		if (phoneNumber && !selected) {
			setSelected(getPhoneNumberCountry(phoneNumber))
			try {
				setCountryPhoneCode(parsePhoneNumber('+' + phoneNumber).countryCallingCode)
			} catch (error) {}
		}
	}, [phoneNumber, selected])
	
	return (
		<Column style={style}>
			<Subtitle style={{marginLeft: '20px', marginBottom: '10px'}}>
				Phone Number
			</Subtitle>
			<EditProfileInputContainer warning={!isValidPhoneNumber(phoneNumber)}>
				<StyledReactFlagsSelect
					showSelectedLabel={false}
					fullWidth
					selected={selected}
					
					onSelect={countryAlphaCode => {
						setSelected(countryAlphaCode)
						const newCountryCallingCode = getCountryCallingCode(countryAlphaCode)
						const newPhoneNumber = phoneNumber.replace(countryPhoneCode, newCountryCallingCode)
						handleChange(newPhoneNumber)
						setCountryPhoneCode(newCountryCallingCode)
					}}
					searchable={true}
				/>
				<EditProfileInput warning={!isValidPhoneNumber(phoneNumber)}
				                  style={{width: 'calc(100vw - 100px)', paddingLeft: '0'}}
				                  value={`+${phoneNumber}`}
				                  onChange={event => {
					                  const newPhoneNumber = event.target.value.replace('+', '')
					                  if (onlyDigits(newPhoneNumber) && newPhoneNumber.includes(countryPhoneCode)) {
						                  handleChange(newPhoneNumber)
					                  }
				                  }}
				/>
			</EditProfileInputContainer>
		</Column>
	)
}
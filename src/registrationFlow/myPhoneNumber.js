import React from 'react'
import PhoneInput from 'react-phone-input-2'
import {FullWidthCenteredColumn} from '../generalComponents/containers'
import {isValidPhoneNumber} from '../editProfile/formValidation'
import {SmallExplanationText} from '../generalHelpers/fonts'
import {RegistrationTitle} from './neverMissCalls'
import styled from 'styled-components'
import {NextButton} from '../newCheckoutFlow/videoCallLength'

const PositionedSmallExplanationText = styled(SmallExplanationText)`
  align-self: flex-start;
`

export function MyPhoneNumber({phoneNumber, handleInputChange, handleContinueClick}) {
	return (
		<FullWidthCenteredColumn>
			<RegistrationTitle style={{margin: '45px 20px 100px 40px'}}>
				My phone number is
			</RegistrationTitle>
			<PhoneInput
				country={'us'} onChange={(value, country) => {
				handleInputChange(value, country.countryCode.toUpperCase())
			}}
				value={phoneNumber} enableSearch={true}
				inputStyle={{width: 'calc(100vw - 80px)', height: '50px'}}
				containerStyle={{width: 'calc(100vw - 80px)', alignSelf: 'center', marginBottom: '10px'}}/>
			<PositionedSmallExplanationText style={{margin: '0 40px 50px'}}>
				Your phone number will remain private.
			</PositionedSmallExplanationText>
			<NextButton disabled={!isValidPhoneNumber(phoneNumber)} onClick={handleContinueClick}>
				Next
			</NextButton>
		</FullWidthCenteredColumn>
	)
}
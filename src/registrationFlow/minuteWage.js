import React from 'react'
import {FullWidthCenteredColumn} from '../generalComponents/containers'
import styled from 'styled-components'
import {gentleBlackColor, withoutBorderAndOutline} from '../generalHelpers/generalStyles'
import {CenteredSmallExplanationText} from '../generalHelpers/fonts'
import {RegistrationTitle} from './neverMissCalls'
import {NextButton} from '../newCheckoutFlow/videoCallLength'
import {SizedBox} from '../videoRoom/sendTipFlow/tipCreatorModalComponents'

const MinuteWageInput = styled.input`
  ${withoutBorderAndOutline};
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: var(--new-main-color);
  border-radius: 0;
  ${gentleBlackColor};
  align-self: center;
  font-size: 26px;
  width: 90px;
  padding-left: 10px;
  padding-bottom: 5px;
`

export const PaddedRegistrationTitle = styled(RegistrationTitle)`
  margin: 45px 40px var(--registration-title-bottom-margin);
`

export function MinuteWage({minuteWage = '', handleInputChange, handleContinueClick}) {
	return (
		<FullWidthCenteredColumn>
			<PaddedRegistrationTitle style={{'--registration-title-bottom-margin': '100px'}}>
				My minute wage is
			</PaddedRegistrationTitle>
			<MinuteWageInput value={`$ ${minuteWage}`} type={'tel'}
			                 onChange={(event) => handleInputChange(event?.target?.value)}/>
			<SizedBox height={15}/>
			<CenteredSmallExplanationText style={{margin: '0 20px 50px'}}>
				We will only charge a 10% fee of your income.
			</CenteredSmallExplanationText>
			<NextButton onClick={handleContinueClick} disabled={!minuteWage || !parseInt(minuteWage)}
			            style={{marginBottom: '0'}}>
				Next
			</NextButton>
		</FullWidthCenteredColumn>
	)
}
import React from 'react'
import IosMessageIcon from '../icons/iosMessageIcon.svg'
import {FullDisplayCenteredColumn} from '../generalComponents/containers'
import styled from 'styled-components'
import {NextButton} from '../newCheckoutFlow/videoCallLength'
import {SizedBox} from '../videoRoom/sendTipFlow/tipCreatorModalComponents'
import {gentleBlackColor} from '../generalHelpers/generalStyles'

export const BigTitle = styled.h1`
  font-size: 30px;
  letter-spacing: 0.2px;
  font-weight: normal;
  ${gentleBlackColor};
`

export const RegistrationTitle = styled(BigTitle)`
  align-self: flex-start;
`
export const CenteredRegistrationTitle = styled(RegistrationTitle)`
  text-align: center;
`

export const SmallCenteredParagraph = styled.p`
  text-align: center;
  letter-spacing: 0.3px;
  line-height: 27px;
  font-size: 17px;
  color: rgba(0, 0, 0, 0.6);
`

export function NeverMissCalls({handleContinueClick}) {
	return (
		<FullDisplayCenteredColumn>
			<CenteredRegistrationTitle style={{margin: '35px 0 20px', alignSelf: 'center'}}>
				Never Miss Calls
			</CenteredRegistrationTitle>
			<SmallCenteredParagraph style={{margin: '0 30px 30px', textAlign: 'center'}}>
				We will send an SMS to notify you of incoming calls. You have two minutes to accept a call before the
				client gets refunded.
			</SmallCenteredParagraph>
			<IosMessageIcon style={{width: 'min(calc(100vw - 120px), 400px)'}}/>
			<SizedBox height={60}/>
			<NextButton onClick={handleContinueClick}>
				Next
			</NextButton>
			<SizedBox height={30}/>
		</FullDisplayCenteredColumn>
	)
}
import React from 'react'
import {NextButton} from './videoCallLength'
import styled from 'styled-components'
import NewLockIcon from '../icons/newLockIcon.svg'
import {AWithUnderLine} from '../generalComponents/linkWithUnderline'
import {SmallExplanationText} from '../generalHelpers/fonts'
import {AlignedCenteredRow} from '../generalComponents/containers'
import {SizedBox} from '../videoRoom/sendTipFlow/tipCreatorModalComponents'
import {CheckoutFlowSmallTitle, PaddedFullWidthColumn} from './checkoutScreen/checkoutScreenHelpers'

export const AnonymousLoginParagraph = styled(SmallExplanationText)`
  line-height: 30px;
  letter-spacing: 0.3px;
`

export const BoldAWithUnderLine = styled(AWithUnderLine)`
  font-weight: bold;
`

const cookiesExplanationLink = 'https://www.kaspersky.com/resource-center/definitions/cookies'

export const SecureLoginPage = ({handleContinueClick}) => {
	return (
		<PaddedFullWidthColumn padding='30px'>
			<SizedBox height={30}/>
			<AlignedCenteredRow>
				<NewLockIcon/>
				<SizedBox width={15}/>
				<CheckoutFlowSmallTitle>
					Secure Login
				</CheckoutFlowSmallTitle>
			</AlignedCenteredRow>
			<SizedBox height={23}/>
			<AnonymousLoginParagraph>
				Pupix uses an anonymous login, and you are automatically signed in as a guest,
				using <BoldAWithUnderLine href={cookiesExplanationLink}>cookies</BoldAWithUnderLine>. The
				video chat is fully encrypted, and we do not store your credit card. Visit our <BoldAWithUnderLine
				href='/privacy-policy'>Privacy Policy</BoldAWithUnderLine> to
				learn more.
			</AnonymousLoginParagraph>
			<SizedBox height={53}/>
			<NextButton onClick={handleContinueClick}>
				Next
			</NextButton>
		</PaddedFullWidthColumn>
	)
}
import React from 'react'
import {CenteredContainer, FullWidthCenteredColumn} from '../generalComponents/containers'
import StripeIcon from '../icons/stripeIcon.svg'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import {gentleBlackColor} from '../generalHelpers/generalStyles'
import Spinner from 'react-bootstrap/Spinner'
import {NextButton} from '../newCheckoutFlow/videoCallLength'
import {SizedBox} from '../videoRoom/sendTipFlow/tipCreatorModalComponents'

export const Paragraph = styled.p`
  font-size: 18px;
  letter-spacing: 0.3px;
  line-height: 28px;
  ${gentleBlackColor}
`

export const HorizontalPaddedParagraph = styled(Paragraph)`
  margin: 0 40px 0;
`

const StripePurpleRectangle = styled(CenteredContainer)`
  width: min(calc(100vw - 80px), 400px);
  height: 100px;
  border-radius: 15px;
  background-color: #9F64FF;
`

export const BootstrapActionButton = styled(Button)`
  min-width: 275px;
  width: calc(100vw - 60px);
  max-width: 400px;
  align-self: center;
`

export const PaddedBootstrapActionButton = styled(BootstrapActionButton)`
  margin-top: auto;
  margin-bottom: 30px;
`

/**
 * A bootstrap action button with loading logic. You can decide if you want the button to have spinner next to the
 * loading text or not, but you must provide loading text for this button.
 *
 * @param loading: True if the component is currently in loading state, false otherwise.
 * @param loadingText: Required. The button text when loading.
 * @param withSpinner: True if you want a spinner next to the loading text, false otherwise.
 * @param disabled: True if the button is disabled, false otherwise.
 * @param props: This component passes all the rest of the props (like onClick etc) to the button.
 *
 * @return {JSX.Element}: The button.
 */
export const ButtonWithLoading = ({loading, loadingText, withSpinner = true, disabled, children, ...props}) => {
	return (
		<PaddedBootstrapActionButton block size='lg' variant='primary' disabled={loading || disabled} {...props}>
			{loading ?
				<CenteredContainer>
					{withSpinner ? <Spinner
						as="span" animation="border" size="sm" role="status" aria-hidden="true"
						style={{marginRight: '15px'}}/> : null}
					{loadingText ?? children}
				</CenteredContainer> : children
			}
		</PaddedBootstrapActionButton>
	)
}

export const StripeExplanationScreen = ({handleContinueClick, loading}) => {
	return (
		<FullWidthCenteredColumn>
			<StripePurpleRectangle style={{margin: '45px 0 40px'}}>
				<StripeIcon/>
			</StripePurpleRectangle>
			<HorizontalPaddedParagraph style={{marginBottom: '20px'}}>
				Pupix uses Stripe to get you paid quickly and keep your personal and payment information secure.
				Thousands of companies around the world trust Stripe to process payments for their users. Set up
				a
				Stripe account to get paid with Pupix.
			</HorizontalPaddedParagraph>
			<SizedBox height={60}/>
			<NextButton onClick={handleContinueClick} loading={loading}>
				Save & Continue
			</NextButton>
		</FullWidthCenteredColumn>
	)
}
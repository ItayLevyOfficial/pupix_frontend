import React, {useState} from 'react'
import {SizedBox} from '../../videoRoom/sendTipFlow/tipCreatorModalComponents'
import {calculateStripeFee, CheckoutScreenSmallTitle, ErrorText, TermsParagraph} from './checkoutScreenHelpers'
import {CardElement} from '@stripe/react-stripe-js'
import StripeBadge from '../../icons/stripeBadge.svg'
import {BoldAWithUnderLine} from '../secureLoginPage'
import {NextButton} from '../videoCallLength'
import styled from 'styled-components'

export const CreditCardContainer = styled.div`
  display: flex;
  align-items: center;
  border: var(--new-main-color) 1px solid;
  border-radius: 10px;
  width: calc(100vw - 60px);
  padding: 15px 10px;

  & > div {
    width: 100%;
  }
`

export const TermsSection = ({callPrice}) => (
	<>
		<TermsParagraph>
			By clicking pay, you agree with our <BoldAWithUnderLine
			href='/terms'>terms</BoldAWithUnderLine>.
		</TermsParagraph>
		<SizedBox height={10}/>
		<TermsParagraph>
			*process fee: ${calculateStripeFee(callPrice)}
		</TermsParagraph>
	</>
)

export const CreditCardBody = ({callPrice, handleSubmitPayment, loading, error}) => {
	const [isValidPaymentInfo, setIsValidPaymentInfo] = useState(false)
	
	const handleCreditCardChange = event => {
		if (event.complete) {
			setIsValidPaymentInfo(true)
		} else {
			setIsValidPaymentInfo(false)
		}
	}
	return <>
		<CheckoutScreenSmallTitle>
			Card number
		</CheckoutScreenSmallTitle>
		<SizedBox height={20}/>
		<CreditCardContainer>
			<CardElement options={{style: {base: {fontSize: '16px'}}}} onChange={handleCreditCardChange}/>
		</CreditCardContainer>
		<SizedBox height={15}/>
		<StripeBadge/>
		<SizedBox height={30}/>
		{error ? <><ErrorText>Payment failed.</ErrorText><SizedBox height={10}/></> : null}
		<TermsSection callPrice={callPrice}/>
		<SizedBox height={20}/>
		<NextButton disabled={!isValidPaymentInfo} onClick={handleSubmitPayment} loading={loading}>
			Pay & Start Call
		</NextButton>
	</>
}
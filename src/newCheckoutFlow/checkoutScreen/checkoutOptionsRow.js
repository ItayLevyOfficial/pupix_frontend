import {SizedBox} from '../../videoRoom/sendTipFlow/tipCreatorModalComponents'
import CreditCardText from '../../icons/creditCardButtonText.svg'
import {ExactSizedBox} from '../../generalComponents/pupikFooter'
import GooglePayText from '../../icons/googlePayText.svg'
import ApplePayText from '../../icons/applePayText.svg'
import React from 'react'
import styled from 'styled-components'
import {AlignedCenteredRow} from '../../generalComponents/containers'
import SmallSuccessIcon from '../../icons/blueSuccessIcon.svg'
import {CheckoutScreenSmallTitle} from './checkoutScreenHelpers'

const CenteredRow = styled(AlignedCenteredRow)`
  align-self: center;
`

const PaymentOption = styled.button`
  height: 50px;
  width: 90px;
  outline: none;
  background-color: ${props => props.selected ? 'var(--light-main-color)' : 'white'};
  border-radius: 10px;
  border: ${props => props.selected ? '1px solid var(--new-main-color)' : 'none'};
  box-shadow: ${props => props.selected ? 'none' : '0 2px 4px 0 rgba(0, 0, 0, 0.16)'};
  position: relative;
`

const PositionedSuccessIcon = styled(SmallSuccessIcon)`
  position: absolute;
  right: -6px;
  top: -6px;
`

const PaymentOptionWithIcon = ({children, optionName, selectedOption, setSelectedPaymentOption, ...props}) => (
	<PaymentOption
		{...props} selected={selectedOption === optionName} onClick={() => setSelectedPaymentOption(optionName)}>
		{optionName === selectedOption ?
			<PositionedSuccessIcon diameter={20} backgroundColor='var(--new-main-color)'/> : null}
		{children}
	</PaymentOption>
)

export const PaymentOptionsRow = ({selectedPaymentOption, setSelectedPaymentOption}) => <>
	<CheckoutScreenSmallTitle>
		Payment methods
	</CheckoutScreenSmallTitle>
	<SizedBox height={20}/>
	<CenteredRow>
		<PaymentOptionWithIcon optionName='card' selectedOption={selectedPaymentOption}
		                       setSelectedPaymentOption={setSelectedPaymentOption}>
			<CreditCardText/>
		</PaymentOptionWithIcon>
		<ExactSizedBox width='5vw'/>
		<PaymentOptionWithIcon optionName='google' selectedOption={selectedPaymentOption}
		                       setSelectedPaymentOption={setSelectedPaymentOption}>
			<GooglePayText/>
		</PaymentOptionWithIcon>
		<ExactSizedBox width='5vw'/>
		<PaymentOptionWithIcon optionName='apple' selectedOption={selectedPaymentOption}
		                       setSelectedPaymentOption={setSelectedPaymentOption}>
			<ApplePayText/>
		</PaymentOptionWithIcon>
	</CenteredRow>
</>
import React from 'react'
import {SizedBox} from '../../videoRoom/sendTipFlow/tipCreatorModalComponents'
import {FullWidthColumn} from '../../generalComponents/containers'
import {BrowserNotSupportedAlert, PaddedFullWidthColumn, PupixAlert} from './checkoutScreenHelpers'
import styled from 'styled-components'
import {PaymentOptionsRow} from './checkoutOptionsRow'
import {CheckoutPageHeader} from './checkoutPageHeader'
import {PaymentRequestBody} from './checkoutBody'
import {isSupported} from 'twilio-video'
import {CreditCardBody} from './creditCardBody'
import {SeparatorLine} from '../../howItWorks/howItWorksComponents'

const CheckoutScreenSeparator = styled(SeparatorLine)`
  align-self: center;
  width: 220px;
`

export const CheckoutPage = (
	{
		addresseeData, videoCallLength, submitCardPayment, loadingCardPayment, cardPaymentError,
		selectedPaymentOption, setSelectedPaymentOption, enabledPaymentMethods, handleGooglePayClick,
		loadingGooglePayment, creatorTwitterUsername
	}) => {
	const callPrice = videoCallLength * addresseeData?.minuteWage
	
	const paymentRequestParams = {
		callPrice, handlePayClick: handleGooglePayClick, loadingPayment: loadingGooglePayment
	}
	
	return (
		<FullWidthColumn>
			<PaddedFullWidthColumn padding='30px'>
				<SizedBox height={30}/>
				<CheckoutPageHeader callPrice={callPrice} videoCallLength={videoCallLength}/>
				<SizedBox height={24}/>
				<PaymentOptionsRow
					setSelectedPaymentOption={setSelectedPaymentOption} selectedPaymentOption={selectedPaymentOption}/>
				<SizedBox height={30}/>
				<CheckoutScreenSeparator/>
				<SizedBox height={30}/>
				{
					addresseeData?.isAvailable ? isSupported ?
						selectedPaymentOption === 'card' ?
							<CreditCardBody callPrice={callPrice} loading={loadingCardPayment}
							                handleSubmitPayment={submitCardPayment} error={cardPaymentError}/> :
							selectedPaymentOption === 'google' ?
								<PaymentRequestBody {...paymentRequestParams} enabled={enabledPaymentMethods?.googlePay}
								                    paymentMethod='google'/> :
								<PaymentRequestBody {...paymentRequestParams} enabled={enabledPaymentMethods?.applePay}
								                    paymentMethod='apple'/> :
						<BrowserNotSupportedAlert/> : <PupixAlert>
						<strong>{creatorTwitterUsername}</strong> is not available for video calls at the moment. Please
						try again later.
					</PupixAlert>
				}
				<SizedBox height={40}/>
			</PaddedFullWidthColumn>
		</FullWidthColumn>
	)
}

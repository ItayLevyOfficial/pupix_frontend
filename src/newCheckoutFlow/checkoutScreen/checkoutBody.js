import {SizedBox} from '../../videoRoom/sendTipFlow/tipCreatorModalComponents'
import {PupixAlert} from './checkoutScreenHelpers'
import {TermsSection} from './creditCardBody'
import React from 'react'
import {NewBootstrapActionButton} from '../../pages'
import styled from 'styled-components'
import GooglePayIcon from '../../icons/googlePayButtonIcon.svg'
import ApplePayIcon from '../../icons/applePayWhiteIcon.svg'
import Spinner from 'react-bootstrap/Spinner'
import {CenteredContainer} from '../../generalComponents/containers'

const PayButton = styled(NewBootstrapActionButton).attrs({variant: 'pay'})`
  height: 46px;
`

export const PaymentRequestBody = ({callPrice, enabled, handlePayClick, loadingPayment, paymentMethod}) => {
	if (enabled) {
		return <>
			<TermsSection callPrice={callPrice}/>
			<SizedBox height={20}/>
			<PayButton onClick={handlePayClick}>
				{loadingPayment ? <CenteredContainer><Spinner animation="border" size="sm" role="status"
				                                              style={{color: 'white'}}/></CenteredContainer> :
					paymentMethod === 'google' ? <GooglePayIcon/> : <ApplePayIcon/>}
			</PayButton>
		</>
	} else {
		return <PupixAlert>
			<strong>{paymentMethod === 'google' ? 'Google' : 'Apple'} pay</strong> is not supported on this device.
			Please use another payment method.
		</PupixAlert>
		
	}
}
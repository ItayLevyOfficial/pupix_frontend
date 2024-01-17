import {Row} from '../../generalComponents/containers'
import {CheckoutScreenSmallTitle, Separator} from './checkoutScreenHelpers'
import {SizedBox} from '../../videoRoom/sendTipFlow/tipCreatorModalComponents'
import React from 'react'
import styled from 'styled-components'
import {AnonymousLoginParagraph} from '../secureLoginPage'

const CheckoutScreenParagraph = styled(AnonymousLoginParagraph)`
  font-size: 14px;
  line-height: 26px;
`

export const CheckoutPageHeader = ({videoCallLength, callPrice}) => <>
	<Row>
		<CheckoutScreenSmallTitle
			style={{marginRight: '20px'}}>{videoCallLength} Minutes</CheckoutScreenSmallTitle>
		<Separator style={{marginRight: '20px'}}/>
		<CheckoutScreenSmallTitle style={{marginRight: '20px'}}>Total:
			${callPrice}</CheckoutScreenSmallTitle>
	</Row>
	<SizedBox height={14}/>
	<CheckoutScreenParagraph>
		We will only charge you if the creator accepts the call within two minutes.
	</CheckoutScreenParagraph>
</>
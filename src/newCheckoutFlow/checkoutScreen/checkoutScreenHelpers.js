import styled from 'styled-components'
import * as constants from '../../generalHelpers/constants'
import {isIos} from '../../generalHelpers/constants'
import React from 'react'
import {FullWidthColumn} from '../../generalComponents/containers'
import Alert from 'react-bootstrap/Alert'
import {gentleBlackColor} from '../../generalHelpers/generalStyles'

export const Separator = styled.div`
  background-color: ${constants.mainTextColor};
  width: 3px;
  height: 16px;
  border-radius: 1.5px;
`

export const PrimaryAlert = styled(Alert).attrs({variant: 'primary'})`
  border-radius: 10px;
  width: calc(100vw - 60px);
  margin-bottom: 0;
`

export const PupixAlert = styled(PrimaryAlert).attrs({variant: 'pupix'})``

export const BrowserNotSupportedAlert = () => (
	<PupixAlert>
		{isIos() ? (
				<>On IOS, only <strong>Safari</strong> can access your camera. To perform video calls,
					use <strong>Safari</strong>.</>) :
			(<>This browser cannot access your camera. To perform video calls, use <strong>Chrome</strong>.</>)}
	</PupixAlert>
)

export const ErrorText = styled.h2`
  white-space: pre-wrap;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.3px;
  color: red;
  line-height: 16px;
  text-align: left;
`

export const TermsParagraph = styled.p`
  font-size: 12px;
  letter-spacing: 0;
  line-height: 1;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 0;
`

export const PaddedFullWidthColumn = styled(FullWidthColumn)`
  padding: 0 ${props => props.padding};
`

export const CenteredPaddedFullWidthColumn = styled(PaddedFullWidthColumn)`
  align-items: center;
`

/**
 * @param originalPrice: The original call price, in USD.
 * @return {number}: The stripe processing fee, in USD.
 */
export const calculateStripeFee = originalPrice => {
	originalPrice = parseInt(originalPrice)
	return Math.ceil((((originalPrice + 0.30) / (1 - 0.029)) - originalPrice) * 100) / 100
}

const SmallTitle = styled.h1`
  ${gentleBlackColor};
  font-size: 18px;
  line-height: 18px;
  font-weight: 500;
  letter-spacing: 0.2px;
  align-self: flex-start;
`
export const CheckoutFlowSmallTitle = styled(SmallTitle)`
  letter-spacing: 0.2px;
  padding: 0;
  margin-bottom: 0;
  white-space: nowrap;
`
export const CheckoutScreenSmallTitle = styled(CheckoutFlowSmallTitle)`
  font-size: 16px;
  line-height: 16px;
`
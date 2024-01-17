import React from 'react'
import styled from 'styled-components'
import {CenteredContainer, FullWidthColumn} from '../generalComponents/containers'
import * as constants from '../generalHelpers/constants'
import {NewBootstrapActionButton} from '../pages'
import {SizedBox} from '../videoRoom/sendTipFlow/tipCreatorModalComponents'
import NextArrowIcon from '../icons/nextArrowIcon.svg'
import Loader from 'react-loader-spinner'
import {CenteredPaddedFullWidthColumn, CheckoutFlowSmallTitle} from './checkoutScreen/checkoutScreenHelpers'

const OptionButton = styled.button`
  outline: none;
  background-color: white;
  justify-content: center;
  display: flex;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.isSelected ? 'var(--new-main-color)' : constants.fadedBlack};
  font-size: 18px;
  letter-spacing: 0.3px;
  font-weight: bold;
  color: ${props => props.isSelected ? 'var(--new-main-color)' : constants.fadedBlack};
  border-radius: 10px;
  width: calc(100vw - 60px);
  padding: 10px 0;
  line-height: 18px;
  max-width: 400px;
`

const Separator = styled.div`
  background-color: ${props => props.isSelected ? 'var(--new-main-color)' : constants.fadedBlack};
  width: 4px;
  height: 20px;
  border-radius: 2px;
`

const PaddedOptionButton = styled(OptionButton)`
  margin-bottom: 20px;
`

const CallLengthOptionButton = ({minuteWage, callLength, ...props}) => (
	<PaddedOptionButton {...props}>
		{callLength} minutes
		<SizedBox width={20}/>
		<Separator isSelected={props.isSelected}/>
		<SizedBox width={20}/>
		${minuteWage * callLength}
	</PaddedOptionButton>
)

export const NextButton = ({loading, children, disabled, arrow = true, ...props}) => (
	<NewBootstrapActionButton {...props} disabled={loading || disabled}>
		<CenteredContainer>
			{children}
			{arrow || loading ? <SizedBox width={15}/> : null}
			{loading ? <Loader type='TailSpin' color='white' width='17px' height='17px'/> :
				arrow ? <NextArrowIcon/> : null}
		</CenteredContainer>
	</NewBootstrapActionButton>
)


export const VideoCallLength = ({handleContinueClick, videoCallLength, setVideoCallLength, creatorMinuteWage}) => {
	
	return creatorMinuteWage ? (
		<CenteredPaddedFullWidthColumn padding='40px'>
			<SizedBox height={30}/>
			<CheckoutFlowSmallTitle>
				Video Call Length
			</CheckoutFlowSmallTitle>
			<SizedBox height={50}/>
			<CallLengthOptionButton
				isSelected={videoCallLength === 3} onClick={() => setVideoCallLength(3)}
				callLength={3} minuteWage={creatorMinuteWage}/>
			<CallLengthOptionButton isSelected={videoCallLength === 8} onClick={() => setVideoCallLength(8)}
			                        callLength={8} minuteWage={creatorMinuteWage}/>
			<CallLengthOptionButton
				style={{marginBottom: '60px'}} isSelected={videoCallLength === 20}
				onClick={() => setVideoCallLength(20)} callLength={20} minuteWage={creatorMinuteWage}/>
			<NextButton onClick={handleContinueClick}>
				Next
			</NextButton>
		</CenteredPaddedFullWidthColumn>
	) : <FullWidthColumn/>
}
import EndCallIcon from '../icons/endCallIcon.svg'
import React from 'react'
import {VideoCallBottomButton} from '../videoRoom/controllers/videoCallBottomButton'
import * as constants from '../generalHelpers/constants'
import {CenteredContainer, FullDisplayCenteredColumn} from '../generalComponents/containers'
import styled from 'styled-components'
import {CenteredExplanationText, MediumTitle} from './creatorHungUp'
import {Timer} from './useTimer'

const CounterCircle = styled(CenteredContainer)`
  height: 170px;
  width: 170px;
  border-radius: 1000px;
  background-color: var(--new-main-color);
  font-size: 40px;
  color: white;
  font-weight: bold;
  letter-spacing: 0.3px;
`

export const OtherParticipantLostInternet = ({lostConnectionTime, isCreator, handleHangUp}) => {
	const reconnectionLength = 45
	
	return (
		<FullDisplayCenteredColumn>
			<MediumTitle style={{margin: '30px 20px 20px'}}>
				The other participant Disconnected
			</MediumTitle>
			<CenteredExplanationText style={{margin: '0 20px 30px'}}>
				{isCreator ?
					`If they do not return in ${reconnectionLength} seconds, the call will end, and you will receive full payment.` :
					`If they do not return in ${reconnectionLength} seconds, you will receive a full refund.`
				}
			</CenteredExplanationText>
			<CounterCircle style={{marginBottom: '30px'}}>
				<Timer startTime={lostConnectionTime} length={reconnectionLength * 1000}/>
			</CounterCircle>
			<VideoCallBottomButton
				bottomText={'End Call'}
				icon={<EndCallIcon/>}
				buttonColor={constants.hangUpButtonColor}
				textColor={'rgba(0,0,0,0.5)'}
				handleClick={handleHangUp}
				style={{margin: 'auto 0 20px'}}
			/>
		</FullDisplayCenteredColumn>
	)
}
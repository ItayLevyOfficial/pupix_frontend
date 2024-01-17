import React from 'react'
import { AlignedCenteredRow } from '../../generalComponents/containers'
import styled from 'styled-components'
import { SizedBox } from '../sendTipFlow/tipCreatorModalComponents'
import { formattedRemainTime } from '../../generalHelpers/videoCallHelpers'
import * as constants from '../../generalHelpers/constants'
import { useGoingDownTimer } from '../../videoRoomScreens/useTimer'

const TitleSeparator = styled.div`
  height: 30px;
  width: 6px;
  border-radius: 3px;
  background: white;
`

const topBlurHeight = '100px'
export const TopBlurContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: ${topBlurHeight};
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  margin-top: 0;
  transition: transform ${constants.showBottomButtonsAnimationDuration};
  transform: translateY(
    ${(props) => (props?.hide ? `calc(${topBlurHeight} * -1)` : 0)}
  );
  display: flex;
  justify-content: center;
  align-items: flex-start;
`
/**
 * The white title at the top of the video call page.
 */
export const VideoCallTitle = styled.h1`
  font-weight: bold;
  color: white;
  letter-spacing: 0.3px;
  font-size: 26px;
  margin-bottom: 0;
`
export const FormattedTimer = ({
  timerStartTime,
  callLength,
  handleTimerEnd,
  errorTime,
}) => {
  const remainTime = useGoingDownTimer({
    startTime: timerStartTime,
    length: callLength * 60_000,
    handleCounterEnd: handleTimerEnd,
    errorTime,
  })
  return formattedRemainTime({ remainTime })
}
export const TopBlur = ({
  callPrice,
  creatorConnectionTime,
  callLength,
  hide,
  handleTimerEnd,
}) => {
  return (
    <TopBlurContainer hide={hide}>
      <AlignedCenteredRow style={{ marginTop: '30px' }}>
        <VideoCallTitle>
          <FormattedTimer
            callLength={callLength}
            timerStartTime={creatorConnectionTime}
            handleTimerEnd={handleTimerEnd}
            errorTime={5_000}
          />
        </VideoCallTitle>
        <SizedBox width={30} />
        <TitleSeparator />
        <SizedBox width={30} />
        <VideoCallTitle>{`$${callPrice}`}</VideoCallTitle>
      </AlignedCenteredRow>
    </TopBlurContainer>
  )
}

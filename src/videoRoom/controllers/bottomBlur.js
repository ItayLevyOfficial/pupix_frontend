import React from 'react'
import {CenteredContainer} from '../../generalComponents/containers'
import styled from 'styled-components'
import {VideoIcon} from '../../icons/videoIcon'
import FullScreenIcon from '../../icons/newFullScreenIcon.svg'
import ExitFullScreenIcon from '../../icons/newExitFullScreenIcon.svg'
import HangUpIconWithBackground from '../../icons/newHangUpIcon.svg'
import DollarSignIcon from '../../icons/dollarSignIcon.svg'
import FlipCameraIcon from './flipCameraIcon.svg'
import HangUpIcon from './hangUpIcon.svg'
import {DisabledVideoIcon} from '../../icons/disabledVideoIcon'
import screenfull from 'screenfull'

export const backgroundBlurBoxHeight = 80
export const backgroundBlurBoxMarginBottom = 40

const BackgroundBlurRow = styled(CenteredContainer)`
  width: ${props => props.buttonsCount > 3 ? 295 : 230}px;
  max-width: 400px;
  justify-content: space-between;
  padding: 25px 35px;
  height: ${backgroundBlurBoxHeight}px;
  border-radius: 15px;
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px) brightness(60%);
  // This background color is adobe xd default
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  align-self: center;
  margin-bottom: ${backgroundBlurBoxMarginBottom}px;
`

const HangUpCircle = styled.button`
  background-color: #FD3939;
  padding: 15px;
  border-radius: 100%;
  border: none;
  outline: none;
  position: fixed;
  bottom: 150px;
  left: 50%;
  transform: translateX(-50%);
`

export const BottomBlur = (
	{
		handleHangUpClick, handleFullScreenClick, handleVideoIconClick, handleFlipCameraClick, isFullScreen,
		isVideoEnabled, isShowingButtons, handleDollarSignClick, isCreator = false
	}) => {
	
	let isFullscreenEnabled = screenfull.isEnabled
	const buttonsCount = isCreator ? isFullscreenEnabled ? 4 : 3 : isFullscreenEnabled ? 5 : 4
	
	return <>
		{buttonsCount === 5 && isShowingButtons ? <HangUpCircle onClick={handleHangUpClick}>
			<HangUpIcon/>
		</HangUpCircle> : null}
		<BackgroundBlurRow buttonsCount={buttonsCount}>
			<FlipCameraIcon onClick={event => {
				handleFlipCameraClick()
				event.stopPropagation()
			}
			}/>
			{isCreator ? null : (
				<>
					{isVideoEnabled ? <VideoIcon width='30px' onClick={handleVideoIconClick}/> :
						<DisabledVideoIcon width='30px' onClick={handleVideoIconClick}/>}
				</>
			)}
			{
				isFullscreenEnabled ? <>
					{isFullScreen ? <ExitFullScreenIcon onClick={handleFullScreenClick}/> :
						<FullScreenIcon onClick={handleFullScreenClick}/>}
				</> : null
			}
			{
				buttonsCount < 5 ? <HangUpIconWithBackground onClick={handleHangUpClick}/> : null
			}
			<DollarSignIcon onClick={handleDollarSignClick}/>
		</BackgroundBlurRow>
	</>
}
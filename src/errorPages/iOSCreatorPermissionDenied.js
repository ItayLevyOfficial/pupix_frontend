import React from 'react'
import {FullDisplayColumn} from '../generalComponents/containers'
import styled from 'styled-components'
import RefreshIcon from '../icons/refreshIcon.svg'
import AAIcon from '../icons/AAIcon.svg'
import IOSSettingsIcon from '../icons/iosSettingsIcon.svg'
import MicrophoneIcon from '../icons/MicrophoneIcon.svg'
import DoneIcon from '../icons/DoneIcon.svg'
import {gentleBlackColor} from '../generalHelpers/generalStyles'
import * as constants from '../generalHelpers/constants'
import {ButtonWithLoading} from '../registrationFlow/stripeExplanation'

export const OrdersGrid = styled.div`
  width: calc(100vw - 40px);
  display: grid;
  grid-template-columns: 20% 80%;
  grid-template-rows: auto;
  row-gap: 25px;
  align-items: center;
  justify-items: center;
`

export const GridOrder = styled.h2`
  margin-bottom: 0;
  justify-self: self-start;
  font-size: 16px;
  line-height: 22px;
  font-weight: 400;
  ${gentleBlackColor};
`

export const InTextAAIcon = styled(AAIcon)`
  & > path {
    fill: ${constants.mainTextColor};
  }
`

export const BoldText = styled.strong`
  font-weight: bold;
`

export const TwentyPixelTitle = styled.h1`
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.2px;
  text-align: center;
  line-height: 26px;
  ${gentleBlackColor};
`

export const IOSPermissionDenied = () => {
	return (
		<FullDisplayColumn>
			<TwentyPixelTitle style={{margin: '30px 20px 50px'}}>
				Enable camera & microphone permissions to accept calls.
			</TwentyPixelTitle>
			<OrdersGrid style={{margin: '0 20px 30px'}}>
				<RefreshIcon/>
				<GridOrder>
					1. Refresh the page.
				</GridOrder>
				<AAIcon/>
				<GridOrder>
					2. Click the top left &nbsp;<InTextAAIcon/>&nbsp;Icon.
				</GridOrder>
				<IOSSettingsIcon/>
				<GridOrder>
					3. Click <BoldText>Website settings.</BoldText>
				</GridOrder>
				<MicrophoneIcon/>
				<GridOrder>
					4. Ensure your camera & mic are set to <BoldText>Allow</BoldText>.
				</GridOrder>
				<DoneIcon/>
				<GridOrder>
					5. Select <BoldText>Done</BoldText>, and refresh the page again.
				</GridOrder>
			</OrdersGrid>
			<ButtonWithLoading onClick={() => window.location.reload()}>
				Refresh
			</ButtonWithLoading>
		</FullDisplayColumn>
	)
}
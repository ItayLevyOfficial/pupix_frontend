import React from 'react'
import {FullDisplayCenteredColumn} from '../generalComponents/containers'
import {BoldText, GridOrder, OrdersGrid, TwentyPixelTitle} from './iOSCreatorPermissionDenied'
import CopyIcon from '../icons/copyIcon.svg'
import ChromeIcon from '../icons/chromeIcon.svg'

export const AndroidBrowserNotSupported = () => {
	return (
		<FullDisplayCenteredColumn>
			<TwentyPixelTitle style={{margin: '30px 20px 0', whiteSpace: 'nowrap'}}>
				This browser is not supported.
			</TwentyPixelTitle>
			<TwentyPixelTitle style={{margin: '0 20px 50px', whiteSpace: 'nowrap'}}>
				Open the website with Chrome.
			</TwentyPixelTitle>
			<OrdersGrid style={{margin: '0 20px auto'}}>
				<CopyIcon/>
				<GridOrder>
					1. Copy the website
					URL: <BoldText>{`${window?.location.host}${window?.location.pathname}`}</BoldText>
				</GridOrder>
				<ChromeIcon/>
				<GridOrder>
					2. Open the URL you copied in <BoldText>Chrome</BoldText>.
				</GridOrder>
			</OrdersGrid>
		</FullDisplayCenteredColumn>
	)
}
import React from 'react'
import {FullDisplayCenteredColumn} from '../generalComponents/containers'
import {BoldText, GridOrder, OrdersGrid, TwentyPixelTitle} from './iOSCreatorPermissionDenied'
import CopyIcon from '../icons/copyIcon.svg'
import SafariIcon from '../icons/safariIcon.svg'

export const IOSBrowserNotSupported = () => {
	return (
		<FullDisplayCenteredColumn>
			<TwentyPixelTitle style={{margin: '30px 20px 0', whiteSpace: 'nowrap'}}>
				This browser is not supported.
			</TwentyPixelTitle>
			<TwentyPixelTitle style={{margin: '0 20px 50px', whiteSpace: 'nowrap'}}>
				Open the website with Safari.
			</TwentyPixelTitle>
			<OrdersGrid style={{margin: '0 20px auto'}}>
				<CopyIcon/>
				<GridOrder>
					1. Copy the website
					URL: <BoldText>{`${window?.location.host}${window?.location.pathname}`}</BoldText>
				</GridOrder>
				<SafariIcon/>
				<GridOrder>
					2. Open the URL you copied in <BoldText>Safari</BoldText>.
				</GridOrder>
			</OrdersGrid>
		</FullDisplayCenteredColumn>
	)
}
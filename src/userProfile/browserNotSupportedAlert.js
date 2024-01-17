import {TopPaddedBootstrapAlert} from './stripeAccountAlert'
import React from 'react'
import {isIos} from '../generalHelpers/constants'

export const BrowserNotSupportedAlert = ({isClient, ...props}) => {
	if (isIos()) {
		return (
			<TopPaddedBootstrapAlert variant='primary' {...props}>
				On IOS, only <strong>Safari</strong> can access your camera.
				To {isClient ? 'perform' : 'accept'} video calls, use <strong>Safari</strong>.
			</TopPaddedBootstrapAlert>
		)
	} else {
		return (
			<TopPaddedBootstrapAlert variant='primary' {...props}>
				This browser cannot access your camera.
				To {isClient ? 'perform' : 'accept'} video calls, use <strong>Chrome</strong>.
			</TopPaddedBootstrapAlert>
		)
	}
}
import React from 'react'
import {CreatorVideoManager} from '../../videoRoom/videoManager'

export const SafeHydrate = ({children}) => {
	return (
		<div suppressHydrationWarning>
			{typeof window === 'undefined' ? null : children}
		</div>
	)
}

const ClientRenderedCreatorVideoManager = () => {
	return (
		<SafeHydrate>
			<CreatorVideoManager/>
		</SafeHydrate>
	)
}

export default ClientRenderedCreatorVideoManager
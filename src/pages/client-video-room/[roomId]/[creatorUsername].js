import React from 'react'
import {SafeHydrate} from '../../video-room/[roomId]'
import {ClientVideoManager} from '../../../videoRoom/videoManager'

const ClientRenderedVideoRoom = () => {
	return (
		<SafeHydrate>
			<ClientVideoManager/>
		</SafeHydrate>
	)
}

export default ClientRenderedVideoRoom
import React from 'react'
import {SafeHydrate} from './video-room/[roomId]'
import {BottomBlur} from '../videoRoom/controllers/bottomBlur'

const ClientRendered = () => (
	<SafeHydrate>
		<BottomBlur/>
	</SafeHydrate>
)

export default ClientRendered
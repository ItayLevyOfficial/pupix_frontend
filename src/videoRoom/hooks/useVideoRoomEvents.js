import {useEffect} from 'react'
import {useRouter} from 'next/router'

const callEndHandlers = ({router, callTotalPrice, creatorUsername, roomId, isCreator = true}) => {
	return isCreator ? {
		handleCreatorMissedCall: () => {
			router.replace({
				pathname: '/creator-you-left-call',
				query: {title: 'You answered too late, so the client got refunded.'}
			})
		},
		handleCreatorDeniedCall: () => {
			router.replace({
				pathname: '/creator-you-left-call',
				query: {title: 'You denied this call, so the client got refunded.'}
			})
		},
		handleCreatorLeftCall: () => {
			router.replace({
				pathname: '/creator-you-left-call',
				query: {title: 'You left the call in the middle, so we refunded the client.'}
			})
		},
		handleCallCompleted: () => {
			router.replace({pathname: '/congratulations', query: {earningsAmount: callTotalPrice}})
		},
		handleClientLeftCall: () => {
			router.replace({pathname: '/congratulations', query: {earningsAmount: callTotalPrice}})
		}
	} : {
		handleCreatorMissedCall: () => {
			router.replace(
				{pathname: '/creator-hung-up', query: {message: 'The creator missed the call.', creatorUsername}})
		},
		handleCreatorDeniedCall: () => {
			router.replace(
				{pathname: '/creator-hung-up', query: {message: 'The creator denied the call.', creatorUsername}})
		},
		handleCallCompleted: () => {
			router.replace({pathname: '/rate-your-experience', query: {creatorUsername, roomId}})
		},
		handleClientLeftCall: () => {
			router.replace({pathname: '/rate-your-experience', query: {creatorUsername, roomId}})
		},
		handleCreatorLeftCall: () => {
			router.replace({pathname: '/creator-hung-up', query: {message: 'The creator hung up.', creatorUsername}})
		}
	}
}

export const useVideoRoomEvents = ({callData, isCreator, creatorUsername, roomId, handleCallEnd}) => {
	const callStatus = callData?.status
	const router = useRouter()
	
	let callTotalPrice = callData?.callPrice + (callData?.totalTips ?? 0)
	const endHandlers = callEndHandlers({router, creatorUsername, callTotalPrice, isCreator, roomId})
	
	useEffect(() => {
		if (['missed', 'denied', 'completed', 'client-left', 'addressee-left'].includes(callStatus)) {
			localStorage.setItem(roomId, 'done')
			handleCallEnd()
			if (callStatus === 'missed') {
				endHandlers.handleCreatorMissedCall()
			} else if (callStatus === 'denied') {
				endHandlers.handleCreatorDeniedCall()
			} else if (callStatus === 'completed') {
				endHandlers.handleCallCompleted()
			} else if (callStatus === 'client-left') {
				endHandlers.handleClientLeftCall()
			} else if (callStatus === 'addressee-left') {
				endHandlers.handleCreatorLeftCall()
			}
		}
	}, [callStatus, endHandlers, handleCallEnd, roomId])
}
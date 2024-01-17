import {useEffect, useState} from 'react'
import {callFunctionIfExists} from './outgoingCall'

export const useGoingDownTimer = ({startTime, length, handleCounterEnd = () => {}, errorTime = 3_000}) => {
	const [remainTime, setRemainTime] = useState(startTime ? length - (Date.now() - startTime) : length ? length : 0)
	
	useEffect(() => {
		const intervalId = setInterval(() => {
			if (startTime && length && remainTime < -errorTime) {
				callFunctionIfExists(handleCounterEnd)
			}

			setRemainTime(startTime ? length - (Date.now() - startTime) : length ? length : 0)
		}, 1000)
		
		return () => clearInterval(intervalId)
	}, [errorTime, handleCounterEnd, length, remainTime, startTime])
	
	if (startTime || length) {
		const realRemainTime = Math.floor((remainTime + errorTime) / 1000)
		const lengthInSeconds = Math.floor(length / 1000)
		return realRemainTime >= 0 ? realRemainTime > lengthInSeconds ? lengthInSeconds : realRemainTime : 0
	} else {
		return null
	}
}
export const Timer = ({startTime, length, handleCounterEnd, errorTime}) => {
	const remainTime = useGoingDownTimer({startTime, length, handleCounterEnd, errorTime})
	return remainTime ?? ''
}
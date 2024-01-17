import {pad} from './generalFunctions'

export function formattedRemainTime({remainTime}) {
	if (remainTime > 0) {
		if (remainTime > 60) {
			return `${Math.floor(remainTime / 60)}:${pad(remainTime % 60, 2)}`
		} else {
			return remainTime
		}
		
	} else {
		return '0'
	}
}

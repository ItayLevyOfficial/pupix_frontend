import {parsePhoneNumberFromString} from 'libphonenumber-js'

export function onlyDigits(phoneNumber) {
	return (/^[0-9]*$/.test(phoneNumber))
}

export const isValidPhoneNumber = (phoneNumber) => {
	try {
		return parsePhoneNumberFromString('+' + phoneNumber)?.isPossible()
	} catch (error) {
		return false
	}
}

export function isValidMinuteWage(minuteWage) {
	return minuteWage && parseInt(minuteWage) > 0
}

export const mainColor = '#5CA8F4'
export const hangUpButtonColor = '#DD7373'
export const acceptCallButtonColor = '#73DDA8'
export const bottomButtonTextColor = 'rgba(0, 0, 0, 0.5)'
export const mainTextColor = 'rgba(0, 0, 0, 0.7)'
export const showBottomButtonsAnimationDuration = '0.8s'
export const profilePhotoDiameter = '150px'
export const mainGradient = 'linear-gradient(to right, #5CD1F4, #5C7FF4)'
export const pageSlideAnimationDuration = '1s'
export const fadedBlack = 'rgba(0, 0, 0, 0.2)'
export const editProfileInputWarning = '#FFD6D6'
// Can be testing, staging or live
export const environment = process.env.NEXT_PUBLIC_ENVIRONMENT
export const stripePublicKey = environment === 'live' ?
	'pk_live_51IGilFArE50RWX8Moeg87TDPjxlaMDD16M3TZeLzOAtUigw6JagcJJaVPFGKZVIQ4uYBoH8gkp8yNG97VAGxUd6d00waaCPEpo' :
	'pk_test_51IGilFArE50RWX8MMeLhlBg843eGuTjrUN3Jfmd7bZkfD1kQAklRZPMldprpdX0OX54KBNZ7XX1PLlEGeOQlt4EC009mFSrjSX'

export const firebaseProjectId = environment === 'live' ? 'pupik-897d8' : 'levy-c62af'
export const addresseeAnsweredTooLateTitle = 'You answered too late, so the client got refunded.'

export const isIos = () => {
	if (typeof window === 'undefined') {
		return false
	} else {
		return [
			'iPad Simulator',
			'iPhone Simulator',
			'iPod Simulator',
			'iPad',
			'iPhone',
			'iPod'
		].includes(navigator.platform) || (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
	}
}

// iPad on iOS 13 detection

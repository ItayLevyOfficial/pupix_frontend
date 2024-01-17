import {useEffect, useState} from 'react'

const isInstagramInApp = userAgent => userAgent.includes('Instagram')
const isFacebookInApp = userAgent => ((userAgent.indexOf('FBAN') > -1) || (userAgent.indexOf('FBAV') > -1))


/**
 * This hook is useful when you want to have a state that get pushes to the history on mount and every time it
 * changes, and when the user goes back the only thing that changes is this state.
 * Useful in the registrationFlow and in the checkoutFlow.
 *
 * @param initialValue: The initial state.
 * @param isCheckoutFlow: Need it for the instagram in app browser bug in the checkout flow.
 * @return [state, setState]: The current state and a function to update the state and push the state to
 * the history.
 */
export const useHistoryState = (initialValue, isCheckoutFlow) => {
	const [state, setState] = useState(initialValue)
	const [isBackMove, setIsBackMove] = useState(false)
	
	useEffect(() => {
		// There was an unexplained bug in the instagram checkout flow that this workaround fixed.
		// The bug was that if you would go back from the video call length screen, the in app browser was get closed.
		if ((isInstagramInApp(navigator.userAgent) || isFacebookInApp(navigator.userAgent)) && isCheckoutFlow) {
			window.history.replaceState(initialValue, '')
			window.history.pushState(initialValue, '')
		} else {
			window.history.replaceState(initialValue, '')
		}
		window.onpopstate = event => {
			setIsBackMove(true)
			// Need the idx for the first page to work for some reason
			setState(event.state.idx ?? event.state)
		}
		return () => {
			window.onpopstate = null
		}
	}, [initialValue, isCheckoutFlow])
	
	useEffect(() => {
		const handleSizeChange = () => {
			if (isCheckoutFlow) {
				setIsBackMove(true)
			}
		}
		window.addEventListener('resize', handleSizeChange, true)
		return window.removeEventListener('resize', handleSizeChange)
	}, [isCheckoutFlow])
	
	const setAndPushState = (newState) => {
		setIsBackMove(false)
		setState(newState)
		window.history.pushState(newState, '')
	}
	
	return [state, setAndPushState, isBackMove]
}
import {useEffect, useState} from 'react'

/**
 * A hook that return the page gonna disappear state, which is useful to prevent mobile browser freeze on refreshes
 * or redirects when there is video content on the screen.
 */
export const usePageGonnaDisappear = () => {
	const [pageGonnaDisappear, setPageGonnaDisappear] = useState(false)
	
	useEffect(() => {
		const beforeUnload = () => setPageGonnaDisappear(true)
		window.addEventListener('beforeunload', beforeUnload)
		
		return () => window.removeEventListener('beforeunload', beforeUnload)
	}, [])
	
	return pageGonnaDisappear
}
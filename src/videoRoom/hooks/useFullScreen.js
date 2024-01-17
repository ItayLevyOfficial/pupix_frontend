import {useEffect, useState} from 'react'
import screenfull from 'screenfull'

export function useFullScreen() {
	const [fullScreen, setFullScreen] = useState(false)
	
	/**
	 * Sets a listener to screen size change, to update the state if the user exit full screen.
	 */
	useEffect(() => {
		const callback = () => {
			if (screenfull.isFullscreen) {
				setFullScreen(true)
			} else {
				setFullScreen(false)
			}
		}
		if (screenfull.isEnabled) {
			screenfull.on('change', callback)
			return () => {
				screenfull.off('change', callback)
			}
		}
	}, [])
	
	useEffect(() => {
		if (screenfull.isEnabled) {
			return () => {
				screenfull.exit().catch(() => {}).then(() => {})
			}
		}
	}, [])
	
	async function toggleFullScreen(event) {
		event.stopPropagation()
		if (screenfull.isEnabled) {
			await screenfull.toggle(document.body)
		}
	}
	
	return [fullScreen, toggleFullScreen]
}
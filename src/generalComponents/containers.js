import styled from 'styled-components'
import React, {useEffect, useState} from 'react'

export const FillAvailableSpace = styled.div`
  height: 100%;
  width: 100%;
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`

export const FullWidthColumn = styled(Column)`
  width: 100vw;
`

export const FullScreenColumn = styled(Column)`
  width: 100vw;
  min-height: var(--full-display-height);
`

export const JustifiedCenteredRow = styled.div`
  display: flex;
  justify-content: center;
`

export const AlignedCenteredRow = styled.div`
  display: flex;
  align-items: center;
`

export const CenteredColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const FullScreenCenteredColumn = styled(CenteredColumn)`
  width: 100vw;
  min-height: var(--full-display-height);
`

export const FullWidthCenteredColumn = styled(CenteredColumn)`
  width: 100vw;
  padding: 0;
`

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const useFullDisplayHeight = () => {
	const [height, setHeight] = useState(0)
	
	useEffect(() => {
		setHeight(document.documentElement.clientHeight)
		const updateHeight = () => setHeight(document.documentElement.clientHeight)
		window.addEventListener('resize', updateHeight)
		return () => window.removeEventListener('resize', updateHeight)
	}, [])
	
	return height
}

// Differ from the FullScreen... because here the height is window.innerHeight instead of 100vh,
// so you will be able to see the bottom action button with the browser crap.
export const FullDisplayCenteredColumn = ({children, style = {}, ...props}) => {
	const height = useFullDisplayHeight()
	
	return (
		<FullScreenCenteredColumn
			style={{'--full-display-height': height ? `${height}px` : '100vh', ...style}} {...props}>
			{children}
		</FullScreenCenteredColumn>
	)
}

export const FullDisplayColumn = ({children, className}) => {
	const height = useFullDisplayHeight()
	
	return (
		<FullScreenColumn style={{'--full-display-height': `${height}px`}} className={className}>
			{children}
		</FullScreenColumn>
	)
}

export const VideoCallPosition = styled.div`
  position: relative;
  overflow: hidden;
`

export const VideoCallContainer = ({children, className, onClick}) => {
	const height = useFullDisplayHeight()
	
	return (
		<VideoCallPosition style={{height: height}} className={className} onClick={onClick}>
			{children}
		</VideoCallPosition>
	)
}
export const Row = styled.div`
  display: flex;
`
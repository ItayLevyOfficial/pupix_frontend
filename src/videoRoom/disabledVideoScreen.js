import React from 'react'
import styled from 'styled-components'
import {FillAvailableSpace} from '../generalComponents/containers'
import {DisabledVideoIcon} from '../icons/disabledVideoIcon'

export const CenteredContainerFill = styled(FillAvailableSpace)`
  align-items: center;
  justify-content: center;
  display: flex;
`

const DisabledVideoContainer = styled(CenteredContainerFill)`
  background-color: rgba(0, 0, 0, 0.7);
`

export const DisabledVideoScreen = () => {
	return (
		<DisabledVideoContainer>
			<DisabledVideoIcon width='40px'/>
		</DisabledVideoContainer>
	)
}
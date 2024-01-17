import React from 'react'
import styled from 'styled-components'
import {CenteredColumn} from '../../generalComponents/containers'

const CircleButton = styled.button`
  height: 80px;
  width: 80px;
  outline: 0;
  border: 0;
  border-radius: 100%;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.16);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props?.backgroundColor};
`

const IconExplanationText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: ${props => props?.textColor ?? 'white'};
  margin-bottom: 0;
`

export function VideoCallBottomButton({handleClick, bottomText, buttonColor, icon, textColor, style}) {
	return (
		<CenteredColumn style={style}>
			<CircleButton backgroundColor={buttonColor} style={{marginBottom: '10px'}} onClick={handleClick}>
				{icon}
			</CircleButton>
			<IconExplanationText textColor={textColor}>
				{bottomText}
			</IconExplanationText>
		</CenteredColumn>
	)
}
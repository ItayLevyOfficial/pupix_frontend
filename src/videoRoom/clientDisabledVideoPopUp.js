import React from 'react'
import styled from 'styled-components'

const ExplanationDiv = styled.div`
  width: calc(100vw - 40px);
  border-radius: 10px;
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  text-align: center;
  color: white;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  padding: 10px 20px;
`

export const ClientDisabledVideoPopUp = ({isHidden}) => {
	return (
		<ExplanationDiv hidden={isHidden}>
			Your camera & microphone permissions are disabled. <br/>
			Enable camera & microphone in your settings and refresh the page.
		</ExplanationDiv>
	)
}
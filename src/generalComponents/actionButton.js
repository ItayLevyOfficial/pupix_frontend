import styled from 'styled-components'
import * as constants from '../generalHelpers/constants'

export const ActionButtonDimensions = styled.button`
  min-width: 275px;
  width: 80vw;
  max-width: 300px;
  min-height: 50px;
  padding: 5px 0;
  border-radius: 25px;
`

export const ActionButton = styled(ActionButtonDimensions)`
  align-self: center;
  font-size: 22px;
  letter-spacing: 0.3px;
  font-weight: 700;
  border: none;
  outline: none;
  text-align: center;
  background: ${constants.mainGradient};
  color: white;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.16);

  &:disabled {
    box-shadow: none;
    color: rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.02);
  }
`

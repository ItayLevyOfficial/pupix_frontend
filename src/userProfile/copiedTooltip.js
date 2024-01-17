import styled from 'styled-components'
import * as constants from '../generalHelpers/constants'
import {CenteredContainer} from '../generalComponents/containers'

export const CopiedTooltip = styled(CenteredContainer)`
  color: white;
  padding: 0 20px;
  height: 35px;
  margin-bottom: -45px;
  background-color: ${constants.mainTextColor};
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  margin-top: 10px;
  text-align: center;
  vertical-align: middle;
  position: relative;
`
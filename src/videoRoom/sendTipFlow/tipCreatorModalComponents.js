import styled from 'styled-components'
import Modal from 'react-bootstrap/Modal'
import InputGroup from 'react-bootstrap/InputGroup'
import GreenSuccessIcon from '../../icons/greenSuccessIcon.svg'
import DollarIcon from '../../icons/dollarIcon.svg'
import {gentleBlackColor} from '../../generalHelpers/generalStyles'
import Button from 'react-bootstrap/Button'
import {Row} from '../../generalComponents/containers'

export const SizedModal = styled(Modal)`
  & > .modal-dialog > .modal-content {
    margin: 0 auto;
    width: calc(100vw - 80px);
    min-width: 295px;
    align-self: center;
    border-radius: 20px;
  }
`
export const SizedBox = styled.div`
  height: ${props => props.height ?? 0}px;
  width: ${props => props.width ?? 0}px;
  flex: none;
`
export const ModalHeader = styled(Modal.Header)`
  padding-left: 20px;
  border: none;
  padding-bottom: 30px;
`
export const ModalTitle = styled.h1`
  font-size: 22px;
  ${gentleBlackColor};
  font-weight: 500;
  margin: 10px 0 0 10px;
`
export const SmallButton = styled(Button)`
  padding: 6px 15px;
`
export const InputExplanationText = styled.label`
  color: rgba(0, 0, 0, 0.4);
  font-size: 12px;
  line-height: 12px;
  font-weight: normal;
  margin-bottom: 0;
`
export const SizedInputGroup = styled(InputGroup)`
  width: calc(100% - 60px);
  align-self: center;
`
export const PositionedRow = styled(Row)`
  align-self: flex-end;
  margin: 0 30px 20px 0;
`
export const PositionedDollarIcon = styled(DollarIcon)`
  align-self: center;
`
export const PositionedGreenSuccessIcon = styled(GreenSuccessIcon)`
  align-self: center;
`
const ErrorInputText = styled(InputExplanationText)`
  color: red;
  font-weight: bold;
`
export const PositionedErrorText = styled(ErrorInputText)`
  align-self: center;
  margin-bottom: -10px;
  margin-top: 20px;
`
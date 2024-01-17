import styled from 'styled-components'
import {hiddenOverflow} from '../generalComponents/profilePhotoWithLoading'

export const SmallVideoContainer = styled.div`
  width: 75px;
  height: 110px;
  align-self: flex-end;
  margin: 0 20px 40px auto;
  object-fit: cover;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.16);
  border-radius: 13px;
  ${hiddenOverflow};
`
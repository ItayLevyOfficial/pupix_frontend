import styled, {css} from 'styled-components'
import * as constants from '../generalHelpers/constants'

export const PageAnimation = styled.div`
  transform: var(--page-animation-transform);
  transition: var(--page-animation-transition);
  position: fixed;
  height: 100%;
  width: 100vw;
  overflow-y: scroll;
`

export const NewPageAnimation = css`
  transform: ${props => props.currentLevel > props.level ? 'translateX(-100vw)' :
          props.currentLevel < props.level ? 'translateX(100vw)' : 'none'};
  transition: ${props => props.isBackMove ? 'none' : `transform ${constants.pageSlideAnimationDuration}`};
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  position: absolute;
  top: 0;
  left: 0;
`
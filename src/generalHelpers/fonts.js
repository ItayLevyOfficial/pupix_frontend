import styled from 'styled-components'

export const ExplanationText = styled.p`
  font-size: 18px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: normal;
  letter-spacing: 0.2px;
  line-height: 1.3;
  margin-bottom: 0;
`

export const SmallExplanationText = styled(ExplanationText)`
  font-size: 16px;
`

export const CenteredSmallExplanationText = styled(SmallExplanationText)`
  text-align: center;
  line-height: 24px;
`
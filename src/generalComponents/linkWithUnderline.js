import styled from 'styled-components'
import Link from 'next/link'
import React from 'react'

export const AWithUnderLine = styled.a`
  text-decoration: underline;
  color: inherit;

  &:hover {
    color: inherit;
  }
`

export const LinkWithUnderLine = ({href, ...props}) => {
	return (
		<Link href={href} passHref>
			<AWithUnderLine {...props}/>
		</Link>
	)
}
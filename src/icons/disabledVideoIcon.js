import React from 'react'

export const DisabledVideoIcon = ({width, height, ...props}) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width ?? '100%'} height={height ?? '100%'} {...props}
		     viewBox="0 0 60 47.996">
			<path id="Icon_awesome-video-slash" data-name="Icon awesome-video-slash"
			      d="M59.42,42.947l-5.156-3.984A2.953,2.953,0,0,0,57,36.047V11.953a3,3,0,0,0-4.725-2.419L42,16.622V29.484l-3-2.316V10.481A4.481,4.481,0,0,0,34.519,6h-22.9L4.265.318A1.506,1.506,0,0,0,2.156.581L.318,2.943a1.494,1.494,0,0,0,.263,2.1L4,7.687,39,34.744,55.735,47.682a1.506,1.506,0,0,0,2.109-.263l1.838-2.372a1.486,1.486,0,0,0-.263-2.1ZM3,37.519A4.481,4.481,0,0,0,7.481,42H34.519a4.448,4.448,0,0,0,2.775-.984L3,14.5Z"
			      transform="translate(-0.002 -0.002)" fill="#fff"/>
		</svg>
	)
}
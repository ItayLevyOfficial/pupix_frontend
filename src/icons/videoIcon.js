import React from 'react'

export const VideoIcon = ({width, height, ...props}) => {
	return <svg xmlns="http://www.w3.org/2000/svg" width={width ?? '100%'} height={height ?? '100%'} {...props}
	            viewBox="0 0 70 46.667">
		<path id="Icon_awesome-video" data-name="Icon awesome-video"
		      d="M40.858,4.5H5.809A5.809,5.809,0,0,0,0,10.309V45.358a5.809,5.809,0,0,0,5.809,5.809H40.858a5.809,5.809,0,0,0,5.809-5.809V10.309A5.809,5.809,0,0,0,40.858,4.5ZM63.875,9.082,50.556,18.269V37.4l13.319,9.175A3.9,3.9,0,0,0,70,43.437V12.217A3.9,3.9,0,0,0,63.875,9.082Z"
		      transform="translate(0 -4.5)" fill="#fff"/>
	</svg>
}
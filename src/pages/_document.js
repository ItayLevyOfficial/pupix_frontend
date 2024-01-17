import Document, {Head, Html, Main, NextScript} from 'next/document'
import {ServerStyleSheet} from 'styled-components'
import React from 'react'

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet()
		const originalRenderPage = ctx.renderPage
		
		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: (App) => (props) =>
						sheet.collectStyles(<App {...props} />),
				})
			
			const initialProps = await Document.getInitialProps(ctx)
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				),
			}
		} finally {
			sheet.seal()
		}
	}
	
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta charSet="utf-8"/>
					<meta name="twitter:card" content="summary"/>
					<meta name="twitter:title" content="Pupix"/>
					<meta name="twitter:description" content="Video sessions are made simple."/>
					<meta name="twitter:image"
					      content="https://firebasestorage.googleapis.com/v0/b/pupik-897d8.appspot.com/o/pupik_square_icon.jpg?alt=media&token=0a55bbf5-4a14-4fa1-97c8-b65482d9afa5"/>
					<meta property="og:type" content="website"/>
					<meta property="og:title" content="Pupix"/>
					<meta property="og:description" content="Video sessions are made simple."/>
					<meta property="og:image" content="/pupik_square_icon.jpg"/>
					<meta name='format-detection' content='telephone=no'/>
					<link rel="icon" href="/favicon.svg"/>
					<link rel="shortcut icon" href="/pupikSearchIcon.png"/>
					<link rel="apple-touch-icon" href="/favicon.svg"/>
					<meta name="theme-buttonColor" content="#000000"/>
					<link rel="manifest" href="/manifest.json"/>
					<meta name="google" content="notranslate"/>
				</Head>
				<body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<Main/>
				<NextScript/>
				</body>
			</Html>
		)
	}
}

export default MyDocument
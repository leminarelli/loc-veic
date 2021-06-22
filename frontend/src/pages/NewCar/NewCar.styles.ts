import styled from 'styled-components'

// interface ContainerProps {}

export const Container = styled.div`
	width: 100%;
	max-width: 1120px;
	height: 100vh;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: center;
	section {
		p {
			font-size: 18px;
			color: #737380;
			line-height: 32px;
		}
	}
	form {
		width: 100%;
		max-width: 450px;
		textarea {
			margin-top: 6px;
		}
		input {
			margin-top: 6px;
		}
	}
`

export const Content = styled.div`
	width: 100%;
	padding: 96px;
	background: #f0f0f5;
	box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
	border-radius: 8px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	section {
		width: 100%;
		max-width: 380px;
		h1 {
			margin: 64px 0 32px;
			font-size: 32 px;
		}
		p {
			font-size: 18px;
			color: #737380;
			line-height: 32px;
		}
	}
`

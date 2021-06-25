import styled from 'styled-components'

// interface ContainerProps {}

export const Container = styled.div`
	width: 100%;
	max-width: 1180px;
	padding: 0 30px;
	margin: 32px auto;
	h1 {
		margin-top: 80px;
		margin-bottom: 24px;
	}
`

export const Card = styled.ul`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap: 24px;
	list-style: none;
	cursor: pointer;
	.car-item {
		max-width: 100%;
		margin: 20px 0px;
	}
	li {
		background: #fff;
		padding: 24px;
		border-radius: 8px;
		position: relative;
		:hover {
			background: #ffffff69;
		}
		button {
			background: #fff;
			position: absolute;
			right: 24px;
			top: 24px;
			border: 0;
			:hover {
				opacity: 0.8;
				background: #ffffff69;
			}
		}
		label {
			color: #3b3939;
			font-size: 14px;
			font-weight: 400;
			text-decoration: none;
		}
	}
`

export const Title = styled.p`
	color: #ff5757;
	text-align: center;
	margin-bottom: 20px;
	font-size: 18px;
	font-weight: 500;
`

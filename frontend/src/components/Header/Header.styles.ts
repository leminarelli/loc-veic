import styled from 'styled-components'

export const HeaderContent = styled.div`
	display: flex;
	align-items: center;
	span {
		font-size: 20px;
		margin-left: 24px;
	}
	img {
		height: 64px;
	}
	a {
		width: 260px;
		margin-left: auto;
		margin-top: 0;
	}
	button {
		height: 60px;
		width: 60px;
		border-radius: 4px;
		border: 1px solid #ff5757;
		background: transparent;
		margin-left: 16px;
		transition: border-color 0.2s;
		:hover {
			border-color: #999;
		}
	}
`

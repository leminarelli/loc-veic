import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower } from 'react-icons/fi'
import { HeaderContent } from './Header.styles'
import logopng from '../../assets/logo.png'

export const Header = (props: any) => {
	const userName = localStorage.getItem('userName')

	const history = useHistory()
	function handleLogout() {
		localStorage.clear()

		history.push('/')
	}
	return (
		<HeaderContent>
			<img src={logopng} alt="Minarelli - Aluguel de Carros" />
			<span> Olá, {userName} </span>

			<Link className="button" to="/cars/new">
				Cadastrar novo carro
			</Link>
			<button onClick={handleLogout} type="button">
				<FiPower size={18} color="#f99988" />
			</button>
		</HeaderContent>
	)
}

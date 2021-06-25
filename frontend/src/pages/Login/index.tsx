import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import { FormProvider, useForm } from 'react-hook-form'

import { Container } from './Login.styles'
import api from '../../services/api'

import carpng from '../../assets/car.png'
import logopng from '../../assets/logo.png'

export default function Login() {
	const history = useHistory()

	async function handleLogin(email: any) {
		try {
			const response = await api.post('session', email)

			localStorage.setItem('userEmail', response.data.email)
			localStorage.setItem('userName', response.data.name)

			history.push('/dashboard')
		} catch (err) {
			history.push('/register', { newsUser: email })
		}
	}

	const fMethods = useForm()
	return (
		<Container>
			<section>
				<img src={logopng} alt="Minarelli - Aluguel de Carros" />
				<FormProvider {...fMethods}>
					<form onSubmit={fMethods.handleSubmit(handleLogin)}>
						<h1> Faça o seu Login! </h1>
						<input
							placeholder="Seu e-mail"
							{...fMethods.register('email', {
								required: true,
							})}
						/>
						<button className="button" type="submit">
							Entrar
						</button>
						<Link className="back-link" to="/register">
							<FiLogIn size={16} color="#ff5757" />
							Não tenho cadastro!
						</Link>
					</form>
				</FormProvider>
			</section>

			<img src={carpng} alt="Cars" />
		</Container>
	)
}

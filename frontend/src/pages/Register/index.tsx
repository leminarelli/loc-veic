import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { FormProvider, useForm } from 'react-hook-form'

import api from '../../services/api'

import { Container, Content, InputGroup } from './Register.styles'
import logopng from '../../assets/logo.png'

export default function Register(props: any) {
	const history = useHistory()

	async function handleRegister(data: any) {
		try {
			await api.post('user', data)

			alert('Conta criada com sucesso!')
			history.push('/')
		} catch (err) {
			alert('Erro no cadastro. Tente novamente!')
			console.log(err)
		}
	}

	const fMethods = useForm()

	return (
		<Container>
			<Content>
				<section>
					<img src={logopng} alt="Minarelli - Aluguel de Carros" />

					<h1> Cadastro </h1>
					<p>Faça seu cadastro e chegue no seu destino com segurança!</p>

					<Link className="back-link" to="/">
						<FiArrowLeft size={16} color="#ff5757" />
						Voltar
					</Link>
				</section>

				<FormProvider {...fMethods}>
					<form onSubmit={fMethods.handleSubmit(handleRegister)}>
						<h1>
							{props.location.state &&
								props.location.state.newsUser.email &&
								'Não encontramos seu e-mail, vamos criar sua conta?'}
						</h1>

						<input
							placeholder="Nome"
							{...fMethods.register('name', {
								required: true,
							})}
						/>

						<input
							placeholder="E-mail"
							defaultValue={
								props.location.state && props.location.state.newsUser.email
									? props.location.state.newsUser.email
									: ''
							}
							{...fMethods.register('email', {
								required: true,
							})}
						/>

						<input
							placeholder="Telefone"
							{...fMethods.register('phone', {
								required: true,
							})}
						/>

						<InputGroup>
							<input
								placeholder="Cidade"
								{...fMethods.register('city', {
									required: true,
								})}
							/>

							<input
								placeholder="UF"
								{...fMethods.register('uf', {
									required: true,
								})}
								style={{ width: 80 }}
							/>
						</InputGroup>

						<button className="button" type="submit">
							Cadastrar
						</button>
					</form>
				</FormProvider>
			</Content>
		</Container>
	)
}

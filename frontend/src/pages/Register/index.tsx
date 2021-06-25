import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import api from '../../services/api'

import { Container, Content, InputGroup } from './Register.styles'
import logopng from '../../assets/logo.png'

export default function Register(props: any) {
	const schema = yup.object().shape({
		name: yup
			.string()
			.min(2)
			.required('Campo obrigatório, por favor informe o nome'),
		email: yup
			.string()
			.email()
			.min(3)
			.required('Campo obrigatório, por favor informe o e-mail'),
		phone: yup
			.string()
			.min(3)
			.required('Campo obrigatório, por favor informe o telefone'),
		city: yup
			.string()
			.min(3)
			.required('Campo obrigatório, por favor informe a cidade'),
		uf: yup
			.string()
			.min(2)
			.required('Campo obrigatório, por favor informe estado'),
	})
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

	const fMethods = useForm({ resolver: yupResolver(schema) })
	const { errors } = fMethods.formState

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
						<p>{errors.name?.message}</p>

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

						<p>{errors.email?.message}</p>

						<input
							placeholder="Telefone"
							{...fMethods.register('phone', {
								required: true,
							})}
						/>
						<p>{errors.phone?.message}</p>
						<InputGroup>
							<input
								placeholder="Cidade"
								{...fMethods.register('city', {
									required: true,
								})}
							/>
							<p>{errors.city?.message}</p>
							<input
								placeholder="UF"
								{...fMethods.register('uf', {
									required: true,
								})}
								style={{ width: 80 }}
							/>
							<p>{errors.uf?.message}</p>
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

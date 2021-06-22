import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { FormProvider, useForm } from 'react-hook-form'

import api from '../../services/api'

import './styles.css'
import logopng from '../../assets/logo.png'

export default function Register() {
	const history = useHistory()

	async function handleRegister(data: any) {
		try {
			const response = await api.post('user', data)

			alert(`Seu ID de acesso: ${response.data.id}`)

			history.push('/')
		} catch (err) {
			alert('Erro no cadastro. Tente novamente!')
			console.log(err)
		}
	}

	const fMethods = useForm()
	// const fErros = fMethods.formState.errors
	// const fDirtyFields = fMethods.formState.dirtyFields

	return (
		<div className="register-container">
			<div className="content">
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
						<input
							placeholder="Nome"
							{...fMethods.register('name', {
								required: true,
							})}
						/>

						<input
							placeholder="E-mail"
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

						<div className="input-group">
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
						</div>

						<button className="button" type="submit">
							Cadastrar
						</button>
					</form>
				</FormProvider>
			</div>
		</div>
	)
}

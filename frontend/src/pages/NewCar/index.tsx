import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { FormProvider, useForm } from 'react-hook-form'

import api from '../../services/api'
import './styles.css'
import logopng from '../../assets/logo.png'

export default function CarRent() {
	const history = useHistory()
	const userId = localStorage.getItem('userId')

	async function handleNewCar(data: any) {
		try {
			await api.post('cars', data, {
				headers: {
					Authorization: userId,
				},
			})
			history.push('/dashboard')
		} catch (err) {
			alert('Erro no cadastro do carro! Tente Novamente!')
		}
	}
	const fMethods = useForm()
	// const fErros = fMethods.formState.errors
	// const fDirtyFields = fMethods.formState.dirtyFields

	return (
		<div className="new-car-container">
			<div className="content">
				<section>
					<img src={logopng} alt="Minarelli - Aluguel de Carros" />
					<h1>Cadastro de veículo </h1>
					<p>Insira os dados do veículo:</p>
					<Link className="back-link" to="/dashboard">
						<FiArrowLeft size={16} color="#ff5757" />
						Voltar para Home
					</Link>
				</section>
				<FormProvider {...fMethods}>
					<form onSubmit={fMethods.handleSubmit(handleNewCar)}>
						<input
							placeholder="Carro / Modelo"
							{...fMethods.register('model', {
								required: true,
							})}
						/>

						<input
							placeholder="Ano"
							{...fMethods.register('year', {
								required: true,
							})}
						/>

						<input
							placeholder="Valor"
							{...fMethods.register('price', {
								required: true,
							})}
						/>

						<input
							placeholder="Local de retirada"
							{...fMethods.register('city', {
								required: true,
							})}
						/>

						<textarea
							placeholder="Descrição"
							{...fMethods.register('description', {
								required: true,
							})}
						/>

						<button className="button" type="submit">
							Cadastrar
						</button>
					</form>
				</FormProvider>
			</div>
		</div>
	)
}

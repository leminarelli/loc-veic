import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { FormProvider, useForm } from 'react-hook-form'
import { Container, Content } from './NewCar.styles'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import api from '../../services/api'
import logopng from '../../assets/logo.png'

export default function CarRent() {
	const schema = yup.object().shape({
		model: yup
			.string()
			.min(3)
			.required('Campo obrigatório, por favor informe o modelo'),
		color: yup
			.string()
			.min(3)
			.required('Campo obrigatório, por favor informe a cor'),
		quilometragem: yup
			.string()
			.min(3)
			.required('Campo obrigatório, por favor informe a quilometragem'),
		year: yup
			.string()
			.min(3)
			.required('Campo obrigatório, por favor informe o ano do veículo'),
		price: yup
			.string()
			.min(3)
			.required('Campo obrigatório, por favor informe o preço da reserva'),
		city: yup
			.string()
			.min(3)
			.required('Campo obrigatório, por favor informe o local para retirada'),
		description: yup.string(),
	})
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
	const fMethods = useForm({ resolver: yupResolver(schema) })
	const { errors } = fMethods.formState

	return (
		<Container>
			<Content>
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
						<p>{errors.model?.message}</p>

						<input
							placeholder="Cor"
							{...fMethods.register('color', {
								required: true,
							})}
						/>
						<p>{errors.color?.message}</p>

						<input
							placeholder="Quilometragem"
							{...fMethods.register('quilometragem', {
								required: true,
							})}
						/>
						<p>{errors.quilometragem?.message}</p>

						<input
							placeholder="Ano"
							{...fMethods.register('year', {
								required: true,
							})}
						/>
						<p>{errors.year?.message}</p>

						<input
							placeholder="Valor"
							{...fMethods.register('price', {
								required: true,
							})}
						/>
						<p>{errors.price?.message}</p>

						<input
							placeholder="Local de retirada"
							{...fMethods.register('city', {
								required: true,
							})}
						/>
						<p>{errors.city?.message}</p>

						<textarea
							placeholder="Descrição"
							{...fMethods.register('description', {
								required: true,
							})}
						/>
						<p>{errors.description?.message}</p>

						<button className="button" type="submit">
							Cadastrar
						</button>
					</form>
				</FormProvider>
			</Content>
		</Container>
	)
}

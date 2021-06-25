import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { FormProvider, useForm } from 'react-hook-form'

import api from '../../services/api'
import logopng from '../../assets/logo.png'
import carprentng from '../../assets/img1.jpeg'
import { Container, Content } from './CarRent.styles'

export default function CarRent(props: any) {
	const history = useHistory()
	const userId = localStorage.getItem('userId')

	async function handleNewCar(e: { preventDefault: () => void }, data: any) {
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
	useEffect(() => {
		if (props.location.state && props.location.state.carInfo) {
			const {
				model,
				year,
				color,
				quilometragem,
				price,
				city,
				description,
			} = props.location.state.carInfo
			fMethods.setValue('model', model)
			fMethods.setValue('year', year)
			fMethods.setValue('color', color)
			fMethods.setValue('quilometragem', quilometragem)
			fMethods.setValue('price', price)
			fMethods.setValue('city', city)
			fMethods.setValue('description', description)
		}
	}, [fMethods, props.location.state])

	return (
		<Container>
			<Content>
				<section>
					<img src={logopng} alt="Minarelli - Aluguel de Carros" />
					<h1> Reserva de veículo: </h1>
					<p>{props.location.state.carInfo.model}</p>
					<img className="car-item" src={carprentng} alt={props.location.state.carInfo.model} />

					<Link className="back-link" to="/dashboard">
						<FiArrowLeft size={16} color="#ff5757" />
						Voltar para Home
					</Link>
				</section>
				<FormProvider {...fMethods}>
					<form onSubmit={fMethods.handleSubmit(handleNewCar)}>

						<input
							placeholder="Carro / Modelo"
							readOnly
							{...fMethods.register('model', {
								required: true,
							})}
						/>

						<input
							placeholder="Ano"
							readOnly
							{...fMethods.register('year', {
								required: true,
							})}
						/>

						<input
							placeholder="Cor"
							readOnly
							{...fMethods.register('color', {
								required: true,
							})}
						/>

						<input
							placeholder="Quilometragem"
							readOnly
							{...fMethods.register('quilometragem', {
								required: true,
							})}
						/>

						<input
							placeholder="Valor"
							readOnly
							{...fMethods.register('price', {
								required: true,
							})}
							type="value"
						/>

						<input
							placeholder="Local de retirada"
							readOnly
							{...fMethods.register('city', {
								required: true,
							})}
						/>

						<textarea
							placeholder="Descrição"
							readOnly
							{...fMethods.register('description', {
								required: true,
							})}
						/>

						<button className="button" type="submit">
							Reservar veículo
						</button>
					</form>
				</FormProvider>
			</Content>
		</Container>
	)
}

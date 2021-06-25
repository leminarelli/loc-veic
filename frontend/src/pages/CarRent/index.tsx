import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { FormProvider, useForm } from 'react-hook-form'

import api from '../../services/api'
import logopng from '../../assets/logo.png'
import carprentng from '../../assets/1.jpeg'
import { Container, Content } from './CarRent.styles'
import { Cars } from '../../models/Cars'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
	name: yup.string().required('Campo obrigatório, por favor informe o nome'),
	document: yup.string().required('Campo obrigatório, por favor informe o documento'),
	dateStart: yup.string().required('Campo obrigatório, por favor informe a data'),
	dateEnd: yup
		.string()
		.required('Campo obrigatório, por favor informe a data')
		.test(
			`match`,
			`Data fim não pode ser menor que a data de inicio`,
			(dateEnd, { parent }) => {
				return (dateEnd && dateEnd > parent.dateStart) || false
			}
		),
})

export default function CarRent(props: any) {
	const [car, setCar] = useState<Cars>()
	const [messageSucess, setMessageSucess] = useState<string>("")
	const userId = localStorage.getItem('userId')

	async function onSubmit(data: any) {
		try {
			await api.post('reservation', data, {
				headers: {
					Authorization: userId,
				},
			})
			setMessageSucess("Reserva realizada com sucesso!")
			fMethods.reset()
		} catch (err) {
			alert('Erro no cadastro do carro! Tente Novamente!')
		}
	}
	const fMethods = useForm({ resolver: yupResolver(schema) })
	useEffect(() => {
		if (props.location.state && props.location.state.carInfo) {
			setCar(props.location.state.carInfo)
		}
	}, [fMethods, props.location.state])

	const { errors } = fMethods.formState

	return (
		<Container>
			<Content>
				<section>
					<img src={logopng} alt="Minarelli - Aluguel de Carros" />
					<h1> Reserva de veículo: </h1>

					{car && (
						<>
							<ul>
								<li>
									{`${car?.model}`} / {`${car?.color}`}
								</li>
								<li>{car?.quilometragem}</li>
								<li>{car?.description}</li>
								<li>R$ {car?.price}</li>
								<li>id: {car?.id}</li>
							</ul>
						</>
					)}

					<Link className="back-link" to="/dashboard">
						<FiArrowLeft size={16} color="#ff5757" />
						Voltar para Home
					</Link>
				</section>
				<FormProvider {...fMethods}>
					<form onSubmit={fMethods.handleSubmit(onSubmit)}>
						<img
							className="car-item"
							src={carprentng}
							alt={props.location.state.carInfo.model}
						/>
						{messageSucess.length > 0 && <h3>{messageSucess}</h3>}
						<input
							placeholder="Nome do cliente"
							{...fMethods.register('name')}
						/>
						<p>{errors.name?.message}</p>

						<input placeholder="CPF" {...fMethods.register('document')} />
						<p>{errors.document?.message}</p>

						<input
							type="date"
							placeholder="Data de inicio da reserva"
							{...fMethods.register('dateStart')}
						/>
						<p>{errors.dateStart?.message}</p>

						<input
							type={'date'}
							placeholder="Data de devolucao"
							{...fMethods.register('dateEnd')}
						/>
						<p>{errors.dateEnd?.message}</p>
						<button className="button" type="submit">
							Reservar veículo
						</button>
					</form>
				</FormProvider>
			</Content>
		</Container>
	)
}

import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { FormProvider, useForm } from 'react-hook-form'

import api from '../../services/api'
import logopng from '../../assets/logo.png'
import carprentng from '../../assets/img1.jpeg'
import { Container, Content } from './CarRent.styles'
import { Cars } from '../../models/Cars';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
	name: yup.string().required(),
	document: yup.number().required(),
	dateStart: yup.date().required(),
	dateEnd: yup.date().required().test(`match`, `Data fim nao pode ser menor que a data de inicio`, (dateEnd, { parent }) => {

		console.log(dateEnd);
		console.log(parent.dateStart)

		return false
	}),
});

export default function CarRent(props: any) {

	const [car, setCar] = useState<Cars>()
	const history = useHistory()
	const userId = localStorage.getItem('userId')

	async function onSubmit(data: any) {


		alert(JSON.stringify(data));

		/* try {
			await api.post('cars', data, {
				headers: {
					Authorization: userId,
				},
			})
			history.push('/dashboard')
		} catch (err) {
			alert('Erro no cadastro do carro! Tente Novamente!')
		} */
	}
	const fMethods = useForm({ resolver: yupResolver(schema) })
	useEffect(() => {
		if (props.location.state && props.location.state.carInfo) {
			setCar(props.location.state.carInfo)
		}
	}, [fMethods, props.location.state])

	return (
		<Container>
			<Content>
				<section>
					<img src={logopng} alt="Minarelli - Aluguel de Carros" />
					<h1> Reserva de veículo: </h1>

					{car &&
						<>
							<ul>
								<li>{`${car?.model}`} / {`${car?.color}`}</li>
								<li>{car?.quilometragem}</li>
								<li>{car?.description}</li>
								<li>R$ {car?.price}</li>
								<li>id: {car?.id}</li>
							</ul>
						</>
					}


					<Link className="back-link" to="/dashboard">
						<FiArrowLeft size={16} color="#ff5757" />
						Voltar para Home
					</Link>
				</section>
				<FormProvider {...fMethods}>
					<form onSubmit={fMethods.handleSubmit(onSubmit)}>
						<img className="car-item" src={carprentng} alt={props.location.state.carInfo.model} />

						<input
							placeholder="Nome do cliente"
							{...fMethods.register('name')}
						/>

						<input
							placeholder="CPF"
							{...fMethods.register('document')}
						/>


						<input
							type="date"
							placeholder="Data de inicio da reserva"
							{...fMethods.register('dateStart')}
						/>

						<input
							type={"date"}
							placeholder="Data de devolucao"
							{...fMethods.register('dateEnd')}
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

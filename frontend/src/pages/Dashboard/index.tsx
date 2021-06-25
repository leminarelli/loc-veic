import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { FiTrash2 } from 'react-icons/fi'

import { Container, Title, Card } from './Dashboard.styles'

import api from '../../services/api'

import { Cars } from '../../models/Cars'
import { Header } from '../../components/Header'

import carprentng from '../../assets/1.jpeg'

export default function Dashboard() {
	const [cars, setCars] = useState([])
	const history = useHistory()

	const userId = localStorage.getItem('userId')

	useEffect(() => {
		api
			.get('profile', {
				headers: {
					Authorization: userId,
				},
			})
			.then((response) => {
				setCars(response.data)
			})
	}, [userId])

	async function handleDeleteCar(id: any) {
		try {
			await api.delete(`cars/${id}`, {
				headers: {
					Authorization: userId,
				},
			})

			setCars(cars.filter((car: { id: any }) => car.id !== id))
		} catch (err) {
			alert('Erro ao deletar este carro, tente novamente!')
		}
	}

	return (
		<Container>
			<Header />

			<h1> Carros Cadastrados</h1>
			<Card>
				{cars.map((car: Cars) => (
					<li key={car.id} onClick={() => history.push(`/cars/rent/${car.id}`, { carId: car.id, carInfo: car })}>
						<Title> CARRO DISPONÍVEL PARA LOCAÇÃO </Title>
						<img className="car-item" src={carprentng} alt={car.model} />

						<p>
							MODELO: <label> {car.model} </label>
						</p>

						<p>
							ANO: <label> {car.year} </label>
						</p>

						<p>
							DESCRIÇÃO: <label> {car.description} </label>
						</p>

						<p>
							CIDADE: <label> {car.city} </label>
						</p>

						<p>
							VALOR:
							<label>
								{Intl.NumberFormat('pr-BR', {
									style: 'currency',
									currency: 'BRL',
								}).format(car.price)}
							</label>
						</p>

						<button onClick={() => handleDeleteCar(car.id)} type="button">
							<FiTrash2 size={18} color="#a8a8b3" />
						</button>
					</li>
				))}
			</Card>
		</Container>
	)
}

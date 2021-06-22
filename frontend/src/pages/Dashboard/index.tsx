import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import './styles.css'

import api from '../../services/api'

import logopng from '../../assets/logo.png'
import { Cars } from '../../models/Cars'

export default function Dashboard() {
	const [cars, setCars] = useState([])

	const userId = localStorage.getItem('userId')
	const userName = localStorage.getItem('userName')

	const history = useHistory()

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

	function handleLogout() {
		localStorage.clear()

		history.push('/')
	}

	return (
		<div className="profile-container">
			<header>
				<img src={logopng} alt="Minarelli - Aluguel de Carros" />
				<span> Olá, {userName} </span>

				<Link className="button" to="/cars/new">
					Cadastrar novo carro
				</Link>
				<button onClick={handleLogout} type="button">
					<FiPower size={18} color="#f99988" />
				</button>
			</header>

			<h1> Carros Cadastrados</h1>
			<ul>
				{cars.map((car: Cars) => (
					<li key={car.id}>
						<p className="title"> CARRO DISPONÍVEL PARA LOCAÇÃO </p>

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
			</ul>
		</div>
	)
}

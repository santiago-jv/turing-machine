
import './App.css';
import { useEffect, useRef, useState } from "react"
import { words } from "./constants/constants"

import Header from './components/header/Header.jsx';
import { elementsProperties } from './constants/constants';
import Element from './components/element/Element';


function App() {
	let count = 0
	const [language, setLanguage] = useState("spanish")
	const [string, setString] = useState("")
	const string2 = useRef()
	const elements = useRef()
	const characters = useRef()
	const headband = useRef()
	const [speed, setSpeed] = useState(500)
	const [isAnimating, setIsAnimating] = useState(false)
	const currentString = useRef()
	let centerDistance = window.innerWidth / 2;
	const [error, setError] = useState("")

	window.addEventListener('resize', () => {
		centerDistance = window.innerWidth / 2
		console.log(centerDistance)
	})

	const animateElement = async (index) => {
		return new Promise((resolve) => {
			const element = elements.current[index]
			element.animate([
				{ transform: 'scale(1)' },
				{ transform: 'scale(1.08)' },
				{ transform: 'scale(1)' }
			], { duration: speed });

			setTimeout(() => {
				resolve()
			}, speed)
		})
	}
	
	const animateCurrentChart = () => {
		const characterElement = characters.current[count]		
		const leftDistance = characterElement.offsetWidth * count

		headband.current.style.transition = `${speed}ms ease right`
		headband.current.style.right = leftDistance + "px"
		characterElement.animate([
			{ transform: 'translateY(0)' },
			{ transform: 'translateY(-1rem)' },
			{ transform: 'translateY(0)' }
		], { duration: speed });


	}
	const start = async () => {
		window.scroll({
			top: document.body.scrollHeight,
			behavior: 'smooth'
		})
		string2.current = " " + string2.current 
		setString(string2.current)
		setIsAnimating(true)
		count = 0
		await state_1()
		setIsAnimating(false)
	}

	const isNotOutRange = () => string2.current.length > count

	const state_1 = async () => {
		await animateElement(0)

		if (isNotOutRange()) {
			animateCurrentChart()
			if(string2.current[count] === 'b'){
				let newString = string2.current.replace('b', 'a')
				string2.current = newString
				setString(newString)
				await animateElement(1)
			}	
			else if (string2.current[count] === 'a') await animateElement(2)	
			else  await animateElement(3)
			count++
			await state_1()
		}
		else {
			count--;
			await animateElement(4)
			await state_2()
		}
	}

	const state_2 = async () => {

		count--;
		await animateElement(5)
		if(count >= 0) {
	 		animateCurrentChart()
			
			if(string2.current[count] === 'a') await animateElement(6)
			else await animateElement(7)
			await state_2()
		}
		else{
			count = 1
			animateCurrentChart()
			await animateElement(8)
			await state_3()
		}

	}

	const state_3 = async () => {
		await animateElement(9)
	}

	const handleInputChange = (event) => {
		setError("")
		setString(event.target.value)
		string2.current = event.target.value
	}

	const verify = (event) => {
		event.preventDefault()	
		setString(currentString.current.value.trim() + " ")
		string2.current = currentString.current.value + " "
		if (new RegExp("^[a-b ]*$").test(string2.current.trim())) start()

		else setError(words[language].error)

	}
	const changeLanguage = (language) => setLanguage(language)
	useEffect(() => {
		if(error) setError(words[language].error)
	}, [language,error])

	useEffect(() => {
		elements.current = document.querySelectorAll('.element')
		headband.current = document.querySelector('.headband')
	}, [])

	useEffect(() => {
		characters.current = document.querySelectorAll('.character')

	}, [string])

	return (
		<>
			<Header  changeLanguage={changeLanguage} language={language} />
			<main>
				<form onSubmit={verify}>
					<div className="form-group">
						<label htmlFor="text">{words[language].labelString}</label>
						<input ref={currentString}  id="text" onChange={handleInputChange} type="text" />										
						<div className="input-error">
							<p>{error}</p>
						</div>
					</div>

					<div className="form-group">
						<label htmlFor="speed">{words[language].labelSpeed}</label>
						<input type="range" min="200" max="1500" value={speed} onChange={(event) => setSpeed(Number(event.target.value))} step="100" />

						<p className="speed-info">{words[language].currentSpeed} {speed} ms</p>
					</div>

					<button disabled={isAnimating} type="submit">{words[language].textButton}</button>
				</form>


				<div className="automata">
					{elementsProperties.map((elementProperties, index) => (
						<Element key={index} id={elementProperties.id} image={elementProperties.image} />
					))}
				</div>

				<div className="headband-container">
					<div className="headband">
						{Array.from(string).map((character, index) => (
							<div key={index} className={"character"} style={{ width: 100 / string.length + "%" }}>
								<p>{character}</p>
							</div>
						))}
					</div>
				</div>
			</main>
		</>
	);
}

export default App;

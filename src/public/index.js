document.addEventListener("contextmenu", mouseRightButton => mouseRightButton.preventDefault())

const aircraft = document.getElementById("aircraft")
const nameOfTheGame = document.getElementById("name-of-the-game")
const life = document.getElementById("life")
const mainMenu = document.getElementById("main-menu")
const scenario = document.getElementById("scenario")
const score = document.getElementById("score")
const startGame = document.getElementById("start-game")

const soundtrack = new Audio("/src/audio/soundtrack.mp3")

const scenarioWidth = scenario.offsetWidth
const scenarioHeight = scenario.offsetHeight

const aircraftWidth = aircraft.offsetWidth
const aircraftHeight = aircraft.offsetHeight

/**
 * @description Speed of your aircraft */
let aircraftSpeed = 30

/**
 * @description Speed of your enemy aircraft */
let enemySpeed = 10

/**
 * @description Projectile speed (shot) */
let shotSpeed = enemySpeed * 2

/**
 * @description Your current life */
let currentLife = 100

/**
 * @description Enemy aircraft life */
let enemyLife = 5

/**
 * @description Amount of health you lose when taking damage from enemy aircraft
 */
let decreaseLife = 5

let isShooting = false
let isPaused = false
let isGameOver = false
let lowLifeSoundReproduced = false

let currentShot = 0
let currentScore = 0
let enemySpawnTimer = 0
let horizontalPosition = scenarioWidth / 2 - 50
let verticalPosition = scenarioHeight - aircraftHeight
let horizontalDirection = 0
let verticalDirection = 0

let aircraftMovimentEvent
let shotMovimentEvent
let enemyMovimentEvent
let collisionEvent
let createEnemyEvent
let shootEvent

const controls = {
	"ArrowUp": {
		vertical: -1,
		horizontal: 0
	},
	"W": {
		vertical: -1,
		horizontal: 0
	},
	"w": {
		vertical: -1,
		horizontal: 0
	},

	"ArrowDown": {
		vertical: 1,
		horizontal: 0
	},
	"S": {
		vertical: 1,
		horizontal: 0
	},
	"s": {
		vertical: 1,
		horizontal: 0
	},

	"ArrowLeft": {
		vertical: 0,
		horizontal: -1
	},
	"A": {
		vertical: 0,
		horizontal: -1
	},
	"a": {
		vertical: 0,
		horizontal: -1
	},

	"ArrowRight": {
		vertical: 0,
		horizontal: 1
	},
	"D": {
		vertical: 0,
		horizontal: 1
	},
	"d": {
		vertical: 0,
		horizontal: 1
	}
}

const pressedKey = keyboard => {
	const controlsMap = controls[keyboard.key]

	if (controlsMap) {
		verticalDirection = controlsMap.vertical
		horizontalDirection = controlsMap.horizontal
	}
}

const releaseKey = keyboard => {
	const controlsMap = controls[keyboard.key]

	if (controlsMap) {
		verticalDirection = 0
		horizontalDirection = 0
	}
}

const aircraftMoviment = () => {
	horizontalPosition += horizontalDirection * aircraftSpeed
	verticalPosition += verticalDirection * aircraftSpeed

	horizontalPosition = Math.max(0, Math.min(horizontalPosition, Math.floor((scenarioWidth - aircraftWidth))))
	verticalPosition = Math.max(0, Math.min(verticalPosition, Math.floor((scenarioHeight - aircraftHeight))))

	aircraft.style.left = `${horizontalPosition}px`
	aircraft.style.top = `${verticalPosition}px`

	const directionsMap = {
		"1": `rotate(-10deg)`,
		"0": `rotate(-44deg)`,
		"-1": `rotate(-69deg)`
	}

	const direction = Math.sign(horizontalDirection)

	const transformCompatibility = ["transform", "mozTransform", "msTransform", "oTransform", "webkitTransform"]

	for (let index = 0; index < transformCompatibility.length; index++) {
		aircraft.style[transformCompatibility[index]] = directionsMap[direction]
	}
}

const createShot = (leftShotPosition, topShotPosition) => {
	const shot = document.createElement("div")
	shot.className = "shot"
	shot.style.left = `${leftShotPosition}px`
	shot.style.top = `${topShotPosition}px`

	scenario.appendChild(shot)

	soundOfGunfireFromTheAircraft()
}

const shotMoviment = () => {
	const shots = document.querySelectorAll(".shot")

	for (let index = 0; index < shots.length; index++) {

		if (shots[index]) {
			let topShotPosition = shots[index].offsetTop

			topShotPosition -= shotSpeed
			shots[index].style.top = `${topShotPosition}px`

			if (topShotPosition < -10) shots[index].remove()
		}
	}
}

const shoot = () => {
	const shotDelay = Date.now()
	const delay = shotDelay - currentShot

	if (isShooting && delay >= 200) {
		currentShot = shotDelay
		createShot(horizontalPosition + 30, verticalPosition - 20)
	}
}

const soundOfGunfireFromTheAircraft = () => {
	const gunshotSound = document.createElement("audio")
	gunshotSound.setAttribute("src", "/src/audio/gunshotSound.mp3")
	gunshotSound.play()

	scenario.appendChild(gunshotSound)

	gunshotSound.addEventListener("ended", () => gunshotSound.remove())
}

const createEnemy = () => {
	const enemy = document.createElement("div")
	enemy.className = "enemy"
	enemy.setAttribute("data-life", enemyLife)
	enemy.style.left = `${Math.floor(Math.random() * (scenarioWidth - aircraftWidth))}px`
	enemy.style.top = "-100px"

	const enemyLifeDisplayed = document.createElement("p")
	enemyLifeDisplayed.className = "enemy-life-displayed"
	enemyLifeDisplayed.textContent = enemyLife

	enemy.appendChild(enemyLifeDisplayed)
	scenario.appendChild(enemy)
}

const enemyMoviment = () => {
	const enemies = document.querySelectorAll(".enemy")

	enemies.forEach(enemy => {
		let topEnemyPosition = enemy.offsetTop

		topEnemyPosition += enemySpeed

		enemy.style.top = `${topEnemyPosition}px`

		if (topEnemyPosition >= scenarioHeight) {
			damageSound()

			scenario.style.animation = "none"
			scenario.offsetHeight
			scenario.style.animation = "damage 350ms linear 2"

			currentLife -= decreaseLife
			life.textContent = `${currentLife}%`

			switch (true) {
				case (currentLife === 0):
					gameOver()
					break
				case (currentLife <= 15):
					lowLifeSound()

					life.style.color = "#ff0000"
					life.style.animation = "pulse 1000ms infinite linear"
					break
			}
			enemy.remove()
		}
	})
}

const lowLifeSound = () => {
	if (!lowLifeSoundReproduced) {
		const lowLife = document.createElement("audio")
		lowLife.setAttribute("src", "/src/audio/lowLife.mp3")
		lowLife.play()

		scenario.appendChild(lowLife)

		lowLife.addEventListener("ended", () => lowLife.remove())

		lowLifeSoundReproduced = true
	}
}

const damageSound = () => {
	const damage = document.createElement("audio")
	damage.setAttribute("src", "/src/audio/damage.mp3")
	damage.play()

	scenario.appendChild(damage)

	damage.addEventListener("ended", () => damage.remove())
}

const collision = () => {
	const enemyCollided = document.querySelectorAll(".enemy")
	const collidedShot = document.querySelectorAll(".shot")

	enemyCollided.forEach(enemy => {
		collidedShot.forEach(shot => {
			const enemyCollision = enemy.getBoundingClientRect()
			const shotCollision = shot.getBoundingClientRect()

			let currentEnemyLife = parseInt(enemy.getAttribute("data-life"))

			function isColliding(enemyCollision, shotCollision) {
				return (
					enemyCollision.left < shotCollision.right &&
					enemyCollision.right > shotCollision.left &&
					enemyCollision.top < shotCollision.bottom &&
					enemyCollision.bottom > shotCollision.top
				)
			}

			Boolean(isColliding(enemyCollision, shotCollision)) && (() => {
				const updateCurrentEnemyLife = document.querySelector(".enemy-life-displayed")

				currentEnemyLife--

				updateCurrentEnemyLife.textContent = currentEnemyLife

				shot.remove()

				switch (currentEnemyLife) {
					default:
						enemy.setAttribute("data-life", currentEnemyLife)
						break
					case 0:
						currentScore += 10

						score.style.animation = "pointAcquired 500ms linear 2"
						score.addEventListener("animationend",
							function () {
								this.style.animation = "none"
							}, {
							once: true
						})

						score.textContent = currentScore

						enemy.remove()
						explosionSoundWhenDefeatSomeEnemy()

						if (currentScore % 100 === 0) pointSoundWhenReachingSomeScore()
						break
				}
				if (updateCurrentEnemyLife.textContent === "1") {
					updateCurrentEnemyLife.style.color = "#ff0000"
					updateCurrentEnemyLife.style.animation = "pulse 500ms infinite linear"
				}
			})()
		})
	})
}

const explosionSoundWhenDefeatSomeEnemy = () => {
	const explosionSound = document.createElement("audio")

	explosionSound.setAttribute("src", "/src/audio/explosionSound.mp3")
	explosionSound.play()

	scenario.appendChild(explosionSound)

	explosionSound.addEventListener("ended", () => explosionSound.remove())
}

const pointSoundWhenReachingSomeScore = () => {
	const pointSound = document.createElement("audio")
	pointSound.setAttribute("src", "/src/audio/pointSound.mp3")
	pointSound.play()

	scenario.appendChild(pointSound)

	pointSound.addEventListener("ended", () => pointSound.remove())
}

const howToPlay = () => {
	const movimentKeys = ["W", "S", "A", "D", "↑", "↓", "←", "→"]
	const shotKey = ["Barra de Espaço"]
	const pauseKey = ["Esc"]

	swal({
		title: "CONTROLES",
		icon: "info",
		text: `MOVIMENTAÇÃO:\n${movimentKeys.join(", ").replace("D, ↑", "D\nou\n↑")}\n\nATIRAR:\n${shotKey[0]}\n\nPAUSAR O JOGO:\n${pauseKey[0]}`,
		button: "Certo",
		timer: 8000
	})
}

const clickSound = () => {
	const buttonSound = document.createElement("audio")
	buttonSound.setAttribute("src", "/src/audio/buttonSound.mp3")
	buttonSound.play()

	scenario.appendChild(buttonSound)

	buttonSound.addEventListener("ended", () => buttonSound.remove())
}

startGame.addEventListener("click", () => {
	clickSound()
	nameOfTheGame.remove()
})

const gameOptions = () => {
	startGame.remove()

	const settings = document.createElement("section")
	settings.className = "settings"

	const difficulties = [
		{
			label: "Fácil",
			value: "easy"
		},
		{
			label: "Normal",
			value: "normal"
		},
		{
			label: "Difícil",
			value: "hard"
		}
	]

	const difficultyText = {
		easy: "Inimigos são mais lentos e têm menos vida. Sua nave é mais rápida e também atira mais rápido, você possui 20 (vinte) vidas a mais. Inimigos são gerados na tela mais rápido.",
		normal: "Apenas a experiência padrão, nada mais.",
		hard: "Inimigos são mais rápidos e têm mais vida. Sua nave é mais devagar e também atira mais devagar, você possui 20 (vinte) vidas a menos e recebe mais dano. Inimigos são gerados na tela mais devagar."
	}

	difficulties.forEach(difficulty => {
		const radio = document.createElement("input")
		radio.type = "radio"
		radio.name = "difficulty"
		radio.id = `${difficulty.value}-difficulty`
		radio.value = difficulty.value

		const label = document.createElement("label")
		label.textContent = difficulty.label
		label.htmlFor = radio.id

		const lastDifficulty = localStorage.getItem("selectedDifficulty") || "normal"
		if (difficulty.value === lastDifficulty) radio.checked = true

		const explanatoryText = document.createElement("p")
		explanatoryText.className = "explanatory-text"
		explanatoryText.textContent = difficultyText[radio.value]

		radio.addEventListener("click", clickSound)

		label.appendChild(radio)
		settings.appendChild(label)
		settings.appendChild(explanatoryText)
	})

	const saveButton = document.createElement("button")
	saveButton.className = "save-button"
	saveButton.textContent = "Selecionar"
	saveButton.addEventListener("click", () => {
		clickSound()

		const selectedDifficulty = document.querySelector("input[name=\"difficulty\"]:checked").value
		localStorage.setItem("selectedDifficulty", selectedDifficulty)

		switch (selectedDifficulty) {
			case "easy":
				aircraftSpeed = 45
				currentLife = currentLife + 20
				enemyLife = enemyLife - 2
				enemySpawnTimer = 1000
				enemySpeed = enemySpeed - 2
				shotSpeed = 20
				break
			case "normal":
				enemySpawnTimer = 2000
				break
			case "hard":
				aircraftSpeed = 20
				currentLife = currentLife - 20
				decreaseLife = 10
				enemyLife = enemyLife + 2
				enemySpawnTimer = 3000
				enemySpeed = enemySpeed + 2
				shotSpeed = 8
				break
		}
		playGame(selectedDifficulty)
		settings.remove()
	})
	settings.appendChild(saveButton)
	scenario.appendChild(settings)
}

const playGame = () => {
	(function playerShootingOrNot(yes = "keydown", no = "keyup") {
		if (isGameOver === false) {
			document.addEventListener(yes, keyboard => {
				if (keyboard.code === "Space") isShooting = true
			})

			document.addEventListener(no, keyboard => {
				if (keyboard.code === "Space") {
					isShooting = false

					if (!isPaused) {
						const recharge = document.createElement("audio")
						recharge.setAttribute("src", "/src/audio/recharge.mp3")
						recharge.currentTime = 0
						setTimeout(() => recharge.play(), 800)

						recharge.addEventListener("ended", () => recharge.remove())
					}
				}
			})
		}
	})()

	document.addEventListener("keydown", pressedKey)
	document.addEventListener("keyup", releaseKey)

	life.innerHTML = `${currentLife}%`
	score.innerHTML = currentScore

	aircraftMovimentEvent = setInterval(aircraftMoviment, 50)
	shotMovimentEvent = setInterval(shotMoviment, 50)
	enemyMovimentEvent = setInterval(enemyMoviment, 50)
	collisionEvent = setInterval(collision, 10)
	createEnemyEvent = setInterval(createEnemy, enemySpawnTimer)
	shootEvent = setInterval(shoot, 10)

	soundtrack.loop = true
	soundtrack.volume = 0.25
	soundtrack.play()
}

const play = async () => {
	howToPlay()

	await new Promise((resolve, reject) => {
		gameOptions()

		const radioInput = document.querySelectorAll("input[name=\"difficulty\"]")
		const saveGameConfiguration = document.querySelector(".save-button")

		saveGameConfiguration.addEventListener("click", () => {
			let selectedValue

			radioInput.forEach(radio => {
				if (radio.checked) selectedValue = radio.value
			})

			if (selectedValue) {
				resolve()

				function pauseGame() {
					soundtrack.pause()

					clearInterval(aircraftMovimentEvent)
					clearInterval(shotMovimentEvent)
					clearInterval(enemyMovimentEvent)
					clearInterval(collisionEvent)
					clearInterval(createEnemyEvent)
					clearInterval(shootEvent)
				}

				const paused = document.createElement("p")
				paused.className = "paused"
				paused.textContent = "Pausado"
				paused.style.visibility = "hidden"

				scenario.appendChild(paused)

				document.addEventListener("keydown", keyboard => {
					if (keyboard.code === "Escape" && isGameOver === false) {
						if (!isPaused) {
							isPaused = true
							pauseGame()

							paused.style.visibility = "visible"
						} else {
							isPaused = false
							playGame()

							paused.style.visibility = "hidden"
						}
					}
				})
			} else {
				let error = new Error("Selecione uma dificuldade.")

				reject(swal({
					title: "ERRO",
					icon: "error",
					text: error.message,
					timer: 3000
				}))
			}
		})
	}).catch()
}

const gameOver = () => {
	(function Remove(allEnemies = ".enemy", allShots = ".shot") {
		const enemies = document.querySelectorAll(allEnemies)
		enemies.forEach(enemy => scenario.removeChild(enemy))

		const shots = document.querySelectorAll(allShots)
		shots.forEach(shot => scenario.removeChild(shot))
	})()

	isGameOver = true

	life.remove()
	score.remove()

	soundtrack.pause()

	document.removeEventListener("keydown", pressedKey)
	document.removeEventListener("keyup", releaseKey)

	clearInterval(aircraftMovimentEvent)
	clearInterval(shotMovimentEvent)
	clearInterval(enemyMovimentEvent)
	clearInterval(collisionEvent)
	clearInterval(createEnemyEvent)

	const endGameInterface = document.createElement("button")
	const gameOverText = document.createElement("span")

	endGameInterface.className = "end-game-interface"
	endGameInterface.innerHTML = "Fim de Jogo"
	endGameInterface.addEventListener("click", () => {
		clickSound()
		setTimeout(() => window.location.reload(), 500)
	})

	gameOverText.className = "game-over-text"
	setTimeout(() => gameOverText.innerHTML = `Clique em "${endGameInterface.textContent}" para jogar novamente.`, 4000)

	setTimeout(() => gameOverMusic(), 2500)

	scenario.appendChild(endGameInterface)
	scenario.appendChild(gameOverText)
	scenario.removeChild(aircraft)
}

const gameOverMusic = () => {
	const gameOverSound = document.createElement("audio")
	gameOverSound.setAttribute("src", "/src/audio/gameOverSound.mp3")
	gameOverSound.loop = false
	gameOverSound.play()
}

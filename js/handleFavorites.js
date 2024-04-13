

removeFavoriteStar.addEventListener('click', async (e) => {
	const response = await fetch(`http://localhost:3000/favorites/${wordInput.value}`, {
		method: 'DELETE',
		headers: {
			'token': localStorage.getItem("sid")
		}
	})

	const data = await response.json()

	console.log({ data });

	if (!!data) {
		addFavoriteStar.style.display = 'block'
		removeFavoriteStar.style.display = 'none'

	} else {
		removeFavoriteStar.style.display = 'block'
		addFavoriteStar.style.display = 'none'
	}

})


addFavoriteStar.addEventListener('click', async () => {
	// word that user wants to add to favorites
	const word = wordInput.value
	const response = await fetch('http://localhost:3000/favorites', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"token": localStorage.getItem("sid"),
			"word": word
		})
	})

	const data = await response.json()
	console.log({ data });

	if (!!data.error) {
		addFavoriteStar.style.display = 'none'
		removeFavoriteStar.style.display = 'block'

	} else {
		addFavoriteStar.style.display = 'block'
		removeFavoriteStar.style.display = 'none'
	}
})
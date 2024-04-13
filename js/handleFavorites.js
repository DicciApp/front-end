

document.addEventListener('DOMContentLoaded', async () => {
	const userFavorites = await getUserFavorites()

	if(favoritesMain === null) return


	const listElement = (userFavorites) => {
		return `
		<ul>
			${userFavorites.map((favorite) => `<li>${favorite.word}</li>`).join('\n')}
		</ul>
		`
	}

	favoritesMain.innerHTML = listElement(userFavorites);
})


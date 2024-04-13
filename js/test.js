let audioUrl = ''

// Click event listener for the backdrop
wordImage.addEventListener('click', function () {
	dialog.close();
});

imageIcon.addEventListener('click', function () {
	dialog.showModal();
})


document.addEventListener('DOMContentLoaded', () => {
	const sid = localStorage.getItem("sid")


	// // here is the token that is saved in the locaStorage

	if (sid) {
		console.log("Already logged in");
	} else {
		console.log("Not logged in");
	}

	// here if it is checking if the changeform exiist in this page and if it is true execute this
	if (changeForm) {

		nameInput.style.display = 'none';
		nameLabel.style.display = 'none';


		changeForm.addEventListener("click", (e) => {
			e.preventDefault();

			if (e.target.innerText === "Sign Up") {

				nameInput.style.display = "block";
				nameLabel.style.display = "block";
				e.target.innerText = "Login";
				submit.value = "Sign Up";
			} else {
				nameInput.style.display = "none";
				nameLabel.style.display = "none";
				e.target.innerText = "Sign Up";
				submit.value = "Login";
			}
		});



	}

	// here if it is checking if the searchbutton  exiist in this page and if it is true execute this
	if (searchButton) {
		searchButton.addEventListener('click', async () => {
			audioUrl = ''

			// here word is saving whaever the user put in the put
			const word = wordInput.value;

			if (!word) return

			const data = await fetchWord(word)
			const result = []

			data.forEach((item) => {
				result.push({
					definition: item.meanings[0].definitions[0].definition,
					partOfSpeech: item.meanings[0].partOfSpeech,
					synonyms: item.meanings[0].definitions[0].synonyms,
					antonyms: item.meanings[0].definitions[0].antonyms,
					phonetics: item.phonetics,
				})
			})

			console.log(result);

			audioUrl = result[0].phonetics[0].audio

			// dialog.showModal();
			wordInfo.style.display = "block"
			wordName.textContent = word

			const image = await fetchWordImage(word)

			wordImage.src = image.results[0].urls.regular
			fetchWordInFavorites(word)


			const itemHtml = result.map((item, index) => {
				return `
					<div>
						<p id="partOfSpeech">${item.partOfSpeech}</p>
						<div class="a00001">
							<p class="def-index">${index + 1}</p>
							<div style="margin-left: 30px;">
								<b id="definition">${item.definition}</b>
								${createSynonymsOrAntonyms(item.synonyms) && `
									<div>
										<h4 id="synonyms-title">Synonyms</h4>
										${createSynonymsOrAntonyms(item.synonyms)}
									</div>
								`}
								${createSynonymsOrAntonyms(item.antonyms) && `
									<div>
										<p id="antonyms-title">Antonyms</p>
										${createSynonymsOrAntonyms(item.antonyms)}
									</div>
								`}
							</div>
						</div>
					</div>
				`}).join('\n')


			const html = `
				<div class="ressult-box">
					${itemHtml}
				</div>
			`

			definitionBox.innerHTML = html.toString() || '';

			logOutBtn.addEventListener('click', () => {
				localStorage.removeItem('sid');
				window.location.href = "./index.html";
			})
		})
	}

})

const addToFavorite = async (body) => {
	const response = fetch('http://localhost:3000/favorites/', {
		method: 'POST',
		body: JSON.stringify({
			token: body.token,
			word: body.word
		})
	})

	const data = await response.json()
	return data
}

playButton.addEventListener('click', async () => {
	console.log(audioUrl, "audio url");
	if (!audioUrl) return
	const audio = new Audio(audioUrl);
	audio.play();
})

addFavoriteBtn.addEventListener('click', async () => {
	// word that user wants to add to favorites
	const word = wordInput.value
	console.log(word, sid);

	fetch('http://localhost:3000/favorites', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"token": sid,
			"word": word
		})
	}).then(response => response.json()).then(data => {
		console.log(data);
	}).catch(error => {
		console.error("Error fetching data: ", error);
	});
})


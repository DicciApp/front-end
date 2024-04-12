const addFavoriteBtn = document.getElementById('addFavoriteBtn')
const favoritesDropdown = document.getElementById('favoritesDropdown')

document.addEventListener('DOMContentLoaded', () => {

	const email = document.getElementById("email");
	const password = document.getElementById("password");
	const nameInput = document.getElementById("name");
	const nameLabel = document.getElementById("name-label");
	const wordImage = document.getElementById('wordImage')

	const submit = document.getElementById("submit");

	// here is the link for the sign up when you click 
	const changeForm = document.getElementById("change-form");

	// main html variables
	const searchButton = document.getElementById('searchButton')
	const wordInput = document.getElementById('wordInput')
	const wordName = document.getElementById('wordName')
	const definition = document.getElementById('definition')
	const partOfSpeech = document.getElementById('partOfSpeech')
	const example = document.getElementById('example')
	const synonyms = document.getElementById('synonyms')

	const logOutBtn = document.getElementById('logOutBtn')

	// fetch word
	const fetchWord = async (word) => {
		const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
		const data = await response.json()
		return data
	}

	// add to favorit

	// fet word image
	const fetchWordImage = async (word,) => {
		const unsplashApiKey = 'N2T8g7oMb65LYBX5e0Dp_YguPYsyboVLaU4Dy146LVM'

		const response = await fetch(`https://api.unsplash.com/search/photos?query=${word}&client_id=${unsplashApiKey}`);
		const data = await response.json();

		return data
	}


	// // here is the token that is saved in the locaStorage
	const sid = localStorage.getItem("sid");

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

	const login = async (e) => {
		e.preventDefault();

		if (email.value === "" || password.value === "") {
			// change this later on to show on the loggin page
			console.log("Please enter email and password");

			return;

		} else {

			try {
				// here is the fetch to the backEnd
				const response = await fetch('https://diciapp-e7f35c7ad559.herokuapp.com/login', {

					method: "POST",
					// here is the headeers that is been sent to the back in json format
					headers: {
						'Content-Type': 'application/json'
					},
					// Converts the email and password values to a JSON string to send as the body of the POST request.
					body: JSON.stringify({
						email: email.value,
						password: password.value
					})
				});


				const data = await response.json();
				console.log(data);

				if (response.ok) {
					// if the response from the server is okay this line save a token in the local stoage and then let you in main.html
					localStorage.setItem('sid', data.token);
					window.location.href = "./main.html";
				} else {
					console.log(data.message);
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	// here if it is checking if the submit exiist in this page and if it is true execute this code

	if (submit) {
		submit.addEventListener("click", login);
	}

	// here if it is checking if the searchbutton  exiist in this page and if it is true execute this
	if (searchButton) {
		searchButton.addEventListener('click', async () => {

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



			//  if there is data in here
			if (data.length > 0) {

				// save the first result into this variable 
				const firstResult = data[0]
				// here is accessing to the first object of the array and telling that we are only instering in the meanings 
				const meanings = firstResult.meanings[0];

				wordName.textContent = word;
				definition.textContent = `${meanings.definitions[0].definition}`;
				partOfSpeech.textContent = `${meanings.partOfSpeech}`;
				example.textContent = `Example : ${meanings.definitions[0].example}`;
				synonyms.textContent = `Synonyms: : ${meanings.definitions[0].synonyms.join(', ')}`;

				const image = await fetchWordImage(word)
				wordImage.src = image.results[0].urls.regular;


			} else {
				alert('Word not found')
			}

			logOutBtn.addEventListener('click', () => {
				localStorage.removeItem('sid');
				window.location.href = "./index.html";
			})
		})
	}

})

const addToFavorite = async (body) => {
	const response = await fetch('http://localhost:3000/favorites', {
		method: 'POST',
		body: JSON.stringify(body)
	})

	const data = await response.json()
	return data
}

addFavoriteBtn.addEventListener('click', async () => {
	// word that user wants to add to favorites
	const word = wordInput.value
	// console.log(word);
	try {

		const favorite = await addToFavorite({
			word,
			token: sid
		})

		console.log({ favorite });

		// if ((await response).ok) {
		// 	const option = new Option(word, word);
		// 	favoritesDropdown.add(option)
		// 	console.log('word added to favorites succefully')
		// } else {
		// 	console.log("error adding word to favorites")
		// }

	} catch (error) {
		console.error('Error', error)
	}
})
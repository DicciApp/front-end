document.addEventListener('DOMContentLoaded', () => {

	const email = document.getElementById("email");
	const password = document.getElementById("password");
	const nameInput = document.getElementById("name");
	const nameLabel = document.getElementById("name-label");

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

	const addFavoriteBtn = document.getElementById('addFavoriteBtn')

	const favoritesDropdown = document.getElementById('favoritesDropdown')

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

			if (submit.name === "login") {
				nameInput.style.display = "block";
				nameLabel.style.display = "block";

				e.target.innerText = "Already have an account? Login here";
				formTitle.innerText = "Sign Up"
				submit.name = "signup";
				submit.value = "Sign Up";

			} else {
				nameInput.style.display = "none";
				nameLabel.style.display = "none";

				e.target.innerText = "No account yet? Sign up here";
				formTitle.innerText = "Login"
				submit.name = "login";
				submit.value = "Login";
			}
		});



	}

	// here if it is checking if the submit exiist in this page and if it is true execute this code
	submit.addEventListener("click", async (e) => {
		e.preventDefault();
		if (e.target.name === "login") {
			await login();
		} else {
			await signUp();
		}
	});

	// here is my api  for unsplashAPI
	const unsplashApiKey = 'N2T8g7oMb65LYBX5e0Dp_YguPYsyboVLaU4Dy146LVM'

	// here if it is checking if the searchbutton  exiist in this page and if it is true execute this
	if (searchButton) {


		searchButton.addEventListener('click', () => {

			// here word is saving whaever the user put in the put
			const word = wordInput.value;


			fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
				// fetch will return a promise 
				// once the promise is done 
				// will return a response this promise willbe transforminto json 
				.then(response => response.json())
				.then(data => {

					console.log(data)

					//  if there is data in here
					if (data.length > 0) {

						// save the first result into this variable 
						const firstResult = data[0]
						// here is accessing to the first object of the array and telling that we are only instering in the meanings 
						const meanings = firstResult.meanings[0];

						wordName.textContent = firstResult.wordName;
						definition.textContent = `Definition: ${meanings.definitions[0].definition}`;
						partOfSpeech.textContent = `Part of Speech: ${meanings.partOfSpeech}`;
						example.textContent = `Example : ${meanings.definitions[0].example}`;
						synonyms.textContent = `Synonyms: : ${meanings.definitions[0].synonyms.join(', ')}`;


						// after finding out that the api of the words found results this code is inisizling a new fetch
						return fetch(`https://api.unsplash.com/search/photos?query=${word}&client_id=${unsplashApiKey}`);
					} else {
						alert('Word not found')
					}

				})
				// here the reesponse is been transformed into json 
				.then(response => response.json())
				.then(data => {

					// When a request is make to the Unsplash API, the response includes a JSON object that contains several fields, one of which is results. This results field is an array of objects, where each object represents an image that matches the search criteria. we are mase sure that there is a filed name result inside of the data wa that was 
					if (data && data.results && data.results.length > 0) {


						// here is accesing to the element urls inside the results
						document.getElementById('wordImage').src = data.results[0].urls.regular;
						document.getElementById('wordImage').alt = `image related with the word ${word}`;
					}
				})
				.catch(error => {
					console.error("Error fetching data: ", error);
					wordName.textContent = "Error fetching data";
					definition.textContent = "";
					partOfSpeech.textContent = "";
					example.textContent = "";
					synonyms.textContent = "";
				});


			addFavoriteBtn.addEventListener('click', async () => {
				// word that user wants to add to favorites
				const word = wordInput.value
				// console.log(word);
				try {

					const response = fetch('http://localhost:3000/favorites/add', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: {
							userId: sid,
							word: word
						}
					});

					const data = await response.json()

					console.log({ data });

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


			logOutBtn.addEventListener('click', () => {
				localStorage.removeItem('sid');
				window.location.href = "./index.html";
			})
		})
	}





})
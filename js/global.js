const addFavoriteBtn = document.getElementById('addFavoriteBtn')
const favoritesDropdown = document.getElementById('favoritesDropdown')
const playButton = document.getElementById('audio-icon')
const resultsContainer = document.getElementById('results-container')
const definitionBox = document.getElementById('definition-box')
const wordInfo = document.getElementById('wordInfo')
const dialog = document.querySelector("dialog")
const wordImage = document.getElementById('wordImage')
const removeFavoriteStar = document.getElementById('removeFavoriteStar')
const addFavoriteStar = document.getElementById('addFavoriteStar')
const imageIcon = document.getElementById('image-icon')
const favoritesMain = document.getElementById("favorites-main");
const formTitle = document.getElementById("form-title");

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
const logOutBtn = document.getElementById('logOutBtn')
// variables for herokuapp
const SERVER_URL = 'https://diciapp-e7f35c7ad559.herokuapp.com'; 



// fetch word to remove and add favorite
async function fetchWordInFavorites(word) {
	const response = await fetch(`${SERVER_URL}/favorites/${word}`, {
		// here is the header that is been sent to the back in json format
		headers: {
			'token': sid
		}
	})

// once the response is has been received by the server this line convert the response to json
	const data = await response.json()

	if (data) {
		removeFavoriteStar.style.display = 'block'
		addFavoriteStar.style.display = 'none'
	} else {
		removeFavoriteStar.style.display = 'none'
		addFavoriteStar.style.display = 'block'
	}

	return data
}


// fetch word
async function fetchWord(word) {
	const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
	const data = await response.json()

	return data
}


// fet word image
async function fetchWordImage(word) {
	const unsplashApiKey = 'N2T8g7oMb65LYBX5e0Dp_YguPYsyboVLaU4Dy146LVM'

	// here a function is define that takes an argument and returns a promise
	const response = await fetch(`https://api.unsplash.com/search/photos?query=${word}&client_id=${unsplashApiKey}`);
	const data = await response.json();

	return data
}

function createSynonymsOrAntonyms(words) {
	if (!words) return ""

	const result = words.map((word) => {
		return `<span id="synonyms">${word}</span>`
	})

	return result.join('\n')
}


async function getUserFavorites() {
	const response = await fetch(`${SERVER_URL}/favorites`, {
		headers: {
			'token': localStorage.getItem('sid')
		}
	})

	const data = await response.json()

	return data
}


// sign up
async function signUp() {
	const response = await fetch(`${SERVER_URL}/users/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"email": email.value,
			"password": password.value,
			"name": nameInput.value
		})
	})

	const data = await response.json()

	if (!!data.token) {
		// if the response from the server is okay this line save a token in the local stoage and then let you in main.html
		localStorage.setItem('sid', data.token);
		window.location.href = "./main.html";
	} else {
		console.log(data);
	}

}


const login = async () => {
	if (email.value === "" || password.value === "") {
		// change this later on to show on the loggin page
		alert("Please enter email and password");
		return;

	} else {

		try {
			// here is the fetch to the backEnd
			const response = await fetch(`${SERVER_URL}/users/login`, {
				method: "POST",
				// here is the headeers that is been sent to the back in json format
				headers: {
					'Content-Type': 'application/json'
				},
				// Converts the email and password values to a JSON string to send as the body of the POST request.
				body: JSON.stringify(
					{
						"email": email.value,
						"password": password.value
					}
				)
			});


			const data = await response.json();

			if (!!data.token) {
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


logOutBtn.addEventListener('click', () => {
	localStorage.clear('sid');
	window.location.reload();
})


removeFavoriteStar.addEventListener('click', async (e) => {
	const response = await fetch(`${SERVER_URL}/favorites/${wordInput.value}`, {
		method: 'DELETE',
		headers: {
			'token': localStorage.getItem("sid")
		}
	})

	const data = await response.json()
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
	const response = await fetch(`${SERVER_URL}/favorites`, {
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

	if (!!data.error) {
		addFavoriteStar.style.display = 'none'
		removeFavoriteStar.style.display = 'block'

	} else {
		addFavoriteStar.style.display = 'block'
		removeFavoriteStar.style.display = 'none'
	}
})

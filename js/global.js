

// const fetchWord = async (word) => {
// 	const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
// 	const data = await response.json()

// 	return data
// }


// const fetchWordImage = async (word,) => {
// 	const unsplashApiKey = 'N2T8g7oMb65LYBX5e0Dp_YguPYsyboVLaU4Dy146LVM'

// 	const response = await fetch(`https://api.unsplash.com/search/photos?query=${word}&client_id=${unsplashApiKey}`);
// 	const data = await response.json();

// 	return data
// }


// const addToFavorite = async (data) => {
// 	const response = fetch('http://localhost:3000/favorites/add', {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify({ ...data })
// 	});

// 	const data = await response.json()
// 	console.log({ data });

// 	return data
// }
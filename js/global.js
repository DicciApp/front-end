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


async function fetchWordInFavorites(word) {
  const response = await fetch(`http://localhost:3000/favorites/${word}`, {
    headers: {
      'token': sid
    }
  })

  const data = await response.json()

  if (data) {
    removeFavoriteStar.style.display = 'block'
    addFavoriteStar.style.display = 'none'
  } else {
    removeFavoriteStar.style.display = 'none'
    addFavoriteStar.style.display = 'block'
  }

  console.log({ data });
  return data
}


// fetch word
async function fetchWord(word) {
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  const data = await response.json()

  console.log({ data });
  return data
}


// fet word image
async function fetchWordImage(word) {
  const unsplashApiKey = 'N2T8g7oMb65LYBX5e0Dp_YguPYsyboVLaU4Dy146LVM'

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

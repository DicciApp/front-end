document.addEventListener('DOMContentLoaded', () => {
	// here is the link for the sign up when you click 
	const changeForm = document.getElementById("change-form");

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
		})
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
})
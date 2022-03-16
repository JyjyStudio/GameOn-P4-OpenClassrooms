"use strict";
// DOM Elements
const topNav = document.getElementById("myTopnav");
const navIcon = document.querySelector(".nav-icon");
const modalbg = document.querySelector(".bground");
const content = document.querySelector(".content");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalIcon = document.querySelector(".close");
const modalForm = document.getElementById("modal-form");
const modalBody = document.querySelector(".modal-body");
const validationMessage = document.getElementById("validation-message");
const closeBtn = document.getElementById("btn-close");

// inputs
const inputs = document.querySelectorAll("#firstname, #lastname, #email, #birthdate, #quantity");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const locations = document.querySelectorAll("input[type=radio]");
const checkbox1 = document.getElementById("checkbox1");

// verif validation
let isValid = [];

// Menu mobile
navIcon.addEventListener("click", editNav);
function editNav() {
	if (topNav.className === "topnav") {
		topNav.className += " responsive";
	} else {
		topNav.className = "topnav";
	}
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
	modalbg.style.display = "block";
	window.scrollTo(0, 0);
}

// close modal event
closeModalIcon.addEventListener("click", function () {
	closeForm();
	launchNewForm();
});

function closeForm() {
	modalbg.style.display = "none";
}

function launchNewForm() {
	// reinitialise les champs
	inputs.forEach((input) => {
		resetInput(input);
		input.value = "";
	});
	locations.forEach((location) => {
		// efface le message d'erreur si il y en a un 
		resetInput(location);
		// //enleve l'attribut checked aux villes
		location.checked = false;
	});
	// remet l'attribut checked sur les cgv
	checkbox1.checked = true;
	resetInput(checkbox1);
	//cache le message de validation si il est visible
	if (validationMessage.style.visibility == "visible") {
		modalForm.style.visibility = "visible";
		validationMessage.style.visibility = "hidden";
		closeBtn.style.visibility = "hidden";
	}
}

function resetInput(input) {
	if (input.parentElement.classList.contains("error")) {
		input.parentElement.classList.remove("error");
	}
	if (input.parentElement.classList.contains("success")) {
		input.parentElement.classList.remove("success");
	}
}

// Form on submit event

modalForm.addEventListener("submit", function (e) {
	e.preventDefault();
	checkInputs();
	checkLocation();
	checkCgv();
	if (isValid.filter(response => response == false).length == 0) {
		showValidationMessage();
	}
});

function checkInputs() {
	inputs.forEach(input => checkInput(input));
}

function checkInput(input) {
	//get the values from the inputs
	const firstnameValue = firstname.value.trim();
	const lastnameValue = lastname.value.trim();
	const emailValue = email.value.trim();
	const birthdateValue = birthdate.value.trim();
	const quantityValue = quantity.value.trim();
	// set error or success with conditions
	switch (input) {
		case firstname:
			if (firstnameValue === "" || firstnameValue.length < 2) {
				setErrorFor(
					firstname,
					"Veuillez entrer 2 caractères ou plus pour le champ du prénom."
				);
				isValid.splice(0, 1, false);
			} else if (!isName(firstnameValue)) {
				setErrorFor(firstname, "veuillez entrer un prénom valide.");
				isValid.splice(0, 1, false);
			} else {
				setSuccessFor(firstname);
				isValid.splice(0, 1, true);
			}
			break;
		case lastname:
			if (lastnameValue === "" || lastnameValue.length < 2) {
				setErrorFor(
					lastname,
					"Veuillez entrer 2 caractères ou plus pour le champ du nom."
				);
				isValid.splice(1, 1, false);
			} else if (!isName(lastnameValue)) {
				setErrorFor(lastname, "veuillez entrer un nom valide.");
				isValid.splice(1, 1, false);
			} else {
				setSuccessFor(lastname);
				isValid.splice(1, 1, true);
			}
			break;
		case email:
			if (emailValue === "") {
				setErrorFor(email, "Veuillez entrer une adresse mail.");
				isValid.splice(2, 1, false);
			} else if (!isEmail(emailValue)) {
				setErrorFor(email, "Veuillez entrer un email valide.");
				isValid.splice(2, 1, false);
			} else {
				setSuccessFor(email);
				isValid.splice(2, 1, true);
			}
			break;
		case birthdate:
			if (birthdateValue === "") {
				setErrorFor(birthdate, "Veuillez entrer votre date de naissance.");
				isValid.splice(3, 1, false);
			} else {
				compareDate(birthdate, birthdateValue);
			}
			break;
		case quantity:
			if (quantityValue === "") {
				setErrorFor(quantity, "Veuillez répondre à la question.");
				isValid.splice(4, 1, false);
			} else if (quantityValue < 0) {
				setErrorFor(quantity, "Veuillez entrer une réponse valide.");
				isValid.splice(4, 1, false);
			} else {
				setSuccessFor(quantity);
				isValid.splice(4, 1, true);
			}
			break;
		case location:
			checkLocation();
			break;
	}
}

function setErrorFor(input, message) {
	resetInput(input);
	// add error class
	const formData = input.parentElement; 
	formData.classList.add("error");
	// show error message inside small tag
	const small = formData.querySelector("small");
	small.innerText = message;
}

function setSuccessFor(input) {
	resetInput(input);
	// add success class
	const formData = input.parentElement;
	formData.classList.add("success");
}

function isName(name) {
	return (/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/).test(name);
}

function isEmail(email) {
	return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email);
}

const compareDate = (input, inputValue) => {
	let dateDuJour = new Date();
	let dateValue = new Date(inputValue);

	// si la date naissance est supérieur à la date du jour :
	if (dateValue > dateDuJour) {
		setErrorFor(input, "La date est supérieur à la date du jour");
		isValid.splice(3, 1, false);
	}
	// si la date de naissance est supérieure à 110 ans
	else if (dateValue < -1824422400000) {
		setErrorFor(input, "êtes-vous sûr ?");
		isValid.splice(3, 1, false);
	} else {
		setSuccessFor(input);
		isValid.splice(3, 1, true);
	}
};
// console.log(new Date(1912,2,15).getTime()); // -1824422400000 = 110 ans

const checkLocation = () => {
	let validRadio = [];
	locations.forEach( location => {
		let locationValue = location.checked;
		if (locationValue == false) {
			validRadio.push(false);
		} else {
			validRadio.push(true);
		}
		if (validRadio.filter( response => response == true).length > 0) {
			isValid.splice(5, 1, true);
			setSuccessFor(location);
		} else {
			setErrorFor(location, "Vous devez choisir une option.");
			isValid.splice(5, 1, false);
		}
	});
	console.log({ validRadio, isValid });
};

const checkCgv = () => {
	const checkbox1Value = checkbox1.checked;
	if (checkbox1Value == false) {
		setErrorFor(
			checkbox1,
			"Vous devez vérifier que vous acceptez les termes et conditions."
		);
		isValid.splice(6, 1, false);
	} else {
		setSuccessFor(checkbox1);
		isValid.splice(6, 1, true);
	}
}


function showValidationMessage() {
	inputs.forEach((input) => resetInput(input));
	modalForm.style.visibility = "hidden";
	validationMessage.style.visibility = "visible";
	closeBtn.style.visibility = "visible";
}

// close modal when validation message
closeBtn.addEventListener("click", function () {
	closeForm();
	launchNewForm();
});

// reset input on focus, check on blur
inputs.forEach((input) => {
	input.addEventListener("focus", () => resetInput(input));
	input.addEventListener("blur", () => checkInput(input));
});

//check if checkbox is checked on click
checkbox1.addEventListener("click", () => checkCgv(checkbox1));
//check if location is checked on click
locations.forEach((location) => {
	// location.addEventListener('click', () => checkLocation())
	location.addEventListener("click", () => resetInput(location));
});

// année copyright
const year = new Date().getFullYear();
document.getElementById("year").innerText = year;

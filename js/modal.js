"use strict";
// DOM Elements

const topNav = document.getElementById("myTopnav");
const navIcon = document.querySelector(".nav-icon");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalIcon = document.querySelector(".close");
const modalForm = document.getElementById("modal-form");
const modalBody = document.querySelector(".modal-body");
const validationMessage = document.getElementById("validation-message");

// inputs
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const checkbox1 = document.getElementById("checkbox1");

// verif validation
let validation = [];
const validFormResponses = [true, true, true, true, true, true] 

// Menu mobile
navIcon.addEventListener("click", editNav);
function editNav() {
	if (topNav.className === "topnav") {
		topNav.className += "responsive";
	} else {
		topNav.className = "topnav";
	}
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
	modalbg.style.display = "block";
}

// close modal event
closeModalIcon.addEventListener("click", function () {
	modalbg.style.display = "none";
	modalBody.style.padding = '0 8% 15px';
	
	launchNewForm();
});

function launchNewForm() {
	// reinitialise les champs
	inputs.forEach((input) => {
		resetInput(input);
		input.value = "";
	});
	//cache le message de validation si il est visible
	if (validationMessage.style.visibility == "visible") {
		modalForm.style.visibility = "visible";
		validationMessage.style.visibility = "hidden";
	}
}

// Form on submit event

const inputs = document.querySelectorAll(
	"#firstname, #lastname, #email, #birthdate, #quantity, #checkbox1"
);

modalForm.addEventListener("submit", function (e) {
	e.preventDefault();
	inputs.forEach((input) => resetInput(input));
	checkInputs();
	console.log(validation);

	// if(valid) {
	// 	this.submit()
	// }
});

function checkInputs() {
	inputs.forEach((input) => checkInput(input));
	if (validation.filter(response => response == false).length == 0) {
		showValidationMessage();
	}
}

function showValidationMessage() {
	inputs.forEach((input) => resetInput(input));
	modalForm.style.visibility = "hidden";
	validationMessage.style.visibility = "visible";
	document.querySelector('.modal-body').style.padding = 0;
}

// reset input on focus, and check on blur
inputs.forEach((input) => {
	input.addEventListener("focus", () => resetInput(input));
	input.addEventListener("blur", () => checkInput(input));
});

function resetInput(input) {
	if (input.parentElement.classList.contains("error")) {
		input.parentElement.classList.remove("error");
	}
	if (input.parentElement.classList.contains("success")) {
		input.parentElement.classList.remove("success");
	}
}

function checkInput(input) {
	//get the values from the inputs
	const firstnameValue = firstname.value.trim();
	const lastnameValue = lastname.value.trim();
	const emailValue = email.value.trim();
	const birthdateValue = birthdate.value.trim();
	const quantityValue = quantity.value.trim();
	const checkbox1Value = checkbox1.checked;
	// set error or success with conditions
	switch (input) {
		case firstname:
			if (firstnameValue === "" || firstnameValue.length < 2) {
				setErrorFor(
					firstname,
					"Veuillez entrer 2 caractères ou plus pour le champ du prénom."
				);
				validation.splice(0, 1, false);
			} else if (!isName(firstnameValue)) {
				setErrorFor(firstname, "veuillez entrer un prénom valide.")
				validation.splice(0, 1, false);
			} 
			else {
				setSuccessFor(firstname);
				validation.splice(0, 1, true);
			}
			break;
		case lastname:
			if (lastnameValue === "" || lastnameValue.length < 2) {
				setErrorFor(
					lastname,
					"Veuillez entrer 2 caractères ou plus pour le champ du nom."
				);
				validation.splice(1, 1, false);
			} else if (!isName(lastnameValue)) {
				setErrorFor(lastname, "veuillez entrer un nom valide.")
				validation.splice(1, 1, false);
			} 
			else {
				setSuccessFor(lastname);
				validation.splice(1, 1, true);
			}
			break;
		case email:
			if (emailValue === "") {
				setErrorFor(email, "Veuillez entrer une adresse mail.");
				validation.splice(2, 1, false);
			} else if (!isEmail(emailValue)) {
				setErrorFor(email, "Veuillez entrer un email valide.");
				validation.splice(2, 1, false);
			} else {
				setSuccessFor(email);
				validation.splice(2, 1, true);
			}
			break;
		case birthdate:
			if (birthdateValue === "") {
				setErrorFor(birthdate, "Veuillez entrer une date.");
				validation.splice(3, 1, false);
			} else {
				compareDate(birthdate, birthdateValue);
			}
			break;
		case quantity:
			if (quantityValue === "") {
				setErrorFor(quantity, "Veuillez répondre à la question.");
				validation.splice(4, 1, false);
			} else if (quantityValue < 0) {
				setErrorFor(quantity, "Veuillez entrer une réponse valide.");
				validation.splice(4, 1, false);
			} else {
				setSuccessFor(quantity);
				validation.splice(4, 1, true);
			}
			break;
		case checkbox1:
			if (checkbox1Value == false) {
				setErrorFor(
					checkbox1,
					"Vous devez vérifier que vous acceptez les termes et conditions."
				);
				validation.splice(5, 1, false);
			} else {
				resetInput(checkbox1)
				validation.splice(5, 1, true);
			}
			break;

		default:
			alert("Une erreur est survenue, veuillez raffraichir la page");
			break;
	}
}

function setErrorFor(input, message) {
	const formData = input.parentElement; //.form-data
	const small = formData.querySelector("small");
	// add error class
	formData.classList.add("error");
	// show error message inside small tag
	small.innerText = message;
}

function setSuccessFor(input) {
	const formData = input.parentElement;
	// add success class
	formData.classList.add("success");
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isName(name) {
	return /^[a-zA-Z \-éèëê]+$/.test(name)
}

const compareDate = (input, inputValue) => {
	let dateDuJour = new Date();
	let dateValue = new Date(inputValue);

	// si la date naissance est supérieur à la date du jour :
	if(dateValue>dateDuJour) {
		console.log('date supérieur a la date du jour');
		setErrorFor(input, "La date supérieur a la date du jour");
		validation.splice(3, 1, false);
	}
	// si la date de naissance est supérieure à 110 ans
	else if(dateValue < -1824422400000) {
		console.log('+ que 110 ans');
		setErrorFor(input, "êtes vous sur ?");
		validation.splice(3, 1, false);
	} 
	else {
		setSuccessFor(input);
		validation.splice(3, 1, true);
	}
}

// console.log(new Date(1912,2,10).getTime()); // -1824422400000 = 110 ans
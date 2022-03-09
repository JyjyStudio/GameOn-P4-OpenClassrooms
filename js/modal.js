"use strict";
// DOM Elements

const topNav = document.getElementById("myTopnav");
const navIcon = document.querySelector(".nav-icon");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalIcon = document.querySelector(".close");
const modalForm = document.getElementById("modal-form");
const formData = document.querySelectorAll(".form-data");

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
});

// Form on submit event

const inputs = document.querySelectorAll(
	"#firstname, #lastname, #email, #birthdate, #quantity, #checkbox1"
);

modalForm.addEventListener("submit", function (e) {
	e.preventDefault();

	//input values
	const firstnameValue = document.getElementById("firstname").value.trim();
	const lastnameValue = document.getElementById("lastname").value.trim();
	const emailValue = document.getElementById("email").value.trim();
	const birthdateValue = document.getElementById("birthdate").value.trim();
	const quantityValue = document.getElementById("quantity").value.trim();
	const checkbox1Value = document.getElementById("checkbox1").checked;
	console.log(firstnameValue);
	// inputs.forEach((input) => resetInput(input));
});

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
	if (input.valid) {
		input.parentElement.classList.add("success");
		return true;
	} else {
		if (input.parentElement.classList.contains("success")) {
			input.parentElement.classList.remove("success");
		}
		const small = input.parentElement.getElementsByTagName("small");
		input.parentElement.classList.add("error");
		return false;
	}
}

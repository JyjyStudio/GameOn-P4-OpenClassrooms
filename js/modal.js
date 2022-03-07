"use strict";
// DOM Elements

const topNav = document.getElementById("myTopnav");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".form-data");
const closeModalIcon = document.querySelector(".close");
const navIcon = document.querySelector(".nav-icon");
const modalForm = document.getElementById("modal-form");

// Menu burger
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
}

// close modal event
closeModalIcon.addEventListener("click", function () {
	modalbg.style.display = "none";
});

// Form on submit event

// const fields = document.querySelectorAll("#first, #last, #email, #birthdate, #quantity, .checkbox-icon:checked, #checkbox1");
const fields = document.querySelectorAll(".form-data input");
console.log(fields);
fields.forEach((field) => {
	field.addEventListener("focus", () => resetField(field));
	field.addEventListener("blur", () => validateField(field));
});

function validateField(field) {
	if (field.checkValidity()) {
		// field.removeAttribute('data-error', field.validationMessage);
		return true;
	} else {
		// field.setAttribute('data-error', field.validationMessage);
		field.classList.add("invalid");
		let msg = document.createElement("span");
		msg.classList.add("msg");
		msg.innerText = field.validationMessage;
		field.parentNode.appendChild(msg);
		return false;
	}
}
function resetField(field) {
	if (field.classList.contains("invalid")) {
		field.classList.remove("invalid");
		let message = field.parentNode.lastChild;
		message.remove();
	}
}

modalForm.addEventListener("submit", function (e) {
	fields.forEach((field) => resetField(field));
	let valid = true;

	fields.forEach((field) => {
		if (!validateField(field)) {
			valid = false;
			e.preventDefault();
		}
	});
	if (valid) {
		this.submit();
	}

	// return validate();
});

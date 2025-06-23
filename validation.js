function validation(form) {
  function removeError(input) {
    const parent = input.parentNode;

    if (parent.classList.contains("error")) {
      parent.querySelector(".error-label").remove();
      parent.classList.remove("error");
    }
  }

  function createError(input, text) {
    const parent = input.parentNode;
    const errorLabel = document.createElement("label");

    errorLabel.classList.add("error-label");
    errorLabel.textContent = text;

    parent.classList.add("error");
    parent.append(errorLabel);
  }

  let result = true;

  const allInputs = form.querySelectorAll("input");
  let passwordValue = "";
  let confirmPasswordInput = null;

  for (const input of allInputs) {
    removeError(input);

    // Store password and confirmation input for comparison
    if (input.placeholder === "Пароль") {
      passwordValue = input.value;
    }

    if (input.placeholder === "Проверка пароля") {
      confirmPasswordInput = input;
    }

    if (input.dataset.minLength) {
      if (input.value.length < input.dataset.minLength) {
        createError(
          input,
          `Минимальное кол-во символов: ${input.dataset.minLength}`
        );
        result = false;
      }
    }

    if (input.dataset.maxLength) {
      if (input.value.length > input.dataset.maxLength) {
        createError(
          input,
          `Максимальное кол-во символов: ${input.dataset.maxLength}`
        );
        result = false;
      }
    }

    if (input.dataset.required == "true") {
      if (input.value == "") {
        createError(input, "Поле не заполнено!");
        result = false;
      }
    }
  }

  // Check if password and confirm password match
  if (
    passwordValue &&
    confirmPasswordInput &&
    confirmPasswordInput.value !== passwordValue
  ) {
    removeError(confirmPasswordInput);
    createError(confirmPasswordInput, "Пароли не совпадают!");
    result = false;
  }

  return result;
}

document
  .getElementById("add-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    if (validation(this) == true) {
      alert("Форма проверена успешно!");
    }
  });

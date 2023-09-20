const lengthSlider = document.querySelector(".pass-length input"),
      options = document.querySelectorAll(".option input"),
      copyIcon = document.querySelector(".input-box span"),
      passwordInput = document.querySelector(".input-box input"),
      passIndicator = document.querySelector(".pass-indicator"),
      generateBtn = document.querySelector(".generate-btn");

 const characters = {
    lowercase: "abcdefghijklmnñopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[](){}:;.,*+-#@<>~_¿?"
}      

const generatePassword = () => {
    // Inicialización de variables
    let staticPassword = "",
        ramdonPassword = "",
        excludeDuplicate = false,
        passLength = lengthSlider.value;

    // Recorre las opciones seleccionadas para construir el conjunto de caracteres posibles
    options.forEach(option => {
        if (option.checked) {
            if (option.id !== "exc-duplicate" && option.id !== "spaces") {
                staticPassword += characters[option.id]; // Agrega los caracteres correspondientes a la opción
            } else if (option.id === "spaces") {
                staticPassword += " "; // Agregar un espacio en blanco si la id es "spaces"
            } else {
                excludeDuplicate = true; // Habilita la exclusión de duplicados si la opción tiene la id "exc-duplicate"
            }
        }
    });

    // Generación de la contraseña aleatoria
    for (let i = 0; i < passLength; i++) {
        // Selecciona un carácter aleatorio del conjunto de caracteres
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        
        // Verifica si se deben excluir duplicados
        if (excludeDuplicate) {
            // Si el carácter no está en la contraseña aleatoria actual o es un espacio en blanco, agrega el carácter
            // Si el carácter ya está en la contraseña aleatoria, omite su inclusión en esta iteración (i--)
            !ramdonPassword.includes(randomChar) || randomChar == " " ? ramdonPassword += randomChar : i--;
        } else {
            ramdonPassword += randomChar; // Agrega el carácter a la contraseña aleatoria
        }
    }

    // Asigna la contraseña aleatoria al campo de entrada de contraseña en la interfaz
    passwordInput.value = ramdonPassword;
};



// Actualiza el indicador de fortaleza de la contraseña
const updatePassIndicator = () => {
    // Establece el ID del indicador según la longitud seleccionada en el slider
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}

// Actualiza el slider y elementos relacionados
const updateSlider = () => {
    // Actualiza el texto que muestra la longitud de la contraseña en la interfaz
    document.querySelector('.pass-length span').innerText = lengthSlider.value;

    // Genera una nueva contraseña basada en las opciones actuales
    generatePassword();

    // Actualiza el indicador de fortaleza de la contraseña
    updatePassIndicator();
}

// Inicializa la interfaz del slider y contraseñas al cargar la página
updateSlider();

// Copia la contraseña al portapapeles
const copyPassword = () => {
    // Copia el valor del campo de contraseña al portapapeles del navegador
    navigator.clipboard.writeText(passwordInput.value);

    // Cambia el ícono y color temporalmente para indicar que se copió
    copyIcon.innerText = "check";
    copyIcon.style.color = "#fff";

    // Restaura el ícono y color después de 1500 ms (1.5 segundos)
    setTimeout(() => {
        copyIcon.innerText = "copy_all";
        copyIcon.style.color = "#fff";
    }, 1500);
}



copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener('click', generatePassword)

const pinkRadio = document.getElementById('pink');
const blueRadio = document.getElementById('blue');
const greenRadio = document.getElementById('green');
const yellowRadio = document.getElementById('yellow');
const purpleRadio = document.getElementById('purple');
const redRadio = document.getElementById('red');
const submitButton = document.getElementById('submit');

const inputElements = document.querySelectorAll('input[type="text"], textarea, select, h1, button');

redRadio.addEventListener('change', function() {
    if (redRadio.checked) {
      inputElements.forEach(input => {
        input.classList.add('border-red-200', 'focus:border-red-200', 'focus:ring-red-200');
        input.classList.remove('border-yellow-200', 'focus:border-yellow-200', 'focus:ring-yellow-200');
        input.classList.remove('border-emerald-200', 'focus:border-emerald-200', 'focus:ring-emerald-200');
        input.classList.remove('border-pink-200', 'focus:border-pink-200', 'focus:ring-pink-200');
        input.classList.remove('border-cyan-200', 'focus:border-cyan-200', 'focus:ring-cyan-200');
        input.classList.remove('border-violet-200', 'focus:border-violet-200', 'focus:ring-violet-200');
      });
    }
  });
  
  greenRadio.addEventListener('change', function() {
    if (greenRadio.checked) {
      inputElements.forEach(input => {
        input.classList.add('border-emerald-200', 'focus:border-emerald-200', 'focus:ring-emerald-200');
        input.classList.remove('border-red-200', 'focus:border-red-200', 'focus:ring-red-200');
        input.classList.remove('border-yellow-200', 'focus:border-yellow-200', 'focus:ring-yellow-200');
        input.classList.remove('border-pink-200', 'focus:border-pink-200', 'focus:ring-pink-200');
        input.classList.remove('border-cyan-200', 'focus:border-cyan-200', 'focus:ring-cyan-200');
        input.classList.remove('border-violet-200', 'focus:border-violet-200', 'focus:ring-violet-200');      });
    }
  });
  
  pinkRadio.addEventListener('change', function() {
    if (pinkRadio.checked) {
        inputElements.forEach(input => {
            input.classList.add('border-pink-200', 'focus:border-pink-200', 'focus:ring-pink-200');
            input.classList.remove('border-emerald-200', 'focus:border-emerald-200', 'focus:ring-emerald-200');
            input.classList.remove('border-red-200', 'focus:border-red-200', 'focus:ring-red-200');
            input.classList.remove('border-yellow-200', 'focus:border-yellow-200', 'focus:ring-yellow-200');
            input.classList.remove('border-cyan-200', 'focus:border-cyan-200', 'focus:ring-cyan-200');
            input.classList.remove('border-violet-200', 'focus:border-violet-200', 'focus:ring-violet-200');
        });
    }
  });
  
  blueRadio.addEventListener('change', function() {
    if (blueRadio.checked) {
        inputElements.forEach(input => {
            input.classList.add('border-cyan-200', 'focus:border-cyan-200', 'focus:ring-cyan-200');
            input.classList.remove('border-pink-200', 'focus:border-pink-200', 'focus:ring-pink-200');
            input.classList.remove('border-emerald-200', 'focus:border-emerald-200', 'focus:ring-emerald-200');
            input.classList.remove('border-red-200', 'focus:border-red-200', 'focus:ring-red-200');
            input.classList.remove('border-yellow-200', 'focus:border-yellow-200', 'focus:ring-yellow-200');
            input.classList.remove('border-violet-200', 'focus:border-violet-200', 'focus:ring-violet-200');
        });
    }
  });
  
  purpleRadio.addEventListener('change', function() {
    if (purpleRadio.checked) {
        inputElements.forEach(input => {
            input.classList.add('border-violet-200', 'focus:border-violet-200', 'focus:ring-violet-200');
            input.classList.remove('border-cyan-200', 'focus:border-cyan-200', 'focus:ring-cyan-200');
            input.classList.remove('border-pink-200', 'focus:border-pink-200', 'focus:ring-pink-200');
            input.classList.remove('border-emerald-200', 'focus:border-emerald-200', 'focus:ring-emerald-200');
            input.classList.remove('border-red-200', 'focus:border-red-200', 'focus:ring-red-200');
            input.classList.remove('border-yellow-200', 'focus:border-yellow-200', 'focus:ring-yellow-200');
        });
    }
  });

  yellowRadio.addEventListener('change', function() {
    if (yellowRadio.checked) {
        inputElements.forEach(input => {
        input.classList.add('border-yellow-200', 'focus:border-yellow-200', 'focus:ring-yellow-200');
        input.classList.remove('border-violet-200', 'focus:border-violet-200', 'focus:ring-violet-200');
        input.classList.remove('border-cyan-200', 'focus:border-cyan-200', 'focus:ring-cyan-200');
        input.classList.remove('border-pink-200', 'focus:border-pink-200', 'focus:ring-pink-200');
        input.classList.remove('border-emerald-200', 'focus:border-emerald-200', 'focus:ring-emerald-200');
        input.classList.remove('border-red-200', 'focus:border-red-200', 'focus:ring-red-200');
        });
    }
  });
  

  submitButton.onclick = function(){
    popup_function();
}

function popup_function() {
    const radioButtons = document.querySelectorAll('input[name="color"]:checked').length;

    let allFieldsFilled = true;

    inputElements.forEach(input => {
        // Check if input has a value property and if it's empty after trimming
        if (!input.value || input.value.trim() === '') {
            allFieldsFilled = false;
        }
    });

    if (!allFieldsFilled && radioButtons !== 1) {
        Swal.fire({
            title: "Confession failed!",
            text: "Edit niyo nalang toh",
            icon: "error"
        });
    } else {
      Swal.fire({
        title: "Confession sent!",
        text: "Edit niyo nalang toh",
        icon: "success"
    });
    }
}
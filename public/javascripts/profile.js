let newPasswordValue;
let confirmPasswordValue;
const submitBtn = document.getElementById('update-profile');
const newPassword = document.getElementById('new-password');
const confirmPassword = document.getElementById('password-confirmation');
const validationMessage = document.getElementById('validation-message');

const validatePasswords =  (message, add, remove) =>{
validationMessage.textContent = message;    
validationMessage.classList.add(add);
validationMessage.classList.remove(remove);
}

confirmPassword.addEventListener('input', e =>{
    newPasswordValue = newPassword.value;
    confirmPasswordValue = confirmPassword.value;
    if(newPasswordValue!== confirmPasswordValue){
        validatePasswords(`Password don't match!`, 'color-red', 'color-green');
        submitBtn.setAttribute('disabled', true);
    } else {
        validatePasswords('Passwords match!', 'color-green', 'class-red');
        submitBtn.removeAttribute('disabled');
    }
});


let form = document.querySelector('.needs-validation')

console.log(form.classList);
form.addEventListener('submit', e =>{
    Array.from(form).forEach(form => {
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation()
        }
    })

    form.classList.add('was-validated')

})

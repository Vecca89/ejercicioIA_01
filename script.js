document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');
    
    if (form) {
        const inputs = form.querySelectorAll('.form__input');

        // Validación en tiempo real
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateField(input);
            });
        });

        const validateField = (field) => {
            let isValid = true;
            const value = field.value.trim();

            if (field.id === 'name') {
                isValid = value.length >= 3;
            } else if (field.id === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
            } else if (field.id === 'message') {
                isValid = value.length >= 10;
            }

            if (!isValid && value !== '') {
                field.classList.add('form__input--error');
            } else {
                field.classList.remove('form__input--error');
            }

            return isValid;
        };

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            let formIsValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    formIsValid = false;
                    input.classList.add('form__input--error');
                }
            });

            if (!formIsValid) {
                return;
            }
            
            const submitBtn = form.querySelector('.button');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            submitBtn.style.opacity = '0.7';

            setTimeout(() => {
                const successMsg = document.createElement('div');
                successMsg.className = 'form__success';
                
                const lang = document.documentElement.lang;
                let message = '¡Gracias! Hemos recibido tu solicitud correctamente.';
                if (lang === 'en') message = 'Thank you! Your request has been received.';
                if (lang === 'fr') message = 'Merci ! Votre demande a bien été reçue.';

                successMsg.innerHTML = `
                    <div class="form__success-icon">✓</div>
                    <p class="form__success-text">${message}</p>
                `;

                form.innerHTML = '';
                form.appendChild(successMsg);
            }, 1500);
        });
    }
});

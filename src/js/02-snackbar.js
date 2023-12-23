// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
const selectorsForm = {
  form: document.querySelector('.form'),
  btn: document.querySelector('button'),
};

selectorsForm.form.addEventListener('submit', event => {
  event.preventDefault();

  const delayInput = event.currentTarget.elements['delay'];
  const stateInput = event.currentTarget.elements['state'];

  const delay = parseInt(delayInput.value);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateInput.value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(result => {
      iziToast.success({
        title: 'Fulfilled Promise',
        message: `✅ Fulfilled promise in ${result}ms`,
        position: 'topRight',
      });
    })
    .catch(result => {
      iziToast.error({
        title: 'Rejected Promise',
        message: `❌ Rejected promise in ${result}ms`,
        position: 'topRight',
      });
    })
    .finally(() => {
      delayInput.value = '';
    });
});

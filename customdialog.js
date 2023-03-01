const alertDialog = document.querySelector('#alert-dialog');
const alertDialogOkButton = document.querySelector('#alert-dialog-ok');
const confirmDialog = document.querySelector('#confirm-dialog');
const confirmDialogCancelButton = document.querySelector(
  '#confirm-dialog-cancel'
);
const confirmDialogOkButton = document.querySelector('#confirm-dialog-ok');
const promptDialog = document.querySelector('#prompt-dialog');
const promptDialogCancelButton = document.querySelector(
  '#prompt-dialog-cancel'
);
const promptDialogOkButton = document.querySelector('#prompt-dialog-ok');
const promptDialogInput = document.querySelector('#prompt-dialog-input');
const outputElement = document.querySelector('#output');

let confirmValue = false;

// Alert button event listener
document.querySelector('#alert-button').addEventListener('click', () => {
  outputElement.innerHTML = '';
  outputElement.style.display = 'none';
  alertDialog.showModal();
});

// Alert dialog ok button event listener
alertDialogOkButton.addEventListener('click', () => {
  alertDialog.close();
});

// Confirm button event listener
document.querySelector('#confirm-button').addEventListener('click', () => {
  outputElement.innerHTML = '';
  outputElement.style.display = 'none';
  confirmDialog.showModal();
});

// Confirm dialog cancel button event listener
confirmDialogCancelButton.addEventListener('click', () => {
  confirmValue = false;
  confirmDialog.close();
  outputElement.innerHTML = `Confirm result: ${confirmValue}`;
  outputElement.style.display = 'block';
});

// Confirm dialog ok button event listener
confirmDialogOkButton.addEventListener('click', () => {
  confirmValue = true;
  confirmDialog.close();
  outputElement.innerHTML = `Confirm result: ${confirmValue}`;
  outputElement.style.display = 'block';
});

// Prompt button event listener
document.querySelector('#prompt-button').addEventListener('click', () => {
  outputElement.innerHTML = '';
  outputElement.style.display = 'none';
  promptDialogInput.value = '';
  promptDialog.showModal();
});

// Prompt dialog cancel button event listener
promptDialogCancelButton.addEventListener('click', () => {
  promptDialog.close();
  console.log(promptDialogInput.value);
  if (promptDialogInput.value.trim() === '') {
    outputElement.innerHTML = 'User didn\'t enter anything';
    outputElement.style.display = 'block';
  }
});

// Prompt dialog ok button event listener
promptDialogOkButton.addEventListener('click', () => {
  promptDialog.close();
  const value = DOMPurify.sanitize(promptDialogInput.value);
  if (promptDialogInput.value.trim() === '') {
    outputElement.innerHTML = 'User didn\'t enter anything';
    outputElement.style.display = 'block';
  } else {
    outputElement.innerHTML = `Prompt result : ${value}`;
    outputElement.style.display = 'block';
  }
});

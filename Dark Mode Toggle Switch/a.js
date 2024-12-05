const toggleSwitch = document.querySelector('#themeToggle');
toggleSwitch.addEventListener('change', () => {
  if (toggleSwitch.checked) {
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
  } else {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
  }
});

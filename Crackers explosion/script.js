document.addEventListener('click', (event) => {
    const x = event.clientX;
    const y = event.clientY;
  
    const laser = document.createElement('div');
    laser.classList.add('laser');
    document.body.appendChild(laser);
  
    laser.style.left = `${x}px`;
    laser.style.bottom = '0';
  
    const distance = window.innerHeight - y;
    laser.style.height = `${distance}px`;
  
    laser.addEventListener('animationend', () => {
      createExplosion(x, y);
      laser.remove();
    });
  });
  
  function createExplosion(x, y) {
    const numParticles = 30;
  
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      document.body.appendChild(particle);
  
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 100;
      particle.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
      particle.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
  
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
  
      particle.addEventListener('animationend', () => {
        particle.remove();
      });
    }
  }
  
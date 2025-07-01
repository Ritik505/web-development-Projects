function generateCarImages() {
    const playerCanvas = document.createElement('canvas');
    playerCanvas.width = 100;
    playerCanvas.height = 200;
    const playerCtx = playerCanvas.getContext('2d');
    
    playerCtx.fillStyle = '#3498db';
    playerCtx.fillRect(20, 50, 60, 100); 
    playerCtx.fillStyle = '#2980b9';
    playerCtx.fillRect(10, 40, 80, 20); 
    playerCtx.fillRect(10, 150, 80, 20); 
    playerCtx.fillStyle = '#87CEEB';
    playerCtx.fillRect(30, 60, 40, 30); 
    playerCtx.fillStyle = '#000';
    playerCtx.fillRect(20, 40, 20, 20); 
    playerCtx.fillRect(60, 40, 20, 20); 
    playerCtx.fillRect(20, 140, 20, 20); 
    playerCtx.fillRect(60, 140, 20, 20); 
    
    const enemyCanvas = document.createElement('canvas');
    enemyCanvas.width = 100;
    enemyCanvas.height = 200;
    const enemyCtx = enemyCanvas.getContext('2d');
    
    enemyCtx.fillStyle = '#000';
    enemyCtx.fillRect(20, 50, 60, 100); 
    enemyCtx.fillRect(10, 150, 80, 20); 
    enemyCtx.fillStyle = '#FFD700';
    enemyCtx.fillRect(30, 60, 40, 30); 
    enemyCtx.fillStyle = '#FFD700';
    enemyCtx.fillRect(20, 40, 20, 20); 
    enemyCtx.fillRect(60, 40, 20, 20); 
    enemyCtx.fillRect(20, 140, 20, 20); 
    enemyCtx.fillRect(60, 140, 20, 20); 
    
    enemyCtx.fillStyle = '#FFD700';
    enemyCtx.beginPath();
    enemyCtx.moveTo(50, 80);
    enemyCtx.lineTo(30, 100);
    enemyCtx.lineTo(70, 100);
    enemyCtx.closePath();
    enemyCtx.fill();
    
    const playerCarDataURL = playerCanvas.toDataURL('image/png');
    const enemyCarDataURL = enemyCanvas.toDataURL('image/png');
    
    const downloadImage = (dataUrl, filename) => {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    downloadImage(playerCarDataURL, 'player.png');
    downloadImage(enemyCarDataURL, 'enemy.png');

    const status = document.createElement('p');
    status.textContent = 'Player and enemy images have been downloaded.';
    document.body.appendChild(status);
}

window.onload = generateCarImages; 
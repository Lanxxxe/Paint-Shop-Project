
function visualizeRoom(imageURL) {
  const canvas = document.getElementById("visual-canvas");
  const ctx = canvas.getContext("2d");

  const img = new Image();

  img.addEventListener('load', () => {
    canvas.width = img.width;
    canvas.height = img.height;

    const rectData = {
      x: 0,
      y: 0,
      width: img.width,
      height: img.height
    };

    drawRect(ctx, rectData);
    ctx.drawImage(img, 0, 0);
    
  }, { once: true });

  img.crossOrigin = "Anonymous";
  img.src = imageURL;
}


function drawRect(ctx, data) {
  ctx.beginPath();
  ctx.rect(data.x, data.y, data.width, data.height);
  ctx.fillStyle = "lightseagreen";// "rgb(237, 237, 237)";
  ctx.fill();
  ctx.closePath();
}

visualizeRoom("../images/living-room.png");
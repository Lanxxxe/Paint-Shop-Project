
const objects = (function livingRoomObjects() {
  const obj = {
    wall: [
      { x: 181, y: 0 },
      { x: 181, y: 1.4285707473754883 },
      { x: 177, y: 3.4285707473754883 },
      { x: 177, y: 247 },
      { x: 0, y: 247 },
      { x: 0, y: 330 },
      { x: 720.4285888671875, y: 330 },
      { x: 720.4285888671875, y: 247 },
      { x: 430, y: 247 },
      { x: 430, y: 3.4285707473754883 },
      { x: 428, y: 1.4285707473754883 },
      { x: 428, y: 0 },
      { x: 273.14286041259766, y: 0 },
    ],
  windows: [
      [
        { x: 0, y: 0 },
        { x: 181, y: 0 },
        { x: 181, y: 1.2285707473754883 },
        { x: 177, y: 3.2285707473754883 },
        { x: 177, y: 247 },
        { x: 0, y: 247 },
        { x: 0, y: 0 },
      ],
      [
        { x: 428, y: 0 },
        { x: 428, y: 1.4285707473754883 },
        { x: 430, y: 3.4285707473754883 },
        { x: 430, y: 247 },
        { x: 720.4285888671875, y: 247 },
        { x: 720.4285888671875, y: 0 },
        { x: 428, y: 0 },
      ],
    ]
  };

  return obj;
})();

function visualizeRoom(imageURL) {
  const canvas = document.getElementById("visual-canvas");
  const ctx = canvas.getContext("2d");

  const img = new Image();

  img.addEventListener('load', () => {
    canvas.width = img.width;
    canvas.height = img.height;

    drawObject(ctx, objects.wall, "lightgreen");
    drawObject(ctx, objects.windows[0], "lightblue");
    drawObject(ctx, objects.windows[1], "lightpink");
  
    ctx.drawImage(img, 0, 0);
  }, { once: true });

  img.crossOrigin = "Anonymous";
  img.src = imageURL;
}


function drawObject(ctx, obj, color) {
  ctx.beginPath();
  ctx.moveTo(obj[0].x, obj[0].y);
  for (let i = 1; i < obj.length; ++i) {
    ctx.lineTo(obj[i].x, obj[i].y);
  }
  ctx.fillStyle = color; 
  ctx.fill();
  ctx.closePath();
}

visualizeRoom("../images/living-room.png");

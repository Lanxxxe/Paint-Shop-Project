class RoomObject {
  #paths;
  constructor (paths, fillColor="rgb(0,0,0)", strokeColor="rgb(0,0,0)", strokeWidth=0) {
    this.#paths = paths;
    this.fillColor = fillColor ;
    this.strokeColor = strokeColor;
    this.strokeWidth = strokeWidth;
  }

  getPaths() {
    return this.#paths;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.#paths[0].x, this.#paths[0].y);
    for (let i = 1; i < this.#paths.length; ++i) {
      ctx.lineTo(this.#paths[i].x, this.#paths[i].y);
    }
    ctx.fillStyle = this.fillColor; 
    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = this.strokeWidth;
    ctx.fill();
    ctx.closePath();
  }

  isPointed(x, y) {
    let inside = false;
    for (let i = 0, j = this.#paths.length - 1; i < this.#paths.length; j = i++) {
      const xi = this.#paths[i].x, yi = this.#paths[i].y;
      const xj = this.#paths[j].x, yj = this.#paths[j].y;

      const intersect = ((yi > y) !== (yj > y)) &&
        (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  static drawRoomObject(ctx, object, fill="rgb(0,0,0)", stroke="rgb(0,0,0)", lineWidth=0) {
    const paths = object.getPaths();
    ctx.beginPath();
    ctx.moveTo(paths[0].x, paths[0].y);
    for (let i = 1; i < paths.length; ++i) {
      ctx.lineTo(paths[i].x, paths[i].y);
    }
    ctx.fillStyle = fill; 
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.fill();
    ctx.closePath();
  }
};


const livingRoomObject = (() => {
  const wall = new RoomObject([
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
  ], "rgb(227, 227, 227)");

  const windowBorder1 = new RoomObject([
    { x: 0, y: 0 },
    { x: 181, y: 0 },
    { x: 181, y: 1.2285707473754883 },
    { x: 177, y: 3.2285707473754883 },
    { x: 177, y: 247 },
    { x: 0, y: 247 },
    { x: 0, y: 0 },
  ], "rgb(227, 227, 227)");

  const windowBorder2 = new RoomObject([
    { x: 428, y: 0 },
    { x: 428, y: 1.4285707473754883 },
    { x: 430, y: 3.4285707473754883 },
    { x: 430, y: 247 },
    { x: 720.4285888671875, y: 247 },
    { x: 720.4285888671875, y: 0 },
    { x: 428, y: 0 },
  ], "rgb(227, 227, 227)");

  return { wall, windowBorder1, windowBorder2};
})();


const bedRoomObject = (() => {
})();


// The current color picked
let currentColor = "lightgreen";


const visualizer = (function() {
  const canvas = document.getElementById("visual-canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  const roomObj = {
    "../images/living-room.png": livingRoomObject,
  };
  let currentRoomObj;

  const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  const drawObjects = () => {
    Object.values(currentRoomObj).forEach((obj) => {
      obj.draw(ctx);
    });
    ctx.drawImage(img, 0, 0);
  }

  const loadImage = () => {
    clearCanvas();
    canvas.width = img.width;
    canvas.height = img.height;
    drawObjects();
  };

  const setImage = (imageURL) => {
    currentRoomObj = roomObj[imageURL];
    img.crossOrigin = "Anonymous";
    img.src = imageURL;
  };

  const hoverOff = () => {
    clearCanvas();
    drawObjects();
  }

  const hoverEffect = (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    Object.values(currentRoomObj).forEach((obj) => {
      if (obj.isPointed(x, y)) {
        clearCanvas();
        Object.values(currentRoomObj).forEach((obj) => {
          obj.draw(ctx);
        })
        RoomObject.drawRoomObject(ctx, obj, "rgba(70,70,255,0.3)");
        ctx.drawImage(img, 0, 0);
      }
    });
  };

  const fillObject = (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    Object.values(currentRoomObj).forEach((obj) => {
      if (obj.isPointed(x, y)) {
        obj.fillColor = currentColor;
      }
    });

    clearCanvas();
    drawObjects();
  }

  img.addEventListener('load', loadImage);
  canvas.addEventListener('mousemove', hoverEffect);
  canvas.addEventListener('mouseout', hoverOff);
  canvas.addEventListener('mousedown', fillObject);
  return { setImage };

})();


visualizer.setImage("../images/living-room.png");

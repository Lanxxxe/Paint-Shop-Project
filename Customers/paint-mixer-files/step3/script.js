class RoomObject {
  #paths;
  constructor(paths, fillColor = "rgb(0,0,0)", strokeColor = "rgb(0,0,0)", strokeWidth = 0) {
    this.#paths = paths;
    this.fillColor = fillColor;
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

  static drawRoomObject(ctx, object, fill = "rgb(0,0,0)", stroke = "rgb(0,0,0)", lineWidth = 0) {
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


// Identify the parts in living room image that can be fill with colors
const livingRoomObject = (() => {
  const defaultColor = "rgb(227, 227, 227)";
  // The wall is the like the reverse 'T' Shape
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
  ], defaultColor);

  // Window border in the left
  const leftWindowBorder = new RoomObject([
    { x: 0, y: 0 },
    { x: 181, y: 0 },
    { x: 181, y: 1.2285707473754883 },
    { x: 177, y: 3.2285707473754883 },
    { x: 177, y: 247 },
    { x: 0, y: 247 },
    { x: 0, y: 0 },
  ], defaultColor);

  // Window border in the right
  const rightWindowBorder = new RoomObject([
    { x: 428, y: 0 },
    { x: 428, y: 1.4285707473754883 },
    { x: 430, y: 3.4285707473754883 },
    { x: 430, y: 247 },
    { x: 720.4285888671875, y: 247 },
    { x: 720.4285888671875, y: 0 },
    { x: 428, y: 0 },
  ], defaultColor);

  return { wall, leftWindowBorder, rightWindowBorder };
})();


// Identify the parts in bed room image that can be colored 
const bedRoomObject = (() => {
  const defaultColor = "rgb(210, 210, 210)";
  const leftWall = new RoomObject([
    { x: 0, y: 0 },
    { x: 116.8, y: 0 },
    { x: 116.8, y: 295 },
    { x: 0, y: 320 },
  ], defaultColor);

  const rightWall = new RoomObject([
    { x: 117, y: 0 },
    { x: 600, y: 0 },
    { x: 600, y: 380 },
    { x: 513, y: 380 },
    { x: 513, y: 70 },
    { x: 340, y: 84 },
    { x: 340, y: 400 },
    { x: 117, y: 295, },
    { x: 117, y: 0 },
  ], defaultColor);

  const windowBorder = new RoomObject([
    { x: 513, y: 69.6 },
    { x: 340.15, y: 83.6 },
    { x: 340.15, y: 200 },
    { x: 512.8, y: 200 },
    { x: 512.8, y: 70 },
  ], defaultColor);

  return { leftWall, rightWall, windowBorder };
})();



// The current color picked it is used in the line 200 if you make any changes to it go to line 200
let currentColor = "lightgreen";


// this contains the functionalities and controls for image
const visualizer = (function () {
  const canvas = document.getElementById("visualizer-canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  /**
   * @var defaultPixelData use to store the default image data to use later
   * @var roomObj This objects is use to associate images with their object identifier.
   * @var currentRoomObj store the objects that identify the parts of image 
   */
  
  let defaultPixelData;
  const roomObj = {
    "../images/living-room.png": livingRoomObject,
    "../images/bedroom.png": bedRoomObject,
  };
  let currentRoomObj;

  const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  const drawObjects = () => {
    Object.values(currentRoomObj).forEach((obj) => {
      obj.draw(ctx);
    });
  }

  // This is use to display the image with the modified colors
  const render = () => {
    clearCanvas();
    drawObjects();
    ctx.drawImage(img, 0, 0);
  }

  const loadImage = () => {
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);
    defaultPixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    render();
  };

  const setImage = (imageURL) => {
    currentRoomObj = roomObj[imageURL];
    img.crossOrigin = "Anonymous";
    img.src = imageURL;
  };

  // When the object is hover this will execute
  const hoverEffect = (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const pixelIndex = (y * canvas.width + x) * 4;

    // If alpha or opacity is greater than 9.0 prevent hover
    if (defaultPixelData[pixelIndex  + 3] >= 235) {
      render();
      return;
    }

    // Iterate through each objects that been identified in the image and change the add a color on the top of it if it is hovered
    Object.values(currentRoomObj).forEach((obj) => {
      if (obj.isPointed(x, y)) {
        clearCanvas();
        drawObjects();
        RoomObject.drawRoomObject(ctx, obj, "rgba(70,70,255,0.3)");
        ctx.drawImage(img, 0, 0);
      }
    });
  };

  // This is use to change the oclor of identified object in the image
  const fillObject = (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const pixelIndex = (y * canvas.width + x) * 4;

    // If alpha or opacity is greater than 9.0 prevent hover
    if (defaultPixelData[pixelIndex + 3] >= 235) {
      return;
    }

    // Iterate through each object that benn identified in the image and change the color of the clicked object or part
    Object.values(currentRoomObj).forEach((obj) => {
      if (obj.isPointed(x, y)) {
        obj.fillColor = currentColor;
      }
    });

    render();
  }

  img.addEventListener('load', loadImage);
  canvas.addEventListener('mousemove', hoverEffect);
  canvas.addEventListener('mouseout', render);
  canvas.addEventListener('click', fillObject);
  return { setImage };
})();

const bedroomPath = "../images/bedroom.png";
const livingroomPath = "../images/living-room.png";

visualizer.setImage(bedroomPath);

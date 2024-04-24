// NOTE: This script contains functionality for Step 1 and Step 2 of the program
const bedRoomContainer = document.querySelector('#bedroom-container');
const livingRoomContainer = document.querySelector('#living-room-container'); 
const allPallets = document.querySelector('.all-pallet');
const curatedPallets = document.querySelector('.curated-pallet');
const searchPallets = document.querySelector('.search-pallet');


let listOfOrders = {};
let currentImage;

const getColors = (jsonURL) => {
    return fetch(jsonURL)
    .then(response => response.json())
    .then(allColors => {
        return allColors
    })
    .catch(error => {
        console.log(error)
    })
}



const createCircleColors = () => {
    getColors("./paint-mixer-files/script-file/colors.json")
    .then(response => {
        Object.values(response).forEach(allColors => {
            Object.entries(allColors).forEach(([baseColor, colorShades]) => {
                var colorNavigation = document.querySelector("#circle-colors-container");
                var colorName = document.querySelector('#color-name');
                let colorCircles = document.createElement('span');
                colorCircles.style.background = String(baseColor);
                colorCircles.classList.add('activeBase');
                colorCircles.setAttribute('id', String(baseColor));
                colorNavigation.appendChild(colorCircles);

                // Add event listener to each span
                colorCircles.addEventListener('click', function() {
                    // Ensure that classList property is available
                    if (this.classList) {
                        // Remove any existing 'selected' class from other spans
                        const allSpans = document.querySelectorAll('.activeBase');
                        allSpans.forEach(span => {
                            span.classList.remove('selected')
                            span.classList.remove('activeSpan');
                        });
                        
                        this.classList.add('selected');
                        this.classList.add('activeSpan')
                        colorName.innerHTML = this.id;
                        displayColorShades(this.id);
                    } 
                });
            });
        });
    });
}


const displayColorShades = (activeBaseColor) => {
    getColors('./paint-mixer-files/script-file/colors.json')
    .then(response => {
        var SquareContainer = document.querySelector('#square-colors-container');
        var NumOfOrders = document.querySelector('#order-count'); 
        // Clear existing color squares
        SquareContainer.innerHTML = '';

        // Loop through color shades of the active base color
        for (let shades in response.Colors[activeBaseColor]) {
            let colorSquares = document.createElement('span');
            let hexCode = response.Colors[activeBaseColor][shades];
            colorSquares.style.background = hexCode;
            colorSquares.setAttribute('id', hexCode);
            SquareContainer.appendChild(colorSquares);

            colorSquares.addEventListener('click', () => {
                // Toggle the 'picked-color' class
                colorSquares.classList.toggle('picked-color');
                // If the color is picked, add it to the listOfOrders object
                if (colorSquares.classList.contains('picked-color')) {
                    listOfOrders[shades] = hexCode;
                } else {
                    // If the color is unpicked, remove it from the listOfOrders object
                    delete listOfOrders[shades];
                }
                NumOfOrders.innerHTML = Object.entries(listOfOrders).length;
                displayPickedColors();
                localStorage?.setItem("pickedColors", JSON.stringify(listOfOrders));
            })
        }
    });
};

const displayPickedColors = () => {
    var ordersContainer = document.querySelector('.picked-container');
    ordersContainer.innerHTML = '';

    // Iterate over each entry (colorName, colorCode) in the listOfOrders object
    Object.entries(listOfOrders).forEach(([colorName, colorCode]) => {
        // Container Format 
        // <div class="saved-colors">
        //     <div class="type-color">
        //         <span></span>
        //         <div>
        //             <span>Color Name</span>
        //             <span>Color Code</span>
        //         </div>
        //     </div>
        //     <i class="bi bi-trash"></i>
        // </div>
   
        // Create the HTML structure for each color entry
        let colorDiv = document.createElement('div');
        colorDiv.classList.add('saved-colors');

        let typeColorDiv = document.createElement('div');
        typeColorDiv.classList.add('type-color');
        let colorSpan = document.createElement('span');
        colorSpan.style.backgroundColor = colorCode;
        let colorDetailsDiv = document.createElement('div');
        let colorNameSpan = document.createElement('span');
        colorNameSpan.textContent = colorName;

        let colorCodeSpan = document.createElement('span');
        colorCodeSpan.textContent = colorCode;

        // Append elements to their respective parent elements
        typeColorDiv.appendChild(colorSpan);
        colorDetailsDiv.appendChild(colorNameSpan);
        colorDetailsDiv.appendChild(colorCodeSpan);
        typeColorDiv.appendChild(colorDetailsDiv);
        colorDiv.appendChild(typeColorDiv);

        // Append the color div to the ordersContainer
        ordersContainer.appendChild(colorDiv);
    });
}

const gotoStep2 = (link, roomType) => {
    window.location.href = link;

    let imageLocation = `./paint-mixer-files/images/${roomType}.png`;
    let typeOfRoom = roomType;
    currentImage = roomType;
}

const browseColorCollection = (link) => {
    window.location.href = link;
}

document.addEventListener("DOMContentLoaded", () => {
    try {
        createCircleColors();
    } catch (err) {
        console.log(err);
    }
    
    if (bedRoomContainer) {
        bedRoomContainer.addEventListener('click', () => {
            gotoStep2('color-change.php?step=2', 'bedroom');
        });
    }

    if (livingRoomContainer) {
        livingRoomContainer.addEventListener('click', () => {
            gotoStep2('color-change.php?step=2', 'living-room');
        });
    }

    if (allPallets) {
        allPallets.addEventListener('click', () => {
            window.location.href = 'color-change.php?step=2a';
        });
    }
})
const search = () => {
    // Get the search query entered by the user
    var query = document.getElementById("searchInput").value.toLowerCase();

    if (query.trim() === '') {
      // Clear search results if search query is empty
      clearResults();
      return;
    }

    // Fetch data from JSON file
    fetch('./paint-mixer-files/script-file/colors.json') // Assuming your JSON file is named colors.json
      .then(response => response.json())
      .then(data => {
        // Filter color names based on search query
        var matchingColors = [];

        // Iterate over each category
        Object.keys(data.Colors).forEach(category => {
            // Iterate over color names in each category
            Object.keys(data.Colors[category]).forEach(colorName => {
                // Get the hex code of the color
                const hexCode = data.Colors[category][colorName];
                // Check if the color name matches the search query
                if (colorName.toLowerCase().includes(query)) {
                    // Add the matching color name along with its hex code to the list
                    matchingColors.push({ colorName: colorName, hexCode: hexCode });
                }
            });
        });

        // Display search results
        var bgContainer = document.querySelector('.bg-here'); 
        var resultsContainer = document.getElementById("searchResults");
        resultsContainer.innerHTML = "";

        if (matchingColors.length > 0) {
          // Iterate over each matching color
            matchingColors.forEach(color => {
                // Create a new div element for the color result
                const colorResultDiv = document.createElement('div');
                colorResultDiv.classList.add('colors-result-container');

                // Create the inner HTML for the color result
                colorResultDiv.innerHTML = `
                    <div class="bg-here"></div>
                    <div>
                        <h4>${color.colorName}</h4>
                        <p>${color.hexCode}</p>
                    </div>
                `;

                // Set the background color of the bg-here div
                const bgHereDiv = colorResultDiv.querySelector('.bg-here');
                bgHereDiv.style.backgroundColor = color.hexCode;

                // Append the color result div to the results container
                resultsContainer.appendChild(colorResultDiv);
            });
        } else {
          // If no results found, display a message
          var noResultsMessage = document.createElement("p");
          noResultsMessage.textContent = "No results found.";
          resultsContainer.appendChild(noResultsMessage);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  const clearResults = () => {
    // Clear search results
    document.getElementById("searchResults").innerHTML = "";
  }

  const focus = () => {
    document.querySelector('.search-bar').setAttribute('id', 'focus');
  }
 //Step 1
let totalPrice = 0; // Tracks the total price
const totalElement = document.getElementById("total-price"); // Updates the total price display
const selectedItemsElement = document.getElementById("selected-items"); // Displays the selected items in the right panel
const summaryElement = document.getElementById("summary-details"); // Displays the pricing summary

// Updates the total price
function updateTotal(price) {
  totalPrice += price; // Add price to the total
  totalElement.textContent = totalPrice.toLocaleString(); // Update the displayed total
}

// Adds an item to the list of selected items
function addItemToList(name, price) {
    const item = document.createElement("li"); // Create a new list item
    item.innerHTML = `<span>${name}</span><span>$${price.toLocaleString()}</span>`; // Include name and total cost
    selectedItemsElement.appendChild(item); // Add the item to the list
  }

// Clears the list of selected items
function clearItemList() {
  selectedItemsElement.innerHTML = ""; // Remove all list items
}

// Navigates between steps
function showStep(current, next) {
  document.getElementById(current).classList.add("hidden"); // Hide the current step
  document.getElementById(next).classList.remove("hidden"); // Show the next step
}

// Resets the calculator
function resetCalculator() {
  totalPrice = 0; // Reset total price
  totalElement.textContent = totalPrice; // Update the total price display
  clearItemList(); // Clear the selected items list

  // Reset all selections
  document.querySelectorAll("input").forEach(input => {
    if (input.type === "radio" || input.type === "checkbox") {
      input.checked = false;
    } else if (input.type === "number") {
      input.value = 0;
    }
  });

  // Reset steps visibility
  document.querySelectorAll(".step").forEach(step => step.classList.add("hidden"));
  document.getElementById("step-1").classList.remove("hidden"); // Show Step 1
  document.getElementById("summary").classList.add("hidden"); // Hide summary
}

// Step 1: Select a Software Package
document.querySelectorAll(".select-package").forEach(button => {
    console.log("Found Step 1 button:", button.dataset.name, button.dataset.price); // Log button details during initialization
  
    button.addEventListener("click", event => {
      console.log("Step 1 button clicked:", event.target.dataset.name); // Log the button clicked
      const name = event.target.dataset.name; // Get the package name
      const price = parseInt(event.target.dataset.price); // Get the package price
  
      // Ensure no duplicate additions
      if (name) {
        console.log("Selected package:", name, "Price:", price); // Log the selected package
        updateTotal(price); // Update the total price
        addItemToList(name, price); // Add the selected package to the list
      } else {
        console.log("Error: No package name found.");
      }
  
      showStep("step-1", "step-2"); // Move to Step 2
    });
  });

// Step 2: Add NexusOS
document.getElementById("add-nexus").addEventListener("click", event => {
    const name = "NexusOS"; // Name of the package
    const price = parseInt(event.target.dataset.price); // Get the price from data attribute
    updateTotal(price); // Add the price to the total
    addItemToList(name, price); // Add NexusOS to the list
    showStep("step-2", "step-3"); // Move to Step 3
  });
  
  // Move from Step 2 to Step 3 using the Next button
  document.getElementById("next-2").addEventListener("click", () => {
    showStep("step-2", "step-3"); // Move to Step 3
  });
  
  // Back Button for Step 2 -> Step 1
  document.getElementById("back-2").addEventListener("click", () => {
    showStep("step-2", "step-1"); // Move back to Step 1
  });

  let selected3DPackage = null; // Variable to store the selected 3D package

  // Step 3: Select a 3D Package
  document.querySelectorAll(".select-3d").forEach(button => {
    button.addEventListener("click", event => {
      selected3DPackage = event.target.value; // Store the selected package value (A5, B2, or C1)
      const name = event.target.dataset.name; // Get the package name
      const price = parseInt(event.target.dataset.price); // Get the package price
      updateTotal(price); // Update the total price
      addItemToList(name, price); // Add the selected 3D package to the list
      showStep("step-3", "step-4"); // Move to Step 4
    });
  });
  
  // Back Button for Step 3 -> Step 2
  document.getElementById("back-3").addEventListener("click", () => {
    showStep("step-3", "step-2"); // Move back to Step 2
  });
  
// Pricing per unit for each 3D package
const pricingPerUnit = {
    A5: { homes: 2400, apartments: 1200 },
    B2: { homes: 2200, apartments: 917 },
    C1: { homes: 1429, apartments: 769 },
  };
  
  // Event Listener for Adding Homes Units
  document.getElementById("add-homes").addEventListener("click", () => {
    if (!selected3DPackage) {
      alert("Please select a 3D package in Step 3 first."); // Ensure a package is selected
      return;
    }
  
    const packageType = selected3DPackage; // Use the stored package type (A5, B2, or C1)
    const homesUnits = parseInt(document.getElementById("homes-units").value) || 0; // Get the number of homes units
  
    if (homesUnits > 0) {
      const homesCost = homesUnits * pricingPerUnit[packageType].homes; // Calculate the total cost for homes
      updateTotal(homesCost); // Update the total price
      addItemToList(
        `Per Interior (Homes/Townhomes) - ${homesUnits} units @ $${pricingPerUnit[packageType].homes}/unit`,
        homesCost
      );
      document.getElementById("homes-units").value = ""; // Reset the input field
    } else {
      alert("Please enter a valid number of units."); // Validation for valid input
    }
  });
  
  // Event Listener for Adding Apartments Units
  document.getElementById("add-apartments").addEventListener("click", () => {
    if (!selected3DPackage) {
      alert("Please select a 3D package in Step 3 first."); // Ensure a package is selected
      return;
    }
  
    const packageType = selected3DPackage; // Use the stored package type (A5, B2, or C1)
    const apartmentsUnits = parseInt(document.getElementById("apartments-units").value) || 0; // Get the number of apartments units
  
    if (apartmentsUnits > 0) {
      const apartmentsCost = apartmentsUnits * pricingPerUnit[packageType].apartments; // Calculate the total cost for apartments
      updateTotal(apartmentsCost); // Update the total price
      addItemToList(
        `Per Interior (Apartments) - ${apartmentsUnits} units @ $${pricingPerUnit[packageType].apartments}/unit`,
        apartmentsCost
      );
      document.getElementById("apartments-units").value = ""; // Reset the input field
    } else {
      alert("Please enter a valid number of units."); // Validation for valid input
    }
  });
  
  // Back Button for Step 4 -> Step 3
  document.getElementById("back-4").addEventListener("click", () => {
    showStep("step-4", "step-3"); // Move back to Step 3
  });
  
  // Next Button for Step 4 -> Step 5
  document.getElementById("next-4").addEventListener("click", () => {
    showStep("step-4", "step-5"); // Move to Step 5
  });

// Step 5

// Handle Step 5 Package Selection
document.querySelectorAll(".select-exterior").forEach(button => {
    button.addEventListener("click", event => {
        const name = event.target.dataset.name; // Get the package name (KB1, KB2)
        const price = parseInt(event.target.dataset.price); // Get the package price

        // Always update the total and selected package if a valid button is clicked
        if (selectedExteriorPackage !== name) {
            selectedExteriorPackage = name; // Update selected package
            updateTotal(price); // Add price to total
            addItemToList(name, price); // Add the package to the summary
        }

        // Move to Step 6
        showStep("step-5", "step-6");
    });
});

// Handle "Next" button to proceed without selecting a package
document.getElementById("next-5").addEventListener("click", () => {
    if (!selectedExteriorPackage) {
        alert("Please select a package before proceeding."); // Alert if no package is selected
        return;
    }
    showStep("step-5", "step-6"); // Move to Step 6
});

// Back Button for Step 5 -> Step 4
document.getElementById("back-5").addEventListener("click", () => {
    selectedExteriorPackage = null; // Reset selected package to allow re-selection
    showStep("step-5", "step-4"); // Navigate back to Step 4
});
  
// Step 6  
// Pricing per unit for Step 6 (Exterior/Amenity)
const pricingPerUnitStep6 = {
    KB1: { exterior: 6000, amenity: 3000 },
    KB2: { exterior: 5250, amenity: 2625 },
  };
  
  // Selected package from Step 5
  let selectedExteriorPackage = null; // Track selected package for Step 5

  // Handle Step 5 Package Selection
  document.querySelectorAll(".select-exterior").forEach(button => {
    button.addEventListener("click", event => {
      const name = event.target.dataset.name; // Get the package name (KB1, KB2)
      const price = parseInt(event.target.dataset.price); // Get the package price
  
      // Check if the selected package is new
      if (selectedExteriorPackage !== name) {
        selectedExteriorPackage = name; // Update selected package
        updateTotal(price); // Add price to total
        addItemToList(name, price); // Add the package to the summary
      }
  
      showStep("step-5", "step-6"); // Move to Step 6
    });
  });
  
  // Back Button for Step 5 -> Step 4
  document.getElementById("back-5").addEventListener("click", () => {
    selectedExteriorPackage = null; // Reset selected package to allow re-selection
    showStep("step-5", "step-4"); // Navigate back to Step 4
  });

  // Event Listener for Adding Exterior Units
  document.getElementById("add-exterior").addEventListener("click", () => {
    if (!selectedExteriorPackage) {
      alert("Please select a package in Step 5 first."); // Ensure a package is selected
      return;
    }
  
    const packageType = selectedExteriorPackage; // Use the stored package type (KB1 or KB2)
    const exteriorUnits = parseInt(document.getElementById("exterior-units").value) || 0; // Get the number of exterior units
  
    if (exteriorUnits > 0) {
      const exteriorCost = exteriorUnits * pricingPerUnitStep6[packageType].exterior; // Calculate the total cost for exteriors
      updateTotal(exteriorCost); // Update the total price
      addItemToList(
        `Per Exterior - ${exteriorUnits} units @ $${pricingPerUnitStep6[packageType].exterior}/unit`,
        exteriorCost
      );
      document.getElementById("exterior-units").value = ""; // Reset the input field
    } else {
      alert("Please enter a valid number of units."); // Validation for valid input
    }
  });
  
  // Event Listener for Adding Amenity Units
  document.getElementById("add-amenity").addEventListener("click", () => {
    if (!selectedExteriorPackage) {
      alert("Please select a package in Step 5 first."); // Ensure a package is selected
      return;
    }
  
    const packageType = selectedExteriorPackage; // Use the stored package type (KB1 or KB2)
    const amenityUnits = parseInt(document.getElementById("amenity-units").value) || 0; // Get the number of amenity units
  
    if (amenityUnits > 0) {
      const amenityCost = amenityUnits * pricingPerUnitStep6[packageType].amenity; // Calculate the total cost for amenities
      updateTotal(amenityCost); // Update the total price
      addItemToList(
        `Per Amenity - ${amenityUnits} units @ $${pricingPerUnitStep6[packageType].amenity}/unit`,
        amenityCost
      );
      document.getElementById("amenity-units").value = ""; // Reset the input field
    } else {
      alert("Please enter a valid number of units."); // Validation for valid input
    }
  });
  
  // Back Button for Step 6 -> Step 5
  document.getElementById("back-6").addEventListener("click", () => {
    showStep("step-6", "step-5"); // Move back to Step 5
  });
  
  // Finish Button in Step 6 -> Summary
  document.getElementById("finish").addEventListener("click", () => {
    showStep("step-6", "summary"); // Move to Summary
  });

// Reset Button
document.getElementById("reset").addEventListener("click", resetCalculator);
document.addEventListener("DOMContentLoaded", () => {
  console.log("loaded");
 

  // elements for dress code selection
  const dressCodeRadios = document.getElementsByName("event-dress-code");
  const themeNameGroup = document.getElementById("theme-name-group");

  // elements for budget options
  const budgetRadios = document.getElementsByName("budget-option");
  const budgetAmountGroup = document.getElementById("budget-amount-group");

  // elements for food options
  const foodRadios = document.getElementsByName("food-option");
  const foodBudgetGroup = document.getElementById("food-budget-group");

  // elements for rental options
  const rentalsRadios = document.getElementsByName("rentals-option");
  const rentalsBudgetGroup = document.getElementById("rentals-budget-group");

  // elements for supplies options
  const suppliesRadios = document.getElementsByName("supplies-option");
  const suppliesBudgetGroup = document.getElementById("supplies-budget-group");

  // elements for entertainment options
  const entertainmentRadios = document.getElementsByName(
    "entertainment-option"
  );
  const entertainmentBudgetGroup = document.getElementById(
    "entertainment-budget-group"
  );

  // function to toggle display of input groups based on radio selection
  const toggleDisplay = (radios, group) => {
    radios.forEach((radio) => {
      radio.addEventListener("change", () => {
        if (radio.checked && radio.value === "yes") {
          group.style.display = "block";
        } else {
          group.style.display = "none";
        }
      });
    });

    // check initial state
    const checkedRadio = document.querySelector(
      `input[name="${radios[0].name}"]:checked`
    );
    if (checkedRadio && checkedRadio.value === "yes") {
      group.style.display = "block";
    } else {
      group.style.display = "none";
    }
  };

  // toggle display of theme name input based on dress code selection
  dressCodeRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (document.getElementById("dress-code-themed").checked) {
        themeNameGroup.style.display = "block";
      } else {
        themeNameGroup.style.display = "none";
      }
    });
  });

  // check for dress code
  if (document.getElementById("dress-code-themed").checked) {
    themeNameGroup.style.display = "block";
  } else {
    themeNameGroup.style.display = "none";
  }

  // toggle display for food, rentals, supplies, and entertainment
  toggleDisplay(foodRadios, foodBudgetGroup);
  toggleDisplay(rentalsRadios, rentalsBudgetGroup);
  toggleDisplay(suppliesRadios, suppliesBudgetGroup);
  toggleDisplay(entertainmentRadios, entertainmentBudgetGroup);
});

const registerEventHandler = async (event) => {
  console.log("Running Event Logic");
  // prevent default behavior
  event.preventDefault();

  // capture input data
  const eventName = document.querySelector("#event-name").value.trim();
  const eventDate = document.querySelector("#event-date").value.trim();
  const eventLocation = document.querySelector("#event-location").value.trim();
  const guests = document.querySelector("#guests").value.trim();

  const eventDressCode = document.querySelector(
    'input[name="event-dress-code"]:checked'
  ).value;
  const eventTheme = document
    .querySelector("#theme-name.form-input")
    .value.trim();

  const eventBudget = document.querySelector("#budget").value.trim();

  let eventFood = 0;
  const hasFoodBudget = document.querySelector(
    'input[name="food-option"]:checked'
  ).value;
  if (hasFoodBudget === "yes") {
    eventFood = document.querySelector('input[name="food-budget"]').value;
  }

  let eventRentals = 0;
  const hasRentalBudget = document.querySelector(
    'input[name="rentals-option"]:checked'
  ).value;
  if (hasRentalBudget === "yes") {
    eventRentals = document.querySelector('input[name="rentals-budget"]').value;
  }

  let eventSupplies = 0;
  const hasSuppliesBudget = document.querySelector(
    'input[name="supplies-option"]:checked'
  ).value;
  if (hasSuppliesBudget === "yes") {
    eventSupplies = document.querySelector(
      'input[name="supplies-budget"]'
    ).value;
  }
  let eventEntertainment = 0;
  const hasEntertainmentBudget = document.querySelector(
    'input[name="entertainment-option"]:checked'
  ).value;
  if (hasEntertainmentBudget === "yes") {
    eventEntertainment = document.querySelector(
      'input[name="entertainment-budget"]'
    ).value;
  }
  // NOW we HAVE data --> Lets SEND it to our SERVER/API
  // We run a little validation
  const formData = {
    eventName,
    eventDate,
    eventLocation,
    guests,
    eventDressCode,
    eventTheme,
    eventBudget,
    eventFood,
    eventRentals,
    eventSupplies,
    eventEntertainment,
  };

  if (
    eventName &&
    eventDate &&
    eventLocation &&
    guests &&
    eventDressCode &&
    eventBudget
  ) {
    console.log("Data Valid...");
    const response = await fetch("/api/events", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });
    console.log("API response: ", response);
    if (response.ok) {
      document.location.replace("/events");
    } else {
      const errorResponse = await response.json();
      console.error("Server error response:", errorResponse);
      alert("Failed to Register Event");
    }
  } else {
    alert("Please fill in all fields.");
  }
};

document
  .querySelector(".new-event-form")
  .addEventListener("submit", registerEventHandler);

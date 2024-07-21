document.addEventListener("DOMContentLoaded", () => {
  console.log("loaded");
  // chart.js initialization
  const ctx = document.getElementById("myChart").getContext("2d");
  const data = {
    labels: ["Budget Used", "Remaining Budget"],
    datasets: [
      {
        label: "Budget Distribution",
        data: [0, 0], // initial data
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };

  const config = {
    type: "doughnut",
    data: data,
  };

  const myChart = new Chart(ctx, config);

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

  // show or hide input groups based on radio selection
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
    //TODO: Fix budget input for each radio option
    // if (
    //   document.querySelector(`input[name="${radios[0].name}"]:checked`)
    //     .value === "yes"
    // ) {
    //   group.style.display = "block";
    // } else {
    //   group.style.display = "none";
    // }
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
  // we want to prevent the DEFAULT BROWSER BEHAVIOR (of refreshing the page)
  event.preventDefault();
  // we need to capture the INPUT DATA
  const eventName = document.querySelector("#event-name").value.trim();
  const eventDate = document.querySelector("#event-date").value.trim();
  const eventLocation = document.querySelector("#event-location").value.trim();
  const guests = document.querySelector("#guests").value.trim();
  const eventDressCode = document.querySelector(
    'input[name="event-dress-code"]:checked'
  ).value;
  const eventTheme = document.querySelector("#theme-name").value.trim();
  const eventBudget = document.querySelector("#budget").value.trim();
  const eventFood = document.querySelector(
    'input[name="food-option"]:checked'
  ).value;
  const eventRentals = document.querySelector(
    'input[name="rentals-option"]:checked'
  ).value;
  const eventSupplies = document.querySelector(
    'input[name="supplies-option"]:checked'
  ).value;
  const eventEntertainment = document.querySelector(
    'input[name="entertainment-option"]:checked'
  ).value;
  // NOW we HAVE data --> Lets SEND it to our SERVER/API
  // We run a little validation
  console.log(
    "Form Data:",
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
    eventEntertainment
  );

  console.log("Event Theme: ", eventTheme);

  if (
    eventName &&
    eventDate &&
    eventLocation &&
    guests &&
    eventDressCode &&
    eventBudget &&
    eventFood &&
    eventRentals &&
    eventSupplies &&
    eventEntertainment
  ) {
    console.log("Data Valid...");
    const response = await fetch("/api/events", {
      method: "POST",
      body: JSON.stringify({
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
      }),
      headers: { "Content-Type": "application/json" },
    });
    console.log("API response: ", response);
    if (response.ok) {
      document.location.replace("/events");
    } else {
      alert("Failed to Register Event");
    }
  }
};

document
  .querySelector(".new-event-form")
  .addEventListener("submit", registerEventHandler);

// // event listener for form submission
// document
//   .querySelector(".new-event-form")
//   .addEventListener("submit", async (event) => {
//     event.preventDefault();
//     console.log("Submitting Data");

//     const budget = document.getElementById("budget-yes").checked
//       ? parseFloat(document.getElementById("event-budget").value.trim())
//       : 0;
//     const totalBudget = 1000; // Assume a total budget value or fetch from user input or settings
//     const remainingBudget = totalBudget - budget;

//     myChart.data.datasets[0].data = [budget, remainingBudget];
//     myChart.update();

//     // create a new event object
//     const newEvent = {
//       name: document.getElementById("event-name").value.trim(),
//       date: document.getElementById("event-date").value,
//       location: document.getElementById("event-location").value.trim(),
//       guests: document.getElementById("event-guests").value.trim(), // Corrected this line
//       dress_code: document.querySelector(
//         'input[name="event-dress-code"]:checked'
//       ).value,
//       theme_name: document.getElementById("dress-code-themed").checked
//         ? document.getElementById("theme-name").value.trim()
//         : "",
//       budget: document.getElementById("budget-yes").checked
//         ? document.getElementById("event-budget").value.trim()
//         : "",
//       food_budget: document.getElementById("food-yes").checked
//         ? document.getElementById("food-budget").value.trim()
//         : "",
//       rentals_budget: document.getElementById("rentals-yes").checked
//         ? document.getElementById("rentals-budget").value.trim()
//         : "",
//       supplies_budget: document.getElementById("supplies-yes").checked
//         ? document.getElementById("supplies-budget").value.trim()
//         : "",
//       entertainment_budget: document.getElementById("entertainment-yes").checked
//         ? document.getElementById("entertainment-budget").value.trim()
//         : "",
//     };

//     console.log("Form Data: ", newEvent);

//     // send new event data to server
//     const response = await fetch("/api/events", {
//       method: "POST",
//       body: JSON.stringify(newEvent),
//       headers: { "Content-Type": "application/json" },
//     });

//     console.log(response);

//     // handle response
//     // if (response.ok) {
//     //     document.location.replace('/events');
//     // } else {
//     //     alert('Failed to create event');
//     // }
//   });

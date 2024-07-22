// we want to GRAB reference to the DELETE BUTTON(S)

// We want to capture the 'delete' EVENT
const deleteEventHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    console.log(id);
    const response = await fetch(`/api/events/${id}`, {
      method: "DELETE",
    });

    console.log(response);

    if (response.ok) {
      document.location.replace("/events");
    } else {
      alert("Failed to delete event");
    }
  }
};

document
  .querySelectorAll(".delete-btn")
  .forEach((deleteBtn, index) =>
    deleteBtn.addEventListener("click", deleteEventHandler)
  );

// addEventListener('click', deleteLogic)
// const response = await fetch("/api/events/id", {
//     method: "DELETE",
//     body: JSON.stringify({
//       eventName,
//       eventDate,
//       eventLocation,
//       guests,
//       eventDressCode,
//       eventTheme,
//       eventBudget,
//       eventFood,
//       eventRentals,
//       eventSupplies,
//       eventEntertainment,
//     }),
//     headers: { "Content-Type": "application/json" },
//   });
//   console.log("API response: ", response);
//   if (response.ok) {
//     document.location.replace("/events");
//   } else {
//     alert("Failed to Register Event");
//   };

// We need to pull out the EVENT ID --> in the data-id- ATTRIBUTE

// we need to send a REQUEST to our SERVER
// --> What HTTP method and ENDPOINT(address) are we sending this DATA(?)
// fetch('/api/events/:eventId', {
//    method: 'DELETE'
// })
// document
//   .querySelector(".new-event-form")
//   .addEventListener("delete", deleteEventHandler);

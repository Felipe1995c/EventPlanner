//THIS JS IS RESPONSIBLE FOR RENDERING THE CHART JS VISUALS

document.addEventListener("DOMContentLoaded", async () => {
  const ctx = document.getElementById("myChart").getContext("2d");
  let events;
  try {
    const response = await fetch("/api/events");
    events = await response.json();
    console.log("events", events);
  } catch (error) {
    console.error("Error fetching events:", error);
  }

  //FUTURE DEV NOTE: this chart rendering only renders most recent event (pls update for future use)
  const event = events[events.length - 1]; //select most recent event
  if (!event) {
    console.error("no events found");
    return;
  }
  const budgetData = {
    labels: ["Food", "Rentals", "Supplies", "Entertainment"],
    datasets: [
      {
        label: "Event Budget",
        data: [
          parseFloat(event.food),
          parseFloat(event.rentals),
          parseFloat(event.supplies),
          parseFloat(event.entertainment),
        ],

        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  new Chart(ctx, {
    type: "doughnut",
    data: budgetData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Event Budget Distribution",
        },
      },
    },
  });
});

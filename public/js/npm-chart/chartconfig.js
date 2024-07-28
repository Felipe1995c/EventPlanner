// Sample data object
const data = {
  labels: ["Food", "Rentals", "Supplies", "Entertainment"],
  datasets: [
    {
      label: "Event Budget",
      data: [10, 20, 30, 40], // Example values
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

const config = {
  type: "doughnut",
  data: data,
};

const actions = [
  {
    name: "Randomize",
    handler(chart) {
      chart.data.datasets.forEach((dataset) => {
        dataset.data = Utils.numbers({
          count: chart.data.labels.length,
          min: -100,
          max: 100,
        });
      });
      chart.update();
    },
  },
];

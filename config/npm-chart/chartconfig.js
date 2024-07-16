const config = {
    type: 'bar',
    data: data,
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Chart.js Bar Chart - Stacked'
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true
        }
      }
    }
  };

  const actions = [
    {
      name: 'Randomize',
      handler(chart) {
        chart.data.datasets.forEach(dataset => {
          dataset.data = Utils.numbers({count: chart.data.labels.length, min: -100, max: 100});
        });
        chart.update();
      }
    },
  ];
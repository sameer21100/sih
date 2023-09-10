
// Function to fetch and process data from the CSV file
async function fetchData() {
  const response = await fetch('gujarat.csv');
  const data = await response.text();

  // Parse the CSV data into an array of objects
  const rows = data.split('\n');
  const districtData = [];

  for (let i = 1; i < rows.length; i++) {
    const columns = rows[i].split(',');
    districtData.push({
      district: columns[0],
      dropoutRate: parseFloat(columns[1]),
    });
  }

  return districtData;
}

// Initialize variables
let currentIndex = 0;
const chartLabels = [];
const chartData = [];

// Fetch data from 'gujarat.csv' and populate chart
(async function () {
  const districtData = await fetchData();

  // Extract labels and data from the fetched data
  districtData.forEach((item) => {
    chartLabels.push(item.district);
    chartData.push(item.dropoutRate);
  });

  // Create the bar chart
  const ctx = document.getElementById('barChart').getContext('2d');
  const barChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: chartLabels,
      datasets: [
        {
          label: 'Dropout Rate (%)',
          data: chartData,
          backgroundColor: 'rgba(75, 192, 192, 0.5)', // Adjust color as needed
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            display: false, // Hide x-axis labels
          },
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // Function to update the chart data
  function updateChartData() {
    // Extract data for the current view
    const startIndex = currentIndex;
    const endIndex = startIndex + 10; // Display 10 districts at a time
    const currentLabels = chartLabels.slice(startIndex, endIndex);
    const currentData = chartData.slice(startIndex, endIndex);

    // Update chart data and labels
    barChart.data.labels = currentLabels;
    barChart.data.datasets[0].data = currentData;
    barChart.update();
  }

  // Function to handle "Next" button click
  document.getElementById('nextButton1').addEventListener('click', function () {
    currentIndex += 10;
    if (currentIndex >= chartLabels.length) {
      currentIndex = 0; // Loop back to the beginning
    }
    updateChartData();
  });

  // Function to handle "Previous" button click
  document.getElementById('prevButton1').addEventListener('click', function () {
    currentIndex -= 10;
    if (currentIndex < 0) {
      currentIndex = chartLabels.length - 10; // Loop to the end
    }
    updateChartData();
  });

  // Initial chart data update
  updateChartData();
})();

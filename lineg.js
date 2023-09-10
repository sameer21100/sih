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
  let currentIndex1 = 0;
  const chartLabels1 = [];
  const chartData1 = [];
  
  // Fetch data from 'gujarat.csv' and populate chart
  (async function () {
    const districtData = await fetchData();
  
    // Extract labels and data from the fetched data
    districtData.forEach((item) => {
      chartLabels1.push(item.district);
      chartData1.push(item.dropoutRate);
    });
  
    // Create the line graph
    const ctx = document.getElementById('lineChart').getContext('2d');
    const lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartLabels1,
        datasets: [
          {
            label: 'Dropout Rate (%)',
            data: chartData1,
            borderColor: 'rgba(75, 192, 192, 1)', // Adjust color as needed
            borderWidth: 2,
            fill: false,
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
    function updateChartData1() {
      // Extract data for the current view
      const startIndex = currentIndex1;
      const endIndex = startIndex + 10; // Display 10 districts at a time
      const currentLabels1 = chartLabels1.slice(startIndex, endIndex);
      const currentData = chartData1.slice(startIndex, endIndex);
  
      // Update chart data and labels
      lineChart.data.labels = currentLabels1;
      lineChart.data.datasets[0].data = currentData;
      lineChart.update();
    }
  
    // Function to handle "Next" button click
    document.getElementById('nextButton').addEventListener('click', function () {
      currentIndex1 += 10;
      if (currentIndex1 >= chartLabels1.length) {
        currentIndex1 = 0; // Loop back to the beginning
      }
      updateChartData1();
    });
  
    // Function to handle "Previous" button click
    document.getElementById('prevButton').addEventListener('click', function () {
      currentIndex1 -= 10;
      if (currentIndex1 < 0) {
        currentIndex1 = chartLabels1.length - 10; // Loop to the end
      }
      updateChartData1();
    });
  
    // Initial chart data update
    updateChartData1();
  })();
  
async function fetchData() {
  try {
    const response = await fetch('/ChartDataPerSchool');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateChart() {
  try {
    // Fetch data from the API
    const sortedData = await fetchData();

    // Check if sortedData is not null or undefined
    if (!sortedData) {
      console.error('Data is null or undefined');
      return;
    }

    // Create a mapping of months to data
    const monthDataMap = {};
    sortedData.forEach((item) => {
      if (item !== null) {
        monthDataMap[item._id] = item;
      }
    });

    // Define the order of months
    const monthOrder = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

    // Update the chart options with the fetched data
    var barchartoptions = {
      series: [
        {
          name: 'Total Topics',
          data: monthOrder.map((month) => monthDataMap[month]?.Total_Topics || 0),
        },
        {
          name: 'Total Issues',
          data: monthOrder.map((month) => monthDataMap[month]?.Total_Issues || 0),
        },
        {
          name: 'Total Issues Resolved',
          data: monthOrder.map((month) => monthDataMap[month]?.Total_Issues_Resolved || 0),
        },
      ],
      chart: {
        type: 'bar',
        height: 250,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 3,
        colors: ['transparent'],
      },
      xaxis: {
        categories: monthOrder,
      },
      yaxis: {
        title: {
          text: 'Count',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    };

    // Render the updated chart
    var barchart = new ApexCharts(document.querySelector("#bar-chart"), barchartoptions);
    barchart.render();
  } catch (error) {
    // Handle errors here
    console.error(error);
  }
}

// Call the updateChart function when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  updateChart();
});

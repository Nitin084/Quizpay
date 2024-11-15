fetch('http://localhost:3000/schoolsEnrolledPerMonth')
  .then(response => response.json())
  .then(data => {
    const enrolledSchoolsDataDiv = document.getElementById('enrolledSchoolsData');
    const months = ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dataArray = new Array(12).fill(0);

    data.forEach(entry => {
      const index = months.indexOf(entry._id); // Find the index based on the month
      if (index !== -1) {
        dataArray[index] = entry.count;
      }
    });
    
var barchartoptions = {
    series: [{
    name: 'Total Schools Added',
    data: dataArray
  }],

    chart: {
    type: 'bar',
    height: 150
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded'
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: months,
  },
  yaxis: {
    title: {
      text: 'No of schools'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val 
      }
    }
  }
  };

  
  var barchart = new ApexCharts(document.querySelector("#bar-chart"), barchartoptions);
  barchart.render();

  dataArray.forEach((count, index) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = `Month: ${months[index]}, Enrolled Schools: ${count}`;
    enrolledSchoolsDataDiv.appendChild(paragraph);
  });
})



fetch('http://localhost:3000/studentsEnrolledPerMonth')
  .then(response => response.json())
  .then(data => {
    const enrolledStudentsDataDiv = document.getElementById('enrolledStudentsData');
    const months = ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dataArray = new Array(12).fill(0);

    data.forEach(entry => {
      const index = months.indexOf(entry._id); // Find the index based on the month
      if (index !== -1) {
        dataArray[index] = entry.count;
      }
    });
    

var options = {
    series: [{
      name: "Total Students added",
      data: dataArray
  }],
    chart: {
    height: 150,
    type: 'line',
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight'
  },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  xaxis: {
    categories: months,
  }
  };

  var chart = new ApexCharts(document.querySelector("#line-chart"), options);
  chart.render();


  dataArray.forEach((count, index) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = `Month: ${months[index]}, Enrolled Schools: ${count}`;
    enrolledStudentsDataDiv.appendChild(paragraph);
  });
})
const ctx = document.getElementById('telefonChart');
 //https://www.chartjs.org/docs/latest/getting-started/
new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['gull', 'sølv', 'palladium', 'alumium', 'kobber'],
    datasets: [{
      label: '# of g',
      data: [0.034, 0.34, 0.015, 25, 15],
      borderWidth: 0
    }]
  },
});
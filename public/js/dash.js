google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawVisualization);

function drawVisualization() {
        // Some raw data (not necessarily accurate)
        var data = google.visualization.arrayToDataTable([
         ['Month', 'Income', 'Expenditure' ],
         ['January',  1450,      960],
         ['Febuary',  1750,      1025],
         ['March',  1410,      792],
         ['April',  1690,      920]
      ]);

    var options = {
      vAxis: {title: 'Ammount £'},
      hAxis: {title: 'Month'},
      seriesType: 'bars',
      colors: ['#00A3B4', '#D9534F'],
    };

    var chart = new google.visualization.ComboChart(document.getElementById('chart_div_income_expense'));
    chart.draw(data, options);
  }

function resize () {
    // change dimensions if necessary
    chart.draw(data, options);
}
if (window.addEventListener) {
    window.addEventListener('resize', resize);
}
else {
    window.attachEvent('onresize', resize);
}
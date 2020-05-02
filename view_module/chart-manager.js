export function ShowChart(containerId, data) {
    // Clear area
    let chartsArea = document.getElementById('chartsContainer');
    chartsArea.innerHTML = '';

    // Create chart
    let lineChart = document.createElement("CANVAS");
    lineChart.style.width = 1000 + 'px';
    lineChart.style.height = 200 + 'px';
    let barChart = document.createElement("CANVAS");
    barChart.style.width = 1000 + 'px';
    barChart.style.height = 200 + 'px';
    let lineChart2 = document.createElement("CANVAS");
    lineChart2.style.width = 1000 + 'px';
    lineChart2.style.height = 200 + 'px';

    chartsArea.appendChild(lineChart);
    chartsArea.appendChild(lineChart2);
    chartsArea.appendChild(barChart);
    chartsArea.style.display = 'block';

    let chartLabels = [];
    let infectedDataset = [];
    let neverInfectedDataset = [];
    let sickDataset = [];

    let newInfectedPerDayDataset = [];
    let newCurredDayDataset = [];

    data.history.gameHistory.forEach((item)=>{
        chartLabels.push(item.turn);
        infectedDataset.push(item.infected)
        sickDataset.push(item.sick)
        neverInfectedDataset.push(item.neverInfected)
        newInfectedPerDayDataset.push(item.newInfection);
        newCurredDayDataset.push(item.newCurred);
    })

    var myLineChart = new Chart(lineChart, {
        type: 'line',
        data: {
            labels: chartLabels,
            datasets: [{
                label: 'Number of infectiouse citizens',
                data: infectedDataset,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            },
            {
                label: 'Number of sick citizens',
                data: sickDataset,
                backgroundColor: [
                    'rgba(155, 199, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(155, 199, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        suggestedMin: 0
                    }
                }]
            }
        }
    });
    var myLineChart2 = new Chart(lineChart2, {
        type: 'line',
        data: {
            labels: chartLabels,
            datasets: [
            {
                label: 'Never infected',
                data: neverInfectedDataset,
                backgroundColor: [
                    'rgba(55, 99, 132, 0.05)'
                ],
                borderColor: [
                    'rgba(55, 99, 132, 0.5)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        suggestedMin: 0
                    }
                }]
            }
        }
    });

    var myBarChart = new Chart(barChart, {
        type: 'bar',
        data: {
            labels: chartLabels,
            
            datasets: [{
                label: 'New infection per turn',
                data: newInfectedPerDayDataset,
                backgroundColor: "rgba(255, 99, 132, 0.6)"
            },
            
            {
                label: 'New curred per turn',
                data: newCurredDayDataset,
                backgroundColor: "rgba(55, 99, 32, 0.6)"
            }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        suggestedMin: 0
                    }
                }]
            }
        }
    });
}
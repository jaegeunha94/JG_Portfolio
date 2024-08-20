# minBarLength 옵션
* minBarLength는 Chart.js에서 막대 차트의 최소 길이를 설정할 수 있는 옵션이다. 
* 이 옵션을 사용하면 값이 0일 때도 막대가 너무 작아서 보이지 않거나 툴팁이 나타나지 않는 문제를 방지할 수 있다. 
이를 통해 시각적으로도 0임을 더 명확하게 할 수 있다.

## 예시
```jsx
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 0, 3], // 0을 포함한 데이터
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1,
            minBarLength: 2 // 최소 막대 길이를 2로 설정
        }]
    },
    options: {
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    return value === 0 ? 'Value: 0' : 'Value: ' + value;
                }
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

```
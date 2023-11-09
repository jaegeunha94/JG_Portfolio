# Chart 별 DataType
## BarChart

```
type Dataset = {
    backgroundColor: string;
    data: number[];
    label: string;
}

type ChartData = {
    datasets: Dataset[];
    labels: string[];
}

const exampleChartData: ChartData = {
    datasets: [
        {
            backgroundColor: "rgba(255,99,132,0.2)",
            data: [65, 59, 80, 81, 56, 55, 40],
            label: 'Dataset 1'
        },
        {
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            data: [28, 48, 40, 19, 86, 27, 90],
            label: 'Dataset 2'
        },
        {
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            data: [18, 48, 77, 9, 100, 27, 40],
            label: 'Dataset 3'
        }
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
};
```

## BubbleChart
```
type BubbleChartData = {
    x: number;
    y: number;
    r: number;
}

type Dataset = {
    backgroundColor: string;
    data: BubbleChartData[];
    label: string;
}

type ChartData = {
    datasets: Dataset[];
}

const exampleChartData: ChartData = {
    datasets: [
        {
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            data: [
                { x: 20, y: 30, r: 15 },
                { x: 40, y: 10, r: 10 },
                { x: 25, y: 25, r: 8 },
                { x: 10, y: 10, r: 5 },
            ],
            label: 'Dataset 1'
        },
        {
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            data: [
                { x: 15, y: 25, r: 7 },
                { x: 30, y: 5, r: 14 },
                { x: 45, y: 20, r: 10 },
                { x: 20, y: 35, r: 18 },
            ],
            label: 'Dataset 2'
        },
        {
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            data: [
                { x: 30, y: 40, r: 12 },
                { x: 25, y: 10, r: 9 },
                { x: 35, y: 30, r: 16 },
                { x: 40, y: 45, r: 5 },
            ],
            label: 'Dataset 3'
        }
    ]
};
```

## DoughnutChart
```
type Dataset = {
  backgroundColor: string[];
  data: number[];
  label: string;
}

type ChartData = {
  datasets: Dataset[];
  labels: string[];
}

const exampleChartData: ChartData = {
  datasets: [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)'
      ],
      data: [12, 19, 3, 5, 2, 3],
      label: 'Dataset 1',
    }
  ],
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
};
```

## PieChart
```
type Dataset = {
  backgroundColor: string[];
  data: number[];
  label: string;
};

type ChartData = {
  datasets: Dataset[];
  labels: string[];
};

const exampleChartData: ChartData = {
  datasets: [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)'
      ],
      data: [300, 50, 100, 40, 120, 160],
      label: "Dataset 1",
    }
  ],
  labels: ["January", "February", "March", "April", "May", "June"],
};
```

## LineChart
```
type Dataset = {
  backgroundColor: string;
  data: number[];
  label: string;
}

type ChartData = {
  datasets: Dataset[];
  labels: string[];
}

const exampleChartData = {
  datasets: [
    {
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      data: [65, 59, 80, 81, 56, 55, 40],
      label: 'Dataset 1',
    },
    {
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      data: [28, 48, 40, 19, 86, 27, 90],
      label: 'Dataset 2',
    },
    {
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      data: [18, 48, 77, 9, 100, 27, 40],
      label: 'Dataset 3',
    },
  ],
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
};
```

## RadarChart
```
type Dataset = {
  backgroundColor: string;
  data: number[];
  label: string;
};

type ChartData = {     
  datasets: Dataset[];
  labels: string[];
};

const exampleChartData: ChartData = {
  datasets: [
    {
      backgroundColor: 'rgba(255, 99, 132, 0.2)', 
      data: [65, 59, 90, 81, 56, 55, 40], 
      label: 'Data for 2020' 
    },
    {
      backgroundColor: 'rgba(54, 162, 235, 0.2)', 
      data: [28, 48, 40, 19, 96, 27, 100], 
      label: 'Data for 2021' 
    },
    {
      backgroundColor: 'rgba(75, 192, 192, 0.2)', 
      data: [35, 100, 51, 50, 20, 70, 80], 
      label: 'Data for 2022' 
    }
  ],
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'] 
};
```

## ScatterChart
```
type ScatterChartData = {
  x: number;
  y: number;
};

type Dataset = {
  backgroundColor: string;
  data: ScatterDataPoint[];
  label: string;
};

type ChartData = {
  datasets: Dataset[];
};

const exampleChartData: ChartData = {
  datasets: [
    {
      backgroundColor: 'rgba(255, 99, 132, 1)',
      data: [
        { x: 10, y: 20 },
        { x: 15, y: 10 },
        { x: 7, y: 8 },
        { x: 12, y: 3 },
        { x: 13, y: 5 },
        { x: 6, y: 15 },
        { x: 8, y: 12 },
      ],
      label: 'Group A',
    },
    {
      backgroundColor: 'rgba(54, 162, 235, 1)',
      data: [
        { x: 6, y: 25 },
        { x: 7, y: 35 },
        { x: 8, y: 28 },
        { x: 3, y: 15 },
        { x: 2, y: 10 },
        { x: 5, y: 20 },
        { x: 11, y: 18 },
      ],
      label: 'Group B',
    },
    {
      backgroundColor: 'rgba(75, 192, 192, 1)',
      data: [
        { x: 16, y: 5 },
        { x: 2, y: 20 },
        { x: 9, y: 15 },
        { x: 10, y: 18 },
        { x: 12, y: 9 },
        { x: 20, y: 6 },
        { x: 3, y: 14 },
      ],
      label: 'Group C',
    }
  ],
};
```


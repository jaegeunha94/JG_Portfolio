# Chart 별 Option

## BarChart
```
type TicksCallback = (value: number, index: number, values: any[]) => string;

interface BarChartAxisScale {
  min?: number;
  max?: number;
  stacked?: boolean;
  ticks?: {
    callback: TicksCallback;
  };
}

interface BarChartScalesOption {
  x?: BarChartAxisScale;
  y?: BarChartAxisScale;
}

interface ChartOptions {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  scales: BarChartScalesOption;
}

const options: ChartOptions = {
  responsive: true,
  maintainAspectRatio: true,

  scales: {
      x: {
        min: 0,
        max: 100,
        stacked: true,
        ticks: {
          callback: function (value, index, ticks) {
            return this.getLabelForValue(value) + '$';
          },
        },
      },

      y: {
        ticks: {
          callback: function (value, index, ticks) {
            return this.getLabelForValue(value) + '$';
          },
        },
      },
  },
};
```

## BubbleChart
```
interface BubbleChartAxisScale {
  min?: number;
  max?: number;
}

interface BubbleChartScalesOption {
  x?: BubbleChartAxisScale;
  y?: BubbleChartAxisScale;
}

interface ChartOptions {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  scales: BubbleChartScalesOption
}

const options: ChartOptions = {
  responsive: true,
  maintainAspectRatio: true,

  scales: {
    x: {
        min: 0,
        max: 100,
    },
    y: {
      min: 0,
      max: 100,
    },
  },
};
```

## DoughnutChart
```
interface ChartOptions {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
}

const options: ChartOptions = {
  responsive: true,
  maintainAspectRatio: true
};
```

## PieChart
```
interface ChartOptions {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
}

const options: ChartOptions = {
  responsive: true,
  maintainAspectRatio: true
};
```

## LineChart
```
type TicksCallback = (value: number, index: number, values: any[]) => string;

interface LineChartAxisScale {
  min?: number;
  max?: number;
  ticks?: {
    callback: TicksCallback;
  };
}

interface LineChartScalesOption {
  x?: LineChartAxisScale;
  y?: LineChartAxisScale;
}

interface ChartOptions {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  scales: LineChartScalesOption;
}

const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
  
    scales: {
        x: {
          min: 0,
          max: 100,
          ticks: {
            callback: function (value, index, ticks) {
              return this.getLabelForValue(value) + '$';
            },
          },
        },
  
        y: {
          min: 0,
          max: 100,
          ticks: {
            callback: function (value, index, ticks) {
              return this.getLabelForValue(value) + '$';
            },
          },
        },
    },
  };
```

## RadarChart
```
interface RadarChartScaleOptions {
  angleLines?: {
    display: boolean;
  };
  min?: number;
  max?: number;
}

interface ChartOptions {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  scales: {
    r: RadarChartScaleOptions;
  };
}

const options: ChartOptions = {
  responsive: true,
  maintainAspectRatio: true,

  scales: {
    r: {
        angleLines: {
            display: true
        },
        min: 0,
        max: 100
    }
  }
};
```

## ScatterChart
```
type TickCallbackFunction = (value: number, index: number, ticks: any[]) => string;

interface ScatterChartAxisScale {
  min: number;
  max: number;
  ticks: {
    callback: TickCallbackFunction;
  };
}

interface ScatterChartScalesOption {
  x: ScatterChartAxisScale;
  y: ScatterChartAxisScale;
}

interface ChartOptions {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  scales: ScatterChartScalesOption;
}

const options: ChartOptions = {
  responsive: true,
  maintainAspectRatio: true,

  scales: {
      x: {
        min: 0,
        max: 100,
        ticks: {
          callback: function (value, index, ticks) {
            return this.getLabelForValue(value) + '$';
          },
        },
      },

      y: {
        min: 0,
        max: 50,
        ticks: {
           callback: function (value, index, ticks) {
             return this.getLabelForValue(value) + '$';
           },
        },
      },
  },
};
```

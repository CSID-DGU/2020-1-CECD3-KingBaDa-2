export default{
  data: [
    {
      "group": "Dataset 1",
      "date": "2018-12-31T15:00:00.000Z",
      "value": 10000
    },
    {
      "group": "Dataset 1",
      "date": "2019-01-04T15:00:00.000Z",
      "value": 65000
    },
    {
      "group": "Dataset 1",
      "date": "2019-01-07T15:00:00.000Z",
      "value": 10000
    },
    {
      "group": "Dataset 1",
      "date": "2019-01-12T15:00:00.000Z",
      "value": 49213
    },
    {
      "group": "Dataset 1",
      "date": "2019-01-16T15:00:00.000Z",
      "value": 51213
    },
    {
      "group": "Dataset 2",
      "date": "2018-12-31T15:00:00.000Z",
      "value": 20000
    },
    {
      "group": "Dataset 2",
      "date": "2019-01-04T15:00:00.000Z",
      "value": 25000
    },
    {
      "group": "Dataset 2",
      "date": "2019-01-07T15:00:00.000Z",
      "value": 60000
    },
    {
      "group": "Dataset 2",
      "date": "2019-01-12T15:00:00.000Z",
      "value": 30213
    },
    {
      "group": "Dataset 2",
      "date": "2019-01-16T15:00:00.000Z",
      "value": 55213
    },
    {
      "group": "Dataset 3",
      "date": "2018-12-31T15:00:00.000Z",
      "value": 30000
    },
    {
      "group": "Dataset 3",
      "date": "2019-01-04T15:00:00.000Z",
      "value": 20000
    },
    {
      "group": "Dataset 3",
      "date": "2019-01-07T15:00:00.000Z",
      "value": 40000
    },
    {
      "group": "Dataset 3",
      "date": "2019-01-12T15:00:00.000Z",
      "value": 60213
    },
    {
      "group": "Dataset 3",
      "date": "2019-01-16T15:00:00.000Z",
      "value": 25213
    }
  ],
  options: {
    "title": "Stacked area (time series) - Zoom bar enabled",
    "axes": {
      "left": {
        "stacked": true,
        "mapsTo": "value"
      },
      "bottom": {
        "scaleType": "time",
        "mapsTo": "date"
      }
    },
    "curve": "curveMonotoneX",
    "height": "400"
  }
}

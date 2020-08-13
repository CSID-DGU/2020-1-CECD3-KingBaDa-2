export default{
  data:[
    {
      "group": "Dataset 1",
      "value": 56
    }
  ],
  options:{
    "title": "Meter Chart - with statuses",
    "meter": {
      "peak": 80,
      "status": {
        "ranges": [
          {
            "range": [
              0,
              50
            ],
            "status": "success"
          },
          {
            "range": [
              50,
              60
            ],
            "status": "warning"
          },
          {
            "range": [
              60,
              100
            ],
            "status": "danger"
          }
        ]
      }
    },
    "height": "100px"
  }
}

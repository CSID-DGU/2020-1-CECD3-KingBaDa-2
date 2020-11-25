export default{
  data:[
    {
      "group": "value",
      "value": 42
    },
    {
      "group": "delta",
      "value": -13.37
    }
  ],
  options:{
    "title": "전월 대비 전력 이용량",
    "resizable": true,
    "height": "250",
    "width": "100%",
    "gauge": {
      "type": "semi",
      "status": "danger"
    }
  }
}

export default{
  data:[
    {
      "group": "신공학관",
      "value": 65000
    },
    {
      "group": "과학관",
      "value": 29123
    },
    {
      "group": "정보문화관",
      "value": 35213
    },
    {
      "group": "원흥관",
      "value": 51213
    },
    {
      "group": "본관",
      "value": 24521
    }
  ],
  options:{
    "title": "건물별 전력 사용량",
    "axes": {
      "left": {
        "mapsTo": "value"
      },
      "bottom": {
        "mapsTo": "group",
        "scaleType": "labels"
      }
    },
    "height": "400"
  }
}

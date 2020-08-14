export default{
  data:[
    {
      group: "Qty",
      value: 65000
    },
    {
      group: "More",
      value: 29123
    },
    {
      group: "Sold",
      value: 35213
    },
    {
      group: "Restocking",
      value: 51213
    },
    {
      group: "Misc",
      value: 16932
    }
  ],
  options:{
    "title": "Simple horizontal bar (discrete)",
    "axes": {
      "left": {
        "mapsTo": "group",
        "scaleType": "labels"
      },
      "bottom": {
        "mapsTo": "value"
      }
    },
    "height": "400"
  }
}

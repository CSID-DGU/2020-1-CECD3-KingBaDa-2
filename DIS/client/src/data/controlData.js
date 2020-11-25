export default {
  buildings: [
    {
      buildingName: "신공학관",
      deviceInfos: [
        {
          class: "5103",
          toggleAll: true,
          devices: [
            { name: "에어컨", state: true, img: require("@/assets/air.png") },
            { name: "빔프로젝트", state: true, img: require("@/assets/beam.png") },
            { name: "콘센트", state: false, img: require("@/assets/cons.png") },
            { name: "전등", state: true, img: require("@/assets/light.png") }
          ],
        },
        {
          class: "5104",
          toggleAll: true,
          devices: [
            { name: "에어컨", state: false, img: require("@/assets/air.png") },
            { name: "빔프로젝트", state: true, img: require("@/assets/beam.png") },
            { name: "콘센트", state: false, img: require("@/assets/cons.png") },
            { name: "전등", state: true, img: require("@/assets/light.png") }
          ],
        },
      ],
    },
    {
      buildingName: "원흥관",
      deviceInfos: [
        {
          class: "123",
          toggleAll: true,
          devices: [
            { name: "에어컨", state: false, img: require("@/assets/air.png") },
            { name: "빔프로젝트", state: true, img: require("@/assets/beam.png") },
            { name: "콘센트", state: false, img: require("@/assets/cons.png") },
            { name: "전등", state: true, img: require("@/assets/light.png") }
          ],
        },
        {
          class: "456",
          toggleAll: true,
          devices: [
            { name: "에어컨", state: false, img: require("@/assets/air.png") },
            { name: "빔프로젝트", state: true, img: require("@/assets/beam.png") },
            { name: "콘센트", state: false, img: require("@/assets/cons.png") },
            { name: "전등", state: true, img: require("@/assets/light.png") }
          ],
        },
      ],
    },
  ],
}

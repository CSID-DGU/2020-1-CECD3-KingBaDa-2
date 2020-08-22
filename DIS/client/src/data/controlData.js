export default {
  buildings: [
    {
      buildingName: "신공학관",
      deviceInfos: [
        {
          class: "5103",
          toggleAll: true,
          devices: [
            { name: "온도1", state: true },
            { name: "온도2", state: true },
            { name: "온도3", state: false },
            { name: "온도4", state: true },
          ],
        },
        {
          class: "5104",
          toggleAll: true,
          devices: [
            { name: "온도1", state: false },
            { name: "온도2", state: true },
            { name: "온도3", state: false },
            { name: "온도4", state: true },
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
            { name: "온도1", state: false },
            { name: "온도2", state: true },
            { name: "온도3", state: false },
            { name: "온도4", state: true },
          ],
        },
        {
          class: "456",
          toggleAll: true,
          devices: [
            { name: "온도1", state: false },
            { name: "온도2", state: true },
            { name: "온도3", state: false },
            { name: "온도4", state: true },
          ],
        },
      ],
    },
  ],
}

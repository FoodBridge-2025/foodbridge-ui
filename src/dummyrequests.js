const dummyFoodRequests = [
  {
    id: 1,
    no_servings: 4,
    date: "2025-02-1",
    meal_type: "Dinner",
    status: "Not fulfilled"
  },
  {
    id: 2,
    no_servings: 2,
    date: "2025-02-12",
    meal_type: "Lunch",
    status: "Pending"
  },
  {
    id: 3,
    no_servings: 6,
    date: "2025-02-15",
    meal_type: "Breakfast",
    status: "Fulfilled"
  },
  {
    id: 4,
    no_servings: 3,
    date: "2025-02-20",
    meal_type: "Dinner",
    status: "Pending"
  }
];

const dummyDonations = [
  {
    id: 1,
    image: "image1.jpg",
    title: "Donation 1",
    desc: "Description 1",
    servings: 2,
    requestId: 1,
    status: "Pending"
  },
  {
    id: 2,
    image: "image2.jpg",
    title: "Donation 2",
    desc: "Description 2",
    servings: 1,
    requestId: 1,
    status: "In-transit"
  },
  {
    id: 3,
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.tasteofhome.com%2Fwp-content%2Fuploads%2F2018%2F01%2Fexps28800_UG143377D12_18_1b_RMS.jpg&f=1&nofb=1&ipt=6f408816f7dffdb2bea6f818d9b4b0e38a276821decdb67f5ed1b5deee627743&ipo=images",
    title: "Burger",
    desc: "Cheemsbormger",
    servings: 3,
    requestId: 2,
    status: "Pending"
  }
];

export { dummyFoodRequests, dummyDonations };

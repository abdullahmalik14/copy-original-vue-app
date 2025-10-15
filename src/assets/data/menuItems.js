export const menuItems = [
  {
    id: 1,
    title: "Analytics",
    image: "https://i.ibb.co/5hHTvKRb/svgviewer-png-output-42.webp",
    route: "/dashboard/analytics",
    parent: false,
    children: [],
    enabled: true
  },
  {
    id: 2,
    title: "Payout",
    image: "https://i.ibb.co/20NyykW9/svgviewer-png-output-41.webp",
    route: "/dashboard/payout",
    parent: false,
    children: [],
    enabled: true
  },
  {
    id: 3,
    title: "Orders",
    image: "https://i.ibb.co/vChqh7TX/svgviewer-png-output-43.webp",
    route: "/dashboard/orders",
    parent: false,
    children: [
        {
      id: 301,
      title: "Orders Received",
      route: "/dashboard/orders/order-received",
      image: "", 
      enabled: true
    },
    {
      id: 302,
      title: "Custom Product Request",
      route: "/orders/custom-product-request",
      image: "",
      enabled: false
    },
    {
      id: 303,
      title: "Item Purchased",
      route: "/dashboard/orders/item-purchased",
      image: "",
      enabled: true
    }
    ],
    enabled: true
  },
  {
    id: 4,
    title: "Media",
    image: "https://i.ibb.co/HDtj7Y6g/svgviewer-png-output-44.webp",
    route: "/dashboard/my-media",
    parent: false,
    children: [],
    enabled: true
  },
  {
    id: 5,
    title: "Chats",
    image: "https://i.ibb.co/nNs119bY/svgviewer-png-output-45.webp",
    route: "/chats",
    parent: false,
    children: [],
    enabled: false // Disabled as in original
  },
  {
    id: 6,
    title: "Subscriptions",
    image: "https://i.ibb.co/4nTx2sMh/svgviewer-png-output-46.webp",
    route: "/dashboard/subscriptions",
    parent: false,
    children: [],
    enabled: true
  },
  // Overflow items (these will appear in the floating panel)
  {
    id: 7,
    title: "Shops",
    image: "https://i.ibb.co/LDwydPyB/svgviewer-png-output-47.webp",
    route: "/shops",
    parent: false,
    children: [],
    enabled: false // Disabled as in original
  },
  {
    id: 8,
    title: "Profile",
    image: "https://i.ibb.co/VWvYhczd/svgviewer-png-output-48.webp",
    route: "/profile",
    parent: false,
    children: [
         {
      id: 801,
      title: "Edit Profile",
      route: "/dashboard/edit-profile",
      image: "",
      enabled: true
    },
    {
      id: 802,
      title: "Subscribers & Followers",
      route: "/profile/subscribers-followers",
      image: "",
      count:"79",
      enabled: false
    },
     {
      id: 803,
      title: "Your Posts",
      route: "/profile/your-posts",
      image: "",
      enabled: false
    },
    {
      id: 804,
      title: "Referrals",
      route: "/dashboard/referrals",
      image: "",
      count:"19",
      enabled: true
    }
    ],
    enabled: true
  },
  {
    id: 9,
    title: "Settings",
    image: "https://i.ibb.co/w5pz6GM/svgviewer-png-output-49.webp",
    route: "/dashboard/settings",
    parent: false,
    children: [],
    enabled: true
  },
  {
    id: 10,
    title: "X Repost",
    image: "https://i.ibb.co/Fkh7SSXw/svgviewer-png-output-50.webp",
    route: "/x-repost",
    parent: false,
    children: [],
    enabled: false // Disabled as in original
  },
  {
    id: 11,
    title: "Blog",
    image: "https://i.ibb.co/JWyS5PwL/svgviewer-png-output-51.webp",
    route: "/blog",
    parent: false,
    children: [],
    enabled: false // Disabled as in original
  }
]
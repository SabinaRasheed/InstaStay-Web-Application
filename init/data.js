const sampleListings = [
    {
      title: "Luxury Safari Tent",
      description:
        "Enjoy the ultimate glamping experience in this luxury safari tent with breathtaking savannah views.",
      image: {
        filename : "listingImage",
        url :  "https://images.unsplash.com/photo-1570129477492-45c003edd2be"
      },
      price: 2800,
      location: "Maasai Mara",
      country: "Kenya",
    },
    {
      title: "Modern Villa with Infinity Pool",
      description:"Dive into luxury in this modern villa featuring an infinity pool with a view of the sunset.",
      image:  {
        filename : "listingImage",
        url : "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"},
      price: 5000,
      location: "Santorini",
      country: "Greece",
    },
    {
      title: "Rustic Farmhouse Retreat",
      description:
        "Reconnect with nature in this cozy farmhouse surrounded by rolling hills and serene landscapes.",
      image: {
        filename : "listingImage",
        url : "https://images.unsplash.com/photo-1445019980597-93fa8acb246c"},
      price: 1100,
      location: "Tuscany",
      country: "Italy",
    },
    {
      title: "Cozy Urban Studio",
      description:
        "Experience the city life in this modern, cozy studio perfect for a quick urban getaway.",
      image: {
        filename : "listingImage",
        url : "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"},
      price: 750,
      location: "Tokyo",
      country: "Japan",
    },
    {
      title: "Idyllic Island Villa",
      description:
        "Escape to this peaceful island villa surrounded by turquoise waters and sandy beaches.",
      image: {
        filename : "listingImage",
        url : "https://images.unsplash.com/photo-1505691938895-1758d7feb511"},
      price: 3200,
      location: "Maldives",
      country: "Maldives",
    },
    {
      title: "Scenic Riverside Cabin",
      description:
        "Relax by the river in this charming cabin with a private deck and stunning views.",
      image: {
        filename : "listingImage",
        url : "https://images.unsplash.com/photo-1507089947368-19c1da9775ae"},
      price: 950,
      location: "Vancouver",
      country: "Canada",
    },
    {
      title: "Charming Cottage by the Bay",
      description:
        "Enjoy the tranquility of bay views in this charming cottage with cozy interiors.",
      image: {
        filename : "listingImage",
        url : "https://images.unsplash.com/photo-1601903727210-6ed01c2e05a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"},
      price: 1300,
      location: "Cape Cod",
      country: "United States",
    },
    {
      title: "Unique Dome Stay",
      description:
        "Stay in a one-of-a-kind geodesic dome surrounded by lush greenery and wildlife.",
      image: {
        filename : "listingImage",
        url : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"},
      price: 1800,
      location: "Queenstown",
      country: "New Zealand",
    },
    {
        title: "Ski Chalet in Aspen",
        description:
          "Hit the slopes in style with this luxurious ski chalet in the world-famous Aspen ski resort.",
        image: {
          filename : "listingImage",
          url : "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGxha2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"},
        price: 4000,
        location: "Aspen",
        country: "United States",
      },
      {
        title: "Secluded Beach House in Costa Rica",
        description:
          "Escape to a secluded beach house on the Pacific coast of Costa Rica. Surf, relax, and unwind.",
        image: {
          filename : "listingImage",
          url : "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"},
        price: 1800,
        location: "Costa Rica",
        country: "Costa Rica",
      }
  ];
  module.exports = { data: sampleListings };
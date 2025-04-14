const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  //   const c = new Campground({ title: "purple field" });
  //   await c.save();
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "67c8b8bfb0bf56abd10f1e5e",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dwhbxvfjh/image/upload/v1741867109/YelpCamp/lu894cd1mj8n6k6kqyw1.jpg",
          filename: "YelpCamp/lu894cd1mj8n6k6kqyw1",
          // _id: new ObjectId('67d2c865f285d5b155701ca5')
        },
        {
          url: "https://res.cloudinary.com/dwhbxvfjh/image/upload/v1741867109/YelpCamp/d5dncm4jdjgcawoqed5q.jpg",
          filename: "YelpCamp/d5dncm4jdjgcawoqed5q",
          // _id: new ObjectId('67d2c865f285d5b155701ca6')
        },
      ],
      // image: `https://picsum.photos/400?random=${Math.random()}`,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});

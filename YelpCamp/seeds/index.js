const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //hard coded author, description and geometry
            author: '5ff49b78ce45db56dcf6222c',
            
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            //image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            geometry : {
                 type : "Point", 
                 coordinates : [
                     cities[random1000].longitude,
                     cities[random1000].latitude,
                ]
                },
            price,
            images: [
                {
                 // _id: 5ffdadb3e722103168922507,
                  url: 'https://res.cloudinary.com/dclvi8p2j/image/upload/v1610460595/YelpCamp/rr7gusvfj8bnceexrfqv.jpg',
                  filename: 'YelpCamp/rr7gusvfj8bnceexrfqv'
                },
                {
                 // _id: 5ffdadb3e722103168922508,
                  url: 'https://res.cloudinary.com/dclvi8p2j/image/upload/v1610460594/YelpCamp/wrfsbogl0xahrgxqhuau.jpg',
                  filename: 'YelpCamp/wrfsbogl0xahrgxqhuau'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
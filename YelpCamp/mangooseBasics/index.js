const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("connected");
});



const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score : Number,
    rating : String,
});

//the name of the model should be capital and single word
const Movie = mongoose.model('Movie', movieSchema);


Movie.insertMany([
    {title:'Titanic', year:2020, score:8,rating: 'R'},
    {title:'Ammabelle', year:2020, score:8,rating: 'R'},
    {title:'Bellie', year:2020, score:8,rating: 'R'},
    {title:'Christmas', year:2020, score:8,rating: 'R'},
    {title:'Sweden', year:2020, score:8,rating: 'R'},
    {title:'Asian', year:2020, score:8,rating: 'R'}
])

.then(data=>{
    console.log("IT WORKED");
    console.log(data);
})





// Setup to allow us to use HEROKU in production and our own local port locally. in this case port 3000
if(process.env.NODE_ENV === 'production'){
  module.exports = {
    mongoURI: 'mongodb+srv://Goran:<Skyrimageofdragons@123>@yum-vlcai.mongodb.net/test?retryWrites=true&w=majority'
  }
} else {
  module.exports = {mongoURI: 'mongodb://localhost/Yummy'}
}
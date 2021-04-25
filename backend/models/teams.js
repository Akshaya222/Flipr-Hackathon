const mongoose=require('mongoose');

const teamSchema= new mongoose.Schema({
    userID: {
      type: String,
      required: true
    },
    players: [String],
    credits: {
      type: Number,
      default: 0
    }
});

var Team = mongoose.model('Team',teamSchema);
module.exports = Team;
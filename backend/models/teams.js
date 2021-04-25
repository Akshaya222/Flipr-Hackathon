const mongoose=require('mongoose');
const teamSchema= new mongoose.Schema({
    userID: {
      type: String,
      required: true
    },
    players: [{}],
    team1: {
      type: String,
      required: true
    },
    team2: {
      type: String,
      required: true
    },
    credits: {
      type: Number,
      default: 0
    }
});
var Team = mongoose.model('Team',teamSchema);
module.exports = Team;
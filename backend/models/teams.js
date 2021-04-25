const mongoose=require('mongoose');

const teamSchema= new mongoose.Schema({
    userID: {
      type: String,
      required: true
    },
    players: [String],
    captain: {
      type: String,
      required: true
    },
    viceCaptain: {
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
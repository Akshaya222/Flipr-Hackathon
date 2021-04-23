const mongoose=require('mongoose');

const teamSchema= new mongoose.Schema({
    userID: {
      type: String,
      required: true
    },
    players: [{
      playerID: {
        type: String,
        required: true
      },
      isCaptain: {
        type: Boolean,
        default: false
      },
      isViceCaptain: {
        type: String,
        default: false
      },
      totalRuns: {
        type: Number,
        default: 0
      }
    }]
});

var Team = mongoose.model('Team',teamSchema);
module.exports = User;
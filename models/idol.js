var mongoose = require("mongoose");

var idolSchema = new mongoose.Schema({
   firstname: String,
   lastname: String,
   nickname: String,
   aka: String,
   height: Number,
   bloodgroup: String,
   address: String,
   favcolor: String,
   favfood: String,
   hobby: String,
   lang: String,
   edu: {
       university: String,
       highschool: String
   },
   image: String,
   description: String,
   createdAt: { type: Date, default: Date.now },
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Idol", idolSchema);

Template.playerHand.helpers({
    // userId: userId,
  player: function(){
    return Meteor.user()
  },  

  playsHand: function(){
    return PlayerHand.find({})
  }

});

Template.playerHand.events({

  "click .clearBoard": function(){
    var hey = Meteor.users.find();
    var balls = [];
    var judge = false;

    // Tasks.update(taskId, { $set: { private: setToPrivate } });

    hey.forEach(function(dude){
      if(!judge){
        judge = true;
        CurUsers.update({
          username: dude._id,
          judge: true
        })
      } else {
        CurUsers.update({
          username: dude._id,
          judge: false
        })
      }
    });

    console.log('righto - ', CurUsers)
  },

  //  Plays a card from the playerHand
  //  Removes that card from the playerHand
  //  draws a new card from the whiteDeck
  //  removes that card from the whiteDeck
  //  can't play a card if user currently has one in play
  "click .testing123": function(){
    var user = Meteor.user()
    console.log("this - ", user.judge)

    if(BoardWhites.find({playedBy: user.username}).count() > 0){
      var what = BoardWhites.find({playedBy: user.username})
      console.log('getting played  - ', what.count())
      return;
    }

    var test = {
      cardType: this.cardType,
      text: this.text,
      expansion: this.expansion,
      playedBy: user.username
    }

    var id = this._id

    PlayerHand.remove({_id: id});
    BoardWhites.insert({cardType: test.cardType, text: test.text, expansion: test.expansion, playedBy: test.playedBy});

    var _entry = WhiteDeck.findOne({});
    var _id = _entry._id
    PlayerHand.insert({
      text: _entry.text,
      expansion: _entry.expansion
    });
    WhiteDeck.remove({_id: _id});

  }


});

Meteor.methods({
  playCard: function(){
    PlayerHand.insert({"cardType":"White","text":"Tester McGilliCutties.","expansion": "Base"});
  }

});



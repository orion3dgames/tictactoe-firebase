<template>
  <div v-if="session">

    <div class="row" >
      <div class="col-sm-7">
        <h5>Game {{hash}}</h5>

        <hr />

        <div v-if="session.started === 1">

          <div v-if="session.player_turn === user.uid">
            <div class="alert alert-success">It's your turn.</div>
          </div>
          <div v-else>
            <div class="alert alert-danger">Waiting for your opponent to play.</div>
          </div>

          <div class="play-area">
            <div v-for='index in 9' :key='index' @click="squareClick((index-1))" class="block">{{ session.play_board[(index-1)] }}</div>
          </div>

          <hr />
        </div>
        <div v-else>

          <div v-if="session.started === 0 && ( session.creator && session.challenger )">
            <div class="alert alert-warning">Game is ready to start. Please press the start button to begin the game...</div>
          </div>

          <div v-if="session.started === 0 && !session.challenger ">
            <div class="alert alert-warning">Waiting for another player to challenge you...</div>
          </div>

        </div>

      </div>
      <div class="col-sm-5">

        <div class="bg-light p-3">

          <div class="btn-group w-100" role="group" aria-label="Game Options Buttons">
            <button @click="leaveGame(session.uid)" class="btn btn-outline-danger" v-if="session.challenger && session.challenger.uid === user.uid">Leave</button>
            <button @click="deleteGame(session.uid)" class="btn btn-outline-secondary" v-if="session.creator.uid === user.uid">Cancel</button>
            <button @click="startGame(session.uid)" class="btn btn-primary" v-if="(session.challenger && session.creator) && session.started === 0">Start</button>
          </div>

          <hr>

          <h5>Scoreboard</h5>
          <hr>
          <table class="table table-bordered table-sm">
            <tbody>
              <tr>
                <th>{{ session.creator.displayName }}</th>
                <td class="text-center" width="100">{{ session.creator.score }}</td>
              </tr>
              <tr v-if="session.challenger">
                <th>{{ session.challenger.displayName }}</th>
                <td class="text-center">{{ session.challenger.score }}</td>
              </tr>
            </tbody>
          </table>

          <h5>Chat</h5>
          <hr>
          <ul class="list-unstyled">
            <li v-for="(msg, index) in session.messages" :key="index">
              <b><small class="text-muted">{{ msg.name }}</small></b>: {{ msg.message }}
            </li>
          </ul>

          <form class="row row-cols-lg-auto g-3 align-items-center" @submit.prevent="sendMessage">
            <div class="input-group mb-3">
              <input type="text" class="form-control" v-model="chat_message" placeholder="Message">
              <button type="submit" class="btn btn-primary">Send</button>
            </div>
          </form>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import router from "../router";

export default {
  name: 'Play',
  data() {
    return {
      chat_message: '',
    }
  },
  computed: {
    hash() {
      return this.session.uid;
    },
    share_url(){
      return window.location;
    },
    session() {
      return this.$store.getters.session(location.hash.replace('#',''));
    },
    user() {
      return this.$store.getters.user;
    }
  },
  mounted: function () {

  },
  updated: function () {

    // IF CREATOR DELETE GAME SESSION, THEN REDIRECT TO HOMEPAGE
    if(!this.session){
      this.$router.push('/');
    }

    // IF CREATOR DELETE GAME SESSION, THEN REDIRECT TO HOMEPAGE
    /*
    if(this.session && !this.session.challenger && this.session.creator.uid !== this.user.uid){
      this.$store.dispatch('joinSession', this.session.uid);
    }*/

  },
  methods: {
    leaveGame(uid){
      this.$store.dispatch('leaveSession', uid);
    },
    deleteGame(uid){
      this.$store.dispatch('deleteSession', uid);
    },
    startGame(uid){
      this.$store.dispatch('startGame', uid);
    },
    sendMessage(){
      this.$store.dispatch('addMessage', {
        'session_id': this.session.uid,
        'message': this.chat_message,
        'name': this.user.displayName,
      });
      this.chat_message = '';
    },
    squareClick(index){
      if(this.session.player_turn === this.user.uid && !this.session.play_board[index]) {
        this.$store.dispatch('clickSquare', {
          'session_id': this.session.uid,
          'uid': this.user.uid,
          'index': index,
        });
      }
    },

  }
}
</script>
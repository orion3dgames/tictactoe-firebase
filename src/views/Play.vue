<template>
  <div v-if="session">

    <div class="bg-light p-3 mb-3">
      <div class="row align-items-center">
        <div class="col-auto">
          <button class="btn btn-outline-primary" type="button" @click="copyLink()">Copy Link</button>
        </div>
        <div class="col-auto" v-if="session.challenger">
          <button @click="leaveGame(session.uid)" class="btn btn-secondary" v-if="session.challenger.uid === user.uid">Leave Game</button>
        </div>
        <div class="col-auto" v-if="session.creator">
          <button @click="deleteGame(session.uid)" class="btn btn-secondary" v-if="session.creator.uid === user.uid">Delete Game</button>
        </div>
        <div class="col-auto" v-if="session.challenger && session.creator && session.started === 0">
          <button @click="startGame()" class="btn btn-primary" >Start Game</button>
        </div>
      </div>
    </div>

    <div class="row" >
      <div class="col-sm-8">
        <h5>Game {{hash}}</h5>
        <hr>
        {{user}}
        <hr>
        {{session}}

        <div v-if="session.started === 1">

          <div class="alert alert-success">It's {{session.player_turn}} turn.</div>

          <div class="play-area">
            <div v-for='index in 9' :key='index' @click="squareClick((index-1))" class="block">{{ session.play_board[(index-1)] }}</div>
          </div>

          <hr />
        </div>
        <div v-else>

          <div v-if="session.started === 0 && session.playerCount === 2 ">
            <div class="alert alert-warning">Game is ready to start. Please press the start button to begin the game...</div>
          </div>

          <div v-if="session.started === 0 && session.playerCount < 2 ">
            <div class="alert alert-warning">Waiting for another player to connect...</div>
          </div>

        </div>

      </div>
      <div class="col-sm-4">

        <table class="table table-bordered table-sm">
          <thead class="table-light">
            <tr>
              <th v-for="player in session.players" :key="player.socket_id" class="text-center">{{ player.name }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-for="player in session.players" :key="player.socket_id" class="text-center"><span class="display-2">{{ player.score }}</span></td>
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
    console.log('[mounted] Play Page Mounted', this.user);

    // IF CREATOR DELETE GAME SESSION, THEN REDIRECT TO HOMEPAGE
    if(!this.session){
      this.$router.push('/');
    }

  },
  methods: {
    leaveGame(uid){
      this.$store.dispatch('leaveSession', uid);
    },
    deleteGame(uid){
      this.$store.dispatch('deleteSession', uid);
    },
    startGame(){

    },
    sendMessage(){
      this.$store.dispatch('addMessage', {
        'session_id': this.session.uid,
        'message': this.chat_message,
        'name': this.user.name,
      });
      this.chat_message = '';
    },
    copyLink(){
      var copyText = this.share_url;
      navigator.clipboard.writeText(copyText);
      alert("Link Copied! Please share with a friend to start a game.");
    },
    squareClick(index){
      if(this.session.player_turn === this.name && !this.session.play_board[index]) {
        this.$socket.emit('click_square', {
          'hash': this.hash,
          'name': this.name,
          'index': index
        });
      }
    },

  }
}
</script>
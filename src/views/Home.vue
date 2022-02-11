<template>
  <div v-if="user">

    <button @click="createGame()" class="btn btn-primary">Start New Game</button>

    <hr>

    <div v-if="sessions.length > 0">
      <h5>Existing Games</h5>
      <table class="table table-sm table-bordered">
        <thead>
          <tr>
            <th>Game</th>
            <th>Creator</th>
            <th></th>
          </tr>
        </thead>
        <tbody v-for="session in sessions" :key="session.uid">
          <tr v-if="user.uid !== session.creator.uid">
            <td>{{session.uid}}</td>
            <td>{{session.creator.email}}</td>
            <td class="text-end">
              <button @click="joinGame(session.uid)" class="btn btn-primary">Challenge</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else>
      <div class="alert bg-light">No games available...</div>
    </div>

  </div>
</template>

<script>

import { mapGetters } from "vuex";
import router from "../router";

export default {
  name: 'Home',
  components: {

  },
  data() {
    return {
      test: 1,
    }
  },
  computed: {
    ...mapGetters({
      user: "user",
      sessions: "sessions",
    })
  },
  mounted: function () {

  },
  methods: {

    createGame(){
      this.$store.dispatch('addSession').then(session => {
        router.push('/play/#'+session.uid);
      });
    },

    joinGame(hash){
      this.$store.dispatch('joinSession', hash).then(session => {
        this.$router.push({ path: 'play/#'+hash });
      });
    },

  },
}
</script>
<template>
    <div class="container">
      <div class="game-container m-sm-3">
        <div v-if="user">

          <header class="pt-2">
            <div class="row">
              <div class="col">
                <h3 class="m-0 d-inline-block me-2">
                  <router-link to="/" class="">{{ appTitle }}</router-link>
                </h3>
                <span class="badge bg-secondary">{{ appVersion }}</span>
              </div>
              <div class="col text-end">
                <div class="p-2">
                  Hi <router-link to="/profile"><b>{{ user.displayName}}</b></router-link>
                  <!--<button @click="logout()" class="btn btn-sm btn-secondary">Logout</button>-->
                </div>
              </div>
            </div>
          </header>

          <hr />

          <slot />

          <footer>
            <hr />
            GITHUB:
            <a class="text-muted" href="https://github.com/oriongunning/tictactoe-firebase" target="_blank">https://github.com/oriongunning/tictactoe-firebase</a>
          </footer>
        </div>
        <div v-else>
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    appTitle() {
      return this.$store.getters.appTitle;
    },
    appDescription() {
      return this.$store.getters.appDescription;
    },
    appVersion() {
      return this.$store.getters.appVersion;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    },
  }
};

export class Default {

}
</script>


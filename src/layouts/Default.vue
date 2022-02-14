<template>
  <div class="container" v-if="user">

    <header class="pt-2">
      <div class="float-end">
        Hi <router-link to="/profile"><b>{{ user.name}}</b></router-link>
        &nbsp;
        <button @click="logout()" class="btn btn-sm btn-secondary">Logout</button>
      </div>
      <h3 class="m-0">
        <router-link to="/">{{ appTitle }}</router-link>
        <span class="badge bg-secondary">{{ appVersion }}</span>
      </h3>
    </header>

    <hr />

    <slot />

    <footer>
      <hr />
      Code available at:
      <a class="text-muted" href="https://github.com/oriongunning/tictactoe-firebase" target="_blank">https://github.com/oriongunning/tictactoe-firebase</a>
    </footer>
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


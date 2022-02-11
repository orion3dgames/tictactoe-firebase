<template>
  <div class="container" v-if="user">

    <header class="pt-2">
      <h3 class="m-0">{{ appTitle }} <span class="badge bg-secondary">{{ appVersion }}</span></h3>
      <div class="">
        <div class="">Hi <b>{{ user.name}}</b> <button @click="logout()">Logout</button></div>
      </div>
    </header>

    <hr />

    <slot />

    <footer>
      <hr />
      Code available at:
      <a class="text-muted" href="https://github.com/oriongunning/tic-tac-toe" target="_blank">https://github.com/oriongunning/tic-tac-toe</a>
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


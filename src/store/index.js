import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import router from '../router'

import { auth, database, ref, set, push, onValue, remove } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

function formatPlayer(user){
  return {
    uid: user.uid,
    email: user.email,
    score: 0
  };
}

export default new Vuex.Store({

  state: {
    appTitle: process.env.VUE_APP_TITLE || 'NO TITLE FOUND IN MANIFEST.JSON',
    appDescription: process.env.VUE_APP_DESCRIPTION || 'NO DESCRIPTION FOUND IN MANIFEST.JSON',
    appVersion: process.env.VUE_APP_VERSION || 'NO VERSION FOUND IN MANIFEST.JSON',
    user: false,
    sessions: [],
    MAX_PLAYERS: 2,
    DEFAULT_BOARD: ["", "", "", "", "", "", "", "", ""],
    WINNING_CONDITIONS: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ],
    SYMBOL_X: "X",
    SYMBOL_O: "O",
  },

  getters: {
    appVersion: (state) => {
      return state.appVersion
    },
    appTitle: (state) => {
      return state.appTitle
    },
    appDescription: (state) => {
      return state.appDescription
    },
    user(state) {
      return state.user;
    },
    sessions(state) {
      return state.sessions;
    },
    session: (state) => (id) => {
      return state.sessions.find(session => session.uid == id);
    }
  }
  ,

  mutations: {
    SET_SESSIONS (state, sessions) {
      state.sessions = sessions
    },
    SET_USER (state, user) {
      state.user = user
    },
    CLEAR_USER (state) {
      state.user = null
    }
  },

  actions: {

    async login ({ commit }, details) {
      const { email, password } = details

      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch(error.code) {
          case 'auth/user-not-found':
            alert("User not found")
            break
          case 'auth/wrong-password':
            alert("Wrong password")
            break
          default:
            alert("Something went wrong")
        }

        return
      }

      commit('SET_USER', auth.currentUser);

      router.push('/')
    },

    async register ({ commit}, details) {
      const { email, password } = details

      try {
        await createUserWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch(error.code) {
          case 'auth/email-already-in-use':
            alert("Email already in use")
            break
          case 'auth/invalid-email':
            alert("Invalid email")
            break
          case 'auth/operation-not-allowed':
            alert("Operation not allowed")
            break
          case 'auth/weak-password':
            alert("Weak password")
            break
          default:
            alert("Something went wrong")
        }

        return
      }

      let player = formatPlayer(auth.currentUser);

      commit('SET_USER', player);

      set(ref(database, 'players/' + player.uid), player);

      router.push('/')
    },

    async logout ({ commit }) {
      await signOut(auth)
      commit('CLEAR_USER')
      router.push('/login')
    },

    addSession ({ commit, state}) {
      return new Promise((resolve) => {
        const dbRef = ref(database, 'sessions');
        const newSessionRef = push(dbRef);
        let session = {
          'uid': newSessionRef.key,
          'players': [],
          'player_turn': "",
          'messages': "",
          'current_symbol': state.SYMBOL_O,
          'play_board': [...state.DEFAULT_BOARD],
          'started': 0,
          'draw': 0,
          'creator': formatPlayer(state.user),
          'challenger': false
        };
        set(newSessionRef, session);
        resolve(session);
      })
    },

    joinSession ({ commit, state }, session_id) {
      console.log('JOIN SESSION', session_id);
      set(ref(database, 'sessions/' +session_id+"/challenger"), formatPlayer(state.user));
      return true;
    },

    deleteSession ({ commit, state }, session_id) {
      console.log('DELETE SESSION', session_id);
      const dbRef = ref(database, 'sessions/'+session_id);
      remove(dbRef);
      router.push('/');
    },

    leaveSession ({ commit, state }, session_id) {
      console.log('REMOVE CHALLENGER FROM SESSION', session_id);
      const dbRef = ref(database, 'sessions/'+session_id+'/challenger/');
      remove(dbRef);
    },

    fetchSessions ({ commit }) {
      const dbRef = ref(database, 'sessions');
      onValue(dbRef, (snapshot) => {
        let sessions = [];
        snapshot.forEach((childSnapshot) => {
          sessions.push(childSnapshot.val());
        });
        commit('SET_SESSIONS', sessions)
      }, {
        onlyOnce: false
      });
    },

    fetchUser ({ commit }) {
      auth.onAuthStateChanged(async user => {
        if (user === null) {
          commit('CLEAR_USER');
          router.push('/login')
        } else {
          commit('SET_USER', formatPlayer(user))
          if (router && router.currentRoute.name === 'login') {
            // ADD TO DB
            router.push('/')
          }
        }
      })
    }

  }

})

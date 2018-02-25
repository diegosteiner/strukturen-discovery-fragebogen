import Vue from 'vue';
import Vuex from 'vuex';
// import { firebaseMutations } from 'vuexfire'
import { db } from "./services/firebase";
import Firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: false,
  state: {
    user: null,
    person: {
      name: "",
      email: "",
      description: "",
      my_role: "",
      my_other_role: "",
      relations: [
      ]
    }
  },
  getters: {
    getUser: state => {
      return state.user;
    },
    getPerson: state => {
      return state.person
    }
  },
  mutations: {
    setUser: state => {
      state.user = Firebase.auth().currentUser;
      state.person.email = state.user.email;
    },
    setPerson: (state, person) => {
      state.person = person
    },
    addRelation: state => {
      state.person.relations.push({
        contact_mail: "",
        contact: "",
        contact_description: "",
        role: "",
        other_role: ""
      });
    },
  },
  actions: {
    setUser: context => {
      context.commit('setUser');
    },
    setPerson: (context, person) => {
      context.commit('setPerson', person);
      context.dispatch('savePersonToDatabase');
    },
    addRelation: ({ commit }) => {
      commit('addRelation');
    },
    getPersonFromDatabase: context => {
      return new Promise((resolve, reject) => {

        let uid = context.getters.getUser.uid;

        if (!uid) { reject(); }

        db.ref('people/' + uid).on("value", function (snapshot) {
          let val = snapshot.val();
          if (val == null) { reject() }
          context.commit('setPerson', snapshot.val())
          resolve();
        });
      });
    },
    savePersonToDatabase: context => {
      const uid = context.getters.getUser.uid;
      if (!uid) { return false; }

      db.ref('people/' + uid).set(context.getters.getPerson);
    }
  }
});

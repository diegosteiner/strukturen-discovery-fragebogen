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
    dataSaved: false,
    name: "",
    email: "",
    description: "",
    role: "",
    relations: []
  },
  getters: {
    getPerson(state) {
      return {
        name: state.name,
        email: state.email,
        description: state.description,
        my_role: state.role,
        relations: state.relations,
      }
    }
  },
  mutations: {
    setDataSaved: (state, bool) => {
      state.dataSaved = bool;
    },
    setUser: (state, user) => {
      state.user = user;
      if (user != null) {
        state.email = state.user.email;
      }
    },
    setName: (state, name) => {
      state.name = name;
      state.dataSaved = false;
    },
    setDescription: (state, description) => {
      state.description = description;
      state.dataSaved = false;
    },
    setRole: (state, role) => {
      state.role = role;
      state.dataSaved = false;
    },
    setRelation: (state, index, relation) => {
      // Vue.set(state.relations, index, relation)
      state.dataSaved = false;
    },
    setPerson: (state, person) => {
      state.name = person.name;
      state.email = person.email;
      state.description = person.description;
      state.role = person.my_role;
      state.relations = person.relations || [];
    },
    removeRelation: (state, index) => {
      state.relations.splice(index, 1)
      state.dataSaved = false;
    },
    addRelation: state => {
      state.relations.push({
        contact_mail: "",
        contact: "",
        contact_description: "",
        role: "",
        other_role: ""
      });
      state.dataSaved = false;
    },
  },
  actions: {
    setUser: context => {
      context.commit('setUser', Firebase.auth().currentUser);
    },
    addRelation: ({ commit }) => {
      commit('addRelation');
    },
    getPersonFromDatabase: context => {
      return new Promise((resolve, reject) => {

        const uid = context.state.user.uid;

        if (!uid) { reject("No uid"); }

        db.ref('people/' + uid).on("value", function (snapshot) {
          let val = snapshot.val();
          if (val != null) {
            console.debug('Setting Person from Database')
            context.commit('setPerson', snapshot.val())
            context.commit('setDataSaved', true);
          }
          resolve();
        });
      });
    },
    savePersonToDatabase: context => {
      const uid = context.state.user.uid;
      if (!uid) { return false; }
      return db.ref('people/' + uid).set(context.getters.getPerson).then(() => {
        context.commit('setDataSaved', true);
      });
    }
  }
});

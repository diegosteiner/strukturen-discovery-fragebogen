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
    moreEmails: "",
    description: "",
    role: "",
    relations: [],
    roles: [],
    topics: []
  },
  getters: {
    getPerson(state) {
      return {
        name: state.name,
        email: state.email,
        moreEmails: state.moreEmails,
        description: state.description,
        my_role: state.role,
        relations: state.relations
      }
    },
    getRoles(state) {
      return state.roles
    },
    getTopics(state) {
      return state.topics
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
    setMoreEmails: (state, moreEmails) => {
      state.moreEmails = moreEmails;
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
      state.moreEmails = person.moreEmails;
      state.description = person.description;
      state.role = person.my_role;
      state.relations = (person.relations || []).filter((r) => r !== undefined && r !== null);
    },
    removeRelation: (state, index) => {
      state.relations.splice(index, 1)
      state.dataSaved = false;
    },
    setRoles: (state, roles) => {
      Object.assign(state.roles, roles)
    },
    setTopics: (state, topics) => {
      Object.assign(state.topics, topics)
    },
    addRelation: state => {
      state.relations.push({
        contact_mail: "",
        contact: "",
        topics: "",
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

        db.ref('people/' + uid).once("value", function (snapshot) {
          let val = snapshot.val();
          if (val != null) {
            context.commit('setPerson', snapshot.val())
            context.commit('setDataSaved', true);
          }
          resolve();
        });
      });
    },
    getRolesFromDatabase: context => {
      return new Promise((resolve, reject) => {

        db.ref('roles/').once("value", function (snapshot) {
          let val = snapshot.val();
          if (val != null) {
            context.commit('setRoles', snapshot.val())
          }
          resolve();
        });
      });
    },
    getTopicsFromDatabase: context => {
      return new Promise((resolve, reject) => {
        db.ref('topics/').once("value", function (snapshot) {
          let topics = snapshot.val();
          if (topics != null) {
            context.commit('setTopics', topics);
          }
          resolve();
        });
      });
    },
    savePersonToDatabase: context => {
      const uid = context.state.user.uid;
      if (!uid) { return false; }
      return db.ref('people/' + uid).update(context.getters.getPerson).then(() => {
        context.commit('setDataSaved', true);
      });
    },
    saveRoleToDatabase: context => {
      const roles = context.getters.getPerson.relations.map((val) => { return val.role });
      const persistedRoles = context.getters.getRoles;
      const b = roles.filter(e => {
        return persistedRoles.indexOf(e) == -1
      });
      if (b.length > 0) {
        return db.ref('roles/').set(persistedRoles.concat(b))
      }
    }
  }
});


<template>
  <div>
    <h1>Umfrage Strukturen Pfadi Züri</h1>
    <p>
      Mit dieser Umfrage möchten wir die Strukturen der Pfadi Züri besser kennenlernen und verstehen.
    </p>
    <p>
      Bitte fülle deine Personalien sowie eine Beschreibung deiner Rolle aus.
    </p>
    <form v-on:submit.prevent="save">
      <div id="mainForm">
          <label>E-Mail Adresse: {{ person.email }}</label>

          <label>Mein Name</label>
          <input v-model="person.name" required>

          <label>Meine Rolle</label>
          <input type="text" name="role" v-model="person.my_role" list='roles' />
          <datalist id="roles">
            <option v-for="role in roles" :value="role.value">{{ role.text }}</option>
          </datalist>

          <label>In dieser Rolle mache ich folgendes</label>
          <textarea rows="6" cols="30" v-model="person.description" required></textarea>
      </div>

      <div id="relations">
        <h3>Ich habe Kontakt mit:</h3>
        <relation v-for="relation in person.relations" :relation='relation'></relation>
        <button class="button" type='button' @click="addRow">+ Kontakt hinzufügen</button>
      </div>
      <button v-bind:class="{ button: true, ok: dataSaved }" type='submit'>Speichern</button>
    </form>
  </div>
</template>

<script>
import Relation from "./Relation.vue";

export default {
  name: "Person",
  data() {
    return {
      roles: [
        { text: "Coach", value: "coach" },
        { text: "Kantonsleiter/in", value: "kal" },
        { text: "Mitglied Kantonsleitung", value: "kalei" }
      ]
    };
  },
  components: {
    relation: Relation
  },
  created: function() {
    this.$store.dispatch("getPersonFromDatabase");
  },
  computed: {
    dataSaved() {
      return this.$store.getters.getDataSaved;
    },
    person: {
      get() {
        return this.$store.getters.getPerson;
      },
      set(person) {
        this.$store.commit("setPerson", person);
      }
    }
  },
  methods: {
    addRow: function() {
      this.$store.dispatch("addRelation");
      this.save();
    },
    save: function() {
      return this.$store.dispatch("savePersonToDatabase");
    }
  }
};
</script>
<style>
#mainForm {
  border: 2px solid rgb(15, 105, 175);
  padding: 15px;
}

@keyframes ok {
  0% {
    background-color: rgb(15, 105, 175);
  }
  1% {
    background-color: rgb(15, 175, 23);
  }
  100% {
    background-color: rgb(15, 105, 175);
  }
}

.button {
  height: 40px;
  background-color: rgb(15, 105, 175);
  color: white;
  border: none;
  margin-top: 10px;
}

.ok {
  animation: ok 1s 1;
  animation-timing-function: linear;
}

label {
  margin: 1rem 0 0.5rem 0;
  display: block;
}

input,
select,
button {
  max-width: 480px;
}

input,
select,
textarea {
  border: 1px solid gray;
  padding: 0.35rem;
  display: block;
  width: 100%;
}
</style>

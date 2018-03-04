
<template>
  <div>
    <h1>Umfrage Strukturen Pfadi Züri</h1>
    <p>
      Mit dieser Umfrage möchten wir die Strukturen der Pfadi Züri besser kennenlernen und verstehen.
    </p>
    <p>
      Bitte fülle deine Personalien sowie eine Beschreibung deiner Rolle aus
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras euismod, ipsum quis placerat pretium, libero justo tincidunt
      sem, in mattis mi mi sed augue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
      Ut luctus pulvinar diam, luctus semper justo gravida sit amet. Praesent tempus enim quis volutpat rutrum.
      Mauris venenatis bibendum ante. Duis non iaculis lorem. Ut quis lectus vitae lorem imperdiet viverra. Suspendisse potenti.
    </p>
    <form v-on:submit.prevent="save">
      <div id="mainForm">
        E-Mail Adresse: {{ person.email }}<br />
          <p>Mein Name: <input v-model="person.name"></p>
          <p>
            Meine Rolle: <select v-model="person.my_role">
            <option v-for="role in roles" :value="role.value">
                {{role.text}}
              </option>
            </select>
            Andere: <input type="text" v-model="person.my_other_role" />
          </p>
          In dieser Rolle mache ich folgendes: <br />
          <textarea rows="6" cols="30" v-model="person.description"></textarea><br />
      </div>

      <div id="relations">
        <h3>Ich habe Kontakt mit:</h3>
        <relation v-for="relation in person.relations" :relation='relation'></relation>
        <button v-bind:class="{ button: true, ok: dataSaved }" type='submit'>Speichern</button>
      </div>
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

textarea {
  width: 100%;
}

input,
select,
textarea {
  border: 1px solid gray;
}
</style>

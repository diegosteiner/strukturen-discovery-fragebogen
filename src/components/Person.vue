
<template>
  <div>
    <h1>Umfrage Strukturen Pfadi Züri</h1>
    <p>
      Wir möchten den Aufbau unseres Kantonalverbandes besser verstehen und wollen wissen wer warum wie mit wem in Kontakt steht.
      <br />Und dafür benötigen wir deine Hilfe! Bitte fülle diesen Fragebogen möglichst genau aus (dauert etwa 10min)
    </p>
    <p>
      <h3>Mache folgendes:</h3>
      <ol>
        <li>Fülle deine Personalien sowie eine Beschreibung deiner Rolle aus.</li>
        <li>Füge für jeden Kontakt den du (in der Pfadi) pflegst eine Relation hinzu</li>
        Pro Kontakt:
        <li>Fülle den Namen des Kontakts aus (am liebsten den Pfadinamen)</li>
        <li>Fülle die Mail-Adresse aus (bitte keine Verteiler-Adressen verwenden)</li>
        <li>Sag uns was die Rolle des Kontaktes ist. (Wenn die Rolle noch nicht im Dropdown vorhanden ist, schreib die Bezeichnung einfach ins Feld)</li>
        <li>Beschreib mit einigen Stichworten was die Zusammenarbeit mit diesem Kontakt beinhaltet</li>
      </ol>
      <h3>Wichtig dabei:</h3>
      <ul>
        <li>nur Kontakte innerhalb der Pfadi eintragen (nicht zur Gemeinde oder sonst extern)</li>
        <li>keine Verteiler-Mailadressen verwenden, nur persönliche</li>
        <li>Speichere das Formular zwischendurch ab (es kann beliebig oft gespeichert werden)</li>
        <li>Du siehst anhand des Speicher-Buttons ob du noch ungespeicherte Änderungen im Formular hast</li>
      </ul>
    </p>
    <hr/>
    <h2>Ich bin</h2>
    <form v-on:submit.prevent="saveToDatabase">
      <div id="mainForm">
          <label>E-Mail Adresse: {{ email }}</label>

          <label>Mein Name</label>
          <input v-model="name" required>

          <label>Meine Rolle</label>
          <input type="text" name="role" v-model='role' list='roles' />
          <datalist id="roles">
            <option v-for="r in roles" :value="r">{{ r }}</option>
          </datalist>

          <label>In dieser Rolle mache ich folgendes</label>
          <textarea rows="6" cols="30" v-model="description" required></textarea>
      </div>
      <button v-bind:class="{ button: true, ok: dataSaved }" type='submit'>
        <span v-show="dataSaved">Daten sind gespeichert</span>
        <span v-show="!dataSaved">Daten speichern</span>
      </button>

      <div id="relations">
        <h3>Ich habe Kontakt mit:</h3>
        <relation v-for="(relation, index) in relations" :key="index" :relation='relation'></relation>
        <button class="button" type='button' @click="addRow">+ Kontakt hinzufügen</button>
      </div>
      <button v-bind:class="{ button: true, ok: dataSaved }" type='submit'>
        <span v-show="dataSaved">Daten sind gespeichert</span>
        <span v-show="!dataSaved">Daten speichern</span>
      </button>
    </form>
  </div>
</template>

<script>
import Relation from "./Relation.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Person",
  components: {
    relation: Relation
  },
  computed: {
    name: {
      get() {
        return this.$store.state.name;
      },
      set(value) {
        this.$store.commit("setName", value);
      }
    },
    role: {
      get() {
        return this.$store.state.role;
      },
      set(value) {
        this.$store.commit("setRole", value);
      }
    },
    description: {
      get() {
        return this.$store.state.description;
      },
      set(value) {
        this.$store.commit("setDescription", value);
      }
    },
    roles: {
      get() {
        return this.$store.getters.getRoles;
      }
    },
    ...mapState(["email", "relations", "dataSaved"])
  },
  methods: {
    addRow: function() {
      this.$store.commit("addRelation");
    },
    saveToDatabase: function() {
      this.$store.dispatch("saveRoleToDatabase");
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
  height: 35px;
  background-color: rgb(15, 105, 175);
  color: white;
  border: none;
  margin-top: 10px;
  border-radius: 10px;
}

.delete {
  border: 2px solid #cc0000;
  background-color: rgba(15, 105, 175, .7);
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
  box-sizing: border-box;
}
</style>


<template>
  <div>
    <h1>Umfrage Strukturen Pfadi Züri</h1>
    <p>
      Wir möchten den Aufbau unseres Kantonalverbandes (Pfadi Züri) besser verstehen. Daher möchten wir gerne wissen, wer warum und wie mit wem in Kontakt steht. Dafür benötigen wir deine Hilfe! Bitte füll diesen Fragebogen möglichst genau aus – vielen Dank! (Dauer ca. 10 Minuten)
    </p>
    <h3>Mache folgendes:</h3>
    <ol>
      <li>Fülle deine Personalien aus.</li>
      <li>Füge für jeden Kontakt den du in der Pfadi Züri pflegst eine Beziehung hinzu
      <li>Fülle den Namen des Kontakts aus (am liebsten den Pfadinamen)</li>
      <li>Fülle die Mail-Adresse aus (bitte keine Verteiler-Adressen verwenden)</li>
      <li>Sag uns was die Rolle des Kontaktes ist. (Wenn die Rolle noch nicht im Dropdown vorhanden ist, schreib die Bezeichnung einfach ins Feld und drücke «Enter»)</li>
      <li>Beschreib mit einigen Stichworten was die Zusammenarbeit mit diesem Kontakt beinhaltet</li>
    </ol>
    <h3>Wichtig dabei:</h3>
    <ul>
      <li>nur Kontakte innerhalb der Pfadi Züri eintragen (nicht zur Gemeinde oder sonst extern)</li>
      <li>keine Verteiler-Mailadressen verwenden, nur persönliche</li>
      <li>Speichere das Formular zwischendurch ab (es kann beliebig oft gespeichert werden)</li>
      <li>Du siehst anhand des Speicher-Buttons ob du noch ungespeicherte Änderungen im Formular hast.</li>
    </ul>
    <p>Liebe Grüsse euer Projekt-Team <br />
    Bei Fragen: <a href="mailto:strukturumfrage@pfadizueri.ch">strukturumfrage@pfadizueri.ch</a></p>
    <hr/>
    <h2>Ich bin</h2>
    <form v-on:submit.prevent="saveToDatabase">
      <div id="mainForm">
          <label>E-Mail Adresse: {{ email }}</label>

          <label>Mein Name *</label>
          <input v-model="name" required>

          <label>Weitere E-Mail Addressen, die du benutzt: </label>
          <textarea rows="6" cols="30" v-model="moreEmails"></textarea>

          <!-- <label>Meine Rolle *</label>
          <input type="text" name="role" v-model='role' list='roles' />

          <label>In dieser Rolle mache ich folgendes</label>
          <textarea rows="6" cols="30" v-model="description" required></textarea> -->
      </div>
      <button v-bind:class="{ button: true, ok: dataSaved }" type='submit'>
        <img class="icon" src="../assets/save.png"/>
        <span v-show="dataSaved">Daten sind gespeichert</span>
        <span v-show="!dataSaved">Daten speichern</span>
      </button>

      <div id="relations">
        <h3>Ich habe Kontakt mit:</h3>
        <relation v-for="(relation, index) in relations" :key="index" :relation='relation'></relation>
        <button class="button" type='button' @click="addRow">
          <img class="icon" src="../assets/add.png"/>
          Kontakt hinzufügen</button>
      </div>
      <button v-bind:class="{ button: true, ok: dataSaved }" type='submit'>
        <img class="icon" src="../assets/save.png"/>
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
    moreEmails: {
      get() {
        return this.$store.state.moreEmails;
      },
      set(value) {
        this.$store.commit("setMoreEmails", value);
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

.delete {
  border: 2px solid rgba(15, 105, 175);
  background-color: rgba(15, 105, 175, 0.7);
}

.ok {
  animation: ok 1s 1;
  animation-timing-function: linear;
}
</style>

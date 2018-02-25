<template>
  <div>
    <h1>Hallo {{ name }}</h1>
    Mail: {{ email }}<br />

    <form @submit.prevent='save'>
      Name: <input v-model="value.name"><br />
      Beschreibung: <textarea v-model="value.description" placeholder="description"></textarea><br />
      Rolle: <select v-model="options">
        <option v-for="(xvalue, key) in options" :value="key" :key="key">
          {{xvalue}}
        </option>
      </select><br />
      <button type='submit'>save</button>
    </form>
  </div>
</template>

<script>
import { db } from "../services/firebase";

export default {
  name: "Person",
  props: ["value"],
  computed: {
    name: function() {
      return this.value.name;
    },
    email: function() {
      return this.value.email;
    }
  },
  data() {
    return {
      description: "",
      options: {
        "1": "Coach",
        "2": "Kantonsleitungsmitglied"
      }
    };
  },
  methods: {
    save() {
      this.$root.$firebaseRefs.person.set(this.value);
    },
    addRelationship() {}
  }
};
</script>

<template>
  <div>
    <h1>Hallo {{ name }}</h1>
    Mail: {{ email }}<br />
    
    <form @submit.prevent='save'>
      Name: <input v-model="name"><br />
      Beschreibung: <textarea v-model="description" placeholder="description"></textarea><br />
      Rolle: <select v-model="options">
        <option v-for="(value, key) in options" :value="key">
          {{value}}
        </option>
      </select><br />
      <button type='submit'>save</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Person',
  data () {
    return {
      name: "",
      email: "",
      description: '',
      options: {
         "1":"Coach",
         "2":"Kantonsleitungsmitglied"
      }
    }
  },
  methods: {
    save() {
      alert(this.name);
    }
  }
}
</script>

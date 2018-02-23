
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
    <p>
    <div id="mainForm">
      E-Mail Adresse: {{ email }}<br />
      <form @submit.prevent='save'>
        <p>Mein Name: <input v-model="name"></p>
        <p>
          Meine Rolle: <select v-model="my_role">
          <option v-for="role in roles" :value="role.value">
              {{role.text}}
            </option>
          </select>
          Andere: <input type="text" v-model="my_other_role" />
        </p>
        In dieser Rolle mache ich folgendes: <br />
        <textarea rows="6" cols="60" v-model="description"></textarea><br />
      </form>
    </div>

    <div id="relations">
      <h3>Ich habe Kontakt mit:</h3>
      <div v-for="relation in relations">
        Name: <input type="text" name="contact" v-model="relation.contact"/><br />
        E-Mail: <input type="text" name="contact_mail"  v-model="relation.contact_mail"/><br />
        <p>
          In der Rolle als: <select v-model="relation.role">
          <option v-for="role in roles" :value="role.value">
              {{role.text}}
            </option>
          </select>
          Andere: <input type="text" v-model="relation.other_role" />
        </p>
        Mit folgenden Themen: <br />
        <textarea rows="6" cols="60" name="contact_description" v-model="relation.contact_description"></textarea>
      </div>
      <button class="button" @click="addRow">+ Kontakt hinzufügen</button>
    </div>
    <div>
      <button class="button" type='submit'>Speichern</button>
    </div>
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
      my_role: '',
      my_other_role: '',
      roles: [
        { text: 'Coach', value: 'coach' },
        { text: 'Kantonsleiter/in', value: 'kal' },
        { text: 'Mitglied Kantonsleitung', value: 'kalei' }
      ],
      relations: [
        { 
          contact_mail: "mail", 
          contact: "name", 
          contact_description: "descr", 
          role: "kal", 
          other_role: ''}
      ]
    }
  },
  methods: {
    save() {
      alert(this.name);
    },
    addRow() {
      this.relations.push({name:"",job:""});
    }
  }
}
</script>
<style>
  #relations {
    width: 50%;
  }

  #relations div {
    border: 1px solid rgb(15,105,175);
    padding: 15px;
    margin-top: 10px;
  }

  #mainForm {
    border: 1px solid rgb(15,105,175);
    padding: 15px;
  }

  .button {
    height: 40px;
    background-color: rgb(15,105,175);
    color: white;
    border: none;
    margin-top: 10px;
  }
</style>

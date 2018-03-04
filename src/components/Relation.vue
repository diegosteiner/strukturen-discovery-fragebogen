
<template>
  <div class="relation">
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
    <textarea rows="6" cols="30" name="contact_description" v-model="relation.contact_description"></textarea>
  </div>
</template>

<script>
export default {
  name: "Relation",
  props: ["relation"],
  data() {
    return {
      roles: [
        { text: "Coach", value: "coach" },
        { text: "Kantonsleiter/in", value: "kal" },
        { text: "Mitglied Kantonsleitung", value: "kalei" }
      ]
    };
  }
};
</script>
<style>
.relation {
  border: 1px solid rgb(15, 105, 175);
  padding: 15px;
  margin-top: 10px;
}
</style>

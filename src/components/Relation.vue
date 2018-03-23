
<template>
  <div class="relation">
    <label>Name*</label>
    <input type="text" name="contact" v-model="relation.contact" required/>

    <label>E-Mail *</label>
    <input type="email" name="contact_mail"  v-model="relation.contact_mail" required/>

    <label>In der Rolle als *</label>
    <input type="text" name="role" v-model="relation.role" list='roles' required/>

    <label>Mit folgenden Themen *</label>
    <textarea rows="6" cols="30" name="contact_description" v-model="relation.contact_description"></textarea>
  </div>
</template>

<script>
import Autocomplete from "v-autocomplete";

export default {
  name: "Relation",
  props: ["relation"],
  components: {
    autocomplete: Autocomplete
  },
  methods: {
    getRoleLabel(item) {
      if (item !== null) {
        return item.name;
      }
    }
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

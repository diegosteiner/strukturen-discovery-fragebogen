
<template>
  <div class="relation">
    <label>Name*</label>
    <input type="text" name="contact" v-model="contact_name" required/>

    <label>E-Mail *</label>
    <input type="email" name="contact_mail"  v-model="contact_email" required/>

    <label>In der Rolle als *</label>
    <input type="text" name="role" v-model="contact_role" list='roles' required/>

    <label>Mit folgenden Themen *</label>
    <textarea rows="6" cols="30" name="contact_description" v-model="contact_description"></textarea>

    <button class="button" v-on:click="removeRelation">Löschen</button>
  </div>
</template>

<script>
export default {
  name: "Relation",
  props: ["relation"],
  computed: {
    key() {
      return this.$vnode.key;
    },
    contact_name: {
      get() {
        return this.relation.contact;
      },
      set(value) {
        this.relation.contact = value;
        this.setRelation();
      }
    },
    contact_email: {
      get() {
        return this.relation.contact_mail;
      },
      set(value) {
        this.relation.contact_mail = value;
        this.setRelation();
      }
    },
    contact_role: {
      get() {
        return this.relation.role;
      },
      set(value) {
        this.relation.role = value;
        this.setRelation();
      }
    },
    contact_description: {
      get() {
        return this.relation.description;
      },
      set(value) {
        this.relation.description = value;
        this.setRelation();
      }
    }
  },
  methods: {
    removeRelation() {
      this.$store.commit("removeRelation", this.key);
    },
    setRelation() {
      this.$store.commit("setRelation", this.key, this.relation);
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

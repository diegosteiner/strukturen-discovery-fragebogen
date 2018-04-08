
<template>
  <div class="relation">
    <div>
      <label>Name *</label>
      <input type="text" name="contact" v-model="contact_name" required/>
    </div>

    <div>
      <label>E-Mail *</label>
      <input type="email" name="contact_mail"  v-model="contact_email" required/>
    </div>

    <div>
      <label>Rolle des Kontakts *</label>
      <input type="text" name="role" v-model="contact_role" list='roles' required/>
    </div>

    <div>
      <label>Mit folgenden Themen *</label>
      <textarea rows="6" cols="30" name="contact_description" v-model="contact_description"></textarea>
    </div>

    <div>
      <button class="button delete" v-on:click="removeRelation">Kontakt Löschen</button>
    </div>
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
.flex-row {
  display: flex;
  justify-content: space-between;
}

@media only screen and (max-width: 480px) {
  .flex-row {
    flex-direction: column;
  }
}

.flex-item {
  flex: 0 1 31%;
  margin-bottom: 0.5rem;
}

button.destroy {
  position: absolute;
  border: none;
  background: transparent;
  top: 0;
  right: 0;
}

.relation {
  border: 1px solid rgb(15, 105, 175);
  position: relative;
  padding: 15px;
  margin-top: 10px;
  display: grid;
  grid-template-columns: auto auto;
}

.relation > div {
  margin: 0 20px;
}
</style>

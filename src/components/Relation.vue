
<template>
  <div class="relation">
    <button class="destroy" v-on:click="removeRelation">×</button>
    <div class='flex-row'>
      <input class="flex-item" type="text" placeholder="Name *" name="contact" v-model="contact_name" required/>
      <input class="flex-item" type="email" placeholder="Email *" name="contact_mail"  v-model="contact_email" required/>
      <input class="flex-item" type="text" placeholder="Rolle dieser Person *" name="role" v-model="contact_role" list='roles' required/>
    </div>

    <label>Mit folgenden Themen *</label>
    <textarea rows="6" cols="30" name="contact_description" v-model="contact_description"></textarea>

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
}
</style>

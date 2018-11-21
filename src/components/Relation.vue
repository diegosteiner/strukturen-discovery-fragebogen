
<template>
  <div class="relation">
    <div class='flex-row'>
      <div class='flex-item'>
        <label>Name *</label>
        <input type="text" name="contact" v-model="contact_name" required/>
      </div>

      <div class='flex-item'>
        <label>E-Mail *</label>
        <input type="email" name="contact_mail"  v-model="contact_email" required/>
      </div>

      <div class='flex-item'>
        <label>Rolle des Kontakts *</label>
        <v-select taggable v-model="contact_role" :options="availableRoles">
        </v-select>
        <small class="help-text">Nichts passendes gefunden? Neue Rollen können mit Enter hinzugefügt werden.</small>
      </div>
    </div>

    <div class='flex-row'>
      <div class='flex-item'>
        <label>Kontaktfrequenz: {{ frequency_label }}</label>
        <input type="range" name="frequency" v-model="contact_frequency" min="0" :max="frequency_labels.length - 1" />
      </div>

      <div class='flex-item'>
        <label>Mit folgenden Themen *</label>
        <v-select taggable multiple v-model="contact_topics" :options="$store.state.topics">
          <span slot="no-options">Nichts passendes gefunden? Enter drücken um Neues hinzuzufügen.</span>
        </v-select>
      </div>
      <div class='flex-item'>
        <label>Beschreibung</label>
        <textarea rows="3" cols="30" name="contact_description" v-model="contact_description"></textarea>
      </div>
    </div>

      <button class="button delete" v-on:click="removeRelation">
        <img class="icon" src="../assets/trash.png"/>
        Kontakt ({{ contact_name }}) Löschen
      </button>
  </div>
</template>

<script>
export default {
  name: "Relation",
  props: ["relation"],
  computed: {
    frequency_labels() {
      return [
        "täglich",
        "mehrmals pro Woche",
        "wöchentlich",
        "mehrmals pro Monat",
        "monatlich",
        "mehrmals pro Jahr",
        "jährlich"
      ];
    },
    availableRoles() {
      return this.$store.state.roles.filter(r => {
        return r !== undefined && r !== null;
      });
    },
    frequency_label() {
      return this.frequency_labels[this.contact_frequency];
    },
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
    contact_frequency: {
      get() {
        return this.relation.contact_frequency || 0;
      },
      set(value) {
        this.$set(this.relation, "contact_frequency", value);
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
    contact_topics: {
      get() {
        return this.relation.topics;
      },
      set(value) {
        this.relation.topics = value;
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
  flex-wrap: wrap;
  justify-content: space-between;
  margin: -10px;
}

@media only screen and (max-width: 480px) {
  .flex-row {
    flex-direction: column;
  }
}

.flex-item {
  flex: 1 1 31%;
  /* margin-bottom: 0.5rem; */
  margin: 10px;
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

.help-text {
  color: gray;
  font-size: 0.7em;
}
</style>

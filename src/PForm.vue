<template>
<div class="form-wrapper">
  <form method="POST" @submit.prevent="submitForm" v-if="!submitted">
    <slot name="form" v-bind:fields="fields" v-bind:submit="submit" v-bind:submitForm="submitForm">
    </slot>
  </form>

  <div v-if="submitted && !renderedSuccessRedirect" v-html="renderedSuccessMessage">
  </div>
</div>
</template>

<script>
import Handlebars from "handlebars";

export default {
  name: 'PForm',
  props: [
    'form',
    'submit',
    'successRedirect',
    'successMessage',
    'extra',
    'extraFields',
  ],
  computed: {
    renderedSuccessMessage () {
      const msg = this.successMessage || `<h3>Thank you for your submission! We'll be in touch.</h3>`;
      return Handlebars.compile(msg)({ fields: this.fields });
    },
    renderedSuccessRedirect () {
      if (!this.sucessRedirect) {
        return null;
      } else {
        return Handlebars.compile(this.successRedirect)({ fields: this.fields });
      }
    },
  },
  methods: {
    async submitForm () {
      if (!this.$pies) {
        this.submitted = true;
        return;
      }
      
      try {
        const response = await this.$fire.firestore.collection("website-form-submissions").add({
          ...(this.extra || {}),
          fields: {
            ...this.fields,
            ...(this.extraFields || {}),
          },
          meta: {
            userAgent: navigator.userAgent || '',
            referrer: document.referrer || '',
            location: window.location.href || '',
          },
          form: this.form || '',
          site: this.$pies.site,
          timestamp: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        });
      } catch (err) {
        console.error({
          ...(this.extra || {}),
          fields: {
            ...this.fields,
            ...(this.extraFields || {}),
          },
          meta: {
            userAgent: navigator.userAgent || '',
            referrer: document.referrer || '',
            location: window.location.href || '',
          },
          form: this.form || '',
          site: this.$pies.site,
          timestamp: this.$fireModule.firestore.FieldValue.serverTimestamp(),
        });
        return;
      }

      if (this.renderedSuccessRedirect) {
        window.location = this.renderedSuccessRedirect;
      }
      this.submitted = true;
    },
  },
  data () {
    return {
      submitted: false,
      fields: {},
    };
  },
}
</script>

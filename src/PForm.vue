<template>
<div class="form-wrapper">
  <form method="POST" @submit.prevent="submitForm" v-if="!submitted" ref="form">
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

      let hasErrors = [];

      let fieldEls = this.$refs.form.elements;
      for (var i = 0; i < fieldEls.length; ++i) {
        let el = fieldEls[i],
            name = el.name,
            value = el.value;
        if (!el.checkValidity()) {
          let label = el.parentElement.querySelector('label');
          if (label && label.tagName.toLowerCase() === 'label') {
            label.dataset.validationMessage = el.validationMessage;
          }
          el.classList.add('has-error');
          if (hasErrors.indexOf(name) === -1) {
            hasErrors.push(name);
          }
        } else {
          el.classList.remove('has-error');
          let label = el.parentElement.querySelector('label');
          if (label && label.tagName.toLowerCase() === 'label') {
            delete label.dataset.validationMessage;
          }
        }
      }

      if (hasErrors.length) {
        return;
      }
      
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

<style scoped>
form input.has-error:not(:focus) {
  border: 1px solid red !important;
}
form input:not(:focus).has-error + label {
  color: red;
}
form input.has-error:not(:focus):not(:placeholder-shown) + label {
  visibility: hidden;
  width: 100%;
}
form input.has-error:not(:focus):not(:placeholder-shown) + label[data-validation-message]::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1rem 1.5rem;
  font-size: 1rem;
}
form input:not(:focus) + label[data-validation-message]::after {
  content: attr(data-validation-message);
  font-size: .8rem;
  line-height: 1;
  visibility: visible;
  color: red;
  display: block;
}
</style>

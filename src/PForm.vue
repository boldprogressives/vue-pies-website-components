<template>
<div class="form-wrapper">
  <transition name="slide">
    <form method="POST" @submit.prevent="submitForm" v-if="!submitted">
      <transition name="fade">
        <slot name="form" v-bind:fields="fields" v-bind:uuid="uuid" v-bind:submit="submit" v-bind:submitForm="submitForm">
        </slot>
      </transition>
    </form>

    <div v-if="submitted">
      <slot name="thanks" v-bind:fields="fields">
        <h3>
          Thank you for your submission! We'll be in touch.
        </h3>
      </slot>
    </div>
  </transition>
</div>
</template>

<script>
export default {
  name: 'PForm',
  props: [
    'uuid',
    'submit'
  ],
  methods: {
    async submitForm () {
      if (!this.$pies) {
        this.submitted = true;
        return;
      }
      
      const response = await this.$fire.firestore.collection("website-form-submissions").add({
        fields: this.fields,
        meta: {
          userAgent: navigator.userAgent,
          referrer: document.referrer,
          location: window.location.href,
        },
        form: this.uuid,
        site: this.$pies.site,
        timestamp: this.$fireModule.firestore.FieldValue.serverTimestamp()
      });
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

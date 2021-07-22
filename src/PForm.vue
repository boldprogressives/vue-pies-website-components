<template>
<div class="form-wrapper">
  <transition name="slide">
      <form method="POST" @submit.prevent="submitForm" v-if="!submitted">
        
        <div class="row mb-3">
          <div class="col">
            <div class="form-floating">
              <input v-model="fields.email" :id="`${uuid}--email`" type="email" class="form-control" placeholder="email@domain.com">
              <label :for="`${uuid}--email`">Email address</label>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <div class="form-floating">
              <input v-model="fields.phone" :id="`${uuid}--phone`" type="tel" class="form-control" placeholder="+1 (234) 567-8910">
              <label :for="`${uuid}--phone`">Mobile phone</label>
            </div>
          </div>
        </div>
        <transition name="fade">
          <div class="row mb-3" v-if="fields.phone">
            <div class="col">
              <div class="form-check">
                <input v-model="fields.mobile_opt_in" :id="`${uuid}--mobile_opt_in`" type="checkbox" class="form-check-input">
                <label class="form-check-label" :for="`${uuid}--mobile_opt_in`">
                  I consent to receive automated text messages. Data & msg rates may apply.
                </label>
              </div>
            </div>
          </div>
        </transition>
        <div class="row mb-3">
          <div class="col">
            <div class="form-floating">
              <input v-model="fields.zip" :id="`${uuid}--zip`" type="text" class="form-control" placeholder="54321">
              <label :for="`${uuid}--zip`">ZIP Code</label>
            </div>
          </div>
          <div class="col">
            <input type="submit" :value="submit || 'Submit'" @click.prevent="submitForm">
          </div>
        </div>

      </form>

      <div v-if="submitted">
        <h3>
          Thank you for your submission! We'll be in touch.
        </h3>
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
      fields: {
        email: '',
        phone: '',
        mobile_opt_in: '',
        zip: '',
      },
    };
  },
}
</script>

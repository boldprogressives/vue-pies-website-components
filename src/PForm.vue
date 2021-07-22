<template>
<div class="form-wrapper">
  <vue-flip active-hover>
    <template v-slot:front>
      
      <form method="POST" @submit.prevent="submitForm">
        
        <div class="row mb-3">
          <div class="col">
            <div class="form-floating">
              <input v-model="fields.email" id="email" type="email" class="form-control" placeholder="email@domain.com">
              <label for="email">Email address</label>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col">
            <div class="form-floating">
              <input v-model="fields.phone" id="phone" type="tel" class="form-control" placeholder="+1 (234) 567-8910">
              <label for="phone">Mobile phone</label>
            </div>
          </div>
        </div>
        <transition name="fade">
          <div class="row mb-3" v-if="fields.phone">
            <div class="col">
              <div class="form-check">
                <input v-model="fields.mobile_opt_in" id="mobile_opt_in" type="checkbox" class="form-check-input">
                <label class="form-check-label" for="mobile_opt_in">I consent to receive automated text messages. Data & msg rates may apply.</label>
              </div>
            </div>
          </div>
        </transition>
        <div class="row mb-3">
          <div class="col">
            <div class="form-floating">
              <input v-model="fields.zip" id="zip" type="text" class="form-control" placeholder="54321">
              <label for="zip">ZIP Code</label>
            </div>
          </div>
          <div class="col">
            <input type="submit" :value="submit || 'Submit'">
          </div>
        </div>

      </form>
    </template>
    <template v-slot:back>
      <h3>
        Thank you for your submission! We'll be in touch.
      </h3>
    </template>
  </vue-flip>
</div>
</template>

<script>
import VueFlip from 'vue-flip';

export default {
  name: 'PForm',
  components: {
    'vue-flip': VueFlip,
  },
  props: [
    'submit'
  ],
  methods: {
    submitForm () {
      
    },
  },
  data () {
    return {
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

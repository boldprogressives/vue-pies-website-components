<template>
<div class="wp-block-buttons">
  <div class="wp-block-button" v-for="link, index in links || []" :key="index">
    <a v-if="useNuxtLink(link.href)"
       :href="link.href" class="wp-block-button__link">
      {{ link.text }}
    </a>
    <a v-else :href="link.href" class="wp-block-button__link" target="_blank">
      {{ link.text }}
    </a>
  </div>
</div>
</template>

<script>
export default {
  name: 'PButtons',
  props: ['links'],

  methods: {
    useNuxtLink (href) {
      if (!this.$nuxt) {
        return false;
      }
      if (href.match(/:\/\//)) {
        return false;
      }
      return true;
    },
  },
}
</script>

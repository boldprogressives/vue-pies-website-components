<template>
<div data-v-77b5d34c="" class="wp-block-buttons"><div data-v-77b5d34c="" class="wp-block-button"><a data-v-77b5d34c="" href="https://sample-site-1.campaignpies.com/sample-page/" class="wp-block-button__link">{{ b1 || 'Join Us' }}</a></div><div data-v-77b5d34c="" class="wp-block-button"><a data-v-77b5d34c="" href="https://sample-site-1.campaignpies.com/hello-world/" class="wp-block-button__link">{{ b2 || ' Donate' }}</a></div>
<div v-if="b3" data-v-77b5d34c="" class="wp-block-button"><a data-v-77b5d34c="" href="https://sample-site-1.campaignpies.com/hello-world/" class="wp-block-button__link">{{ b3 }}</a></div>
</div>
</template>

<script>
export default {
  name: 'PForm',
  props: ['b1', 'b2', 'b3'],
}
</script>

<template>
<div :id="uuid" :ref="uuid" class="media-unit foo"
     :style="mergedStyles" @click="tellParentAboutMe">
  <slot name="backgrounds"></slot>
  <span class="media-unit--overlay"></span>
  <div class="media-side" style="position: relative" :style="mediaStyles">
    <slot name="media-side">
      <img v-for="img, index in images" :key="img"
           :src="img"
           :class="index ? 'hidden' : ''">
    </slot>
  </div>
  
  <div ref="content" style="position: relative" :style="contentStyles">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'MediaUnit',
  props: [
    'styles',
    'contentStyles',
    'mediaStyles',
    'image',
    'uuid',
  ],
  computed: {
    images () {
      return (this.image || '').split(', ').map(o => o.trim()).filter(o => o);
    },
    me () {
      return {
        name: this.$options.name,
        props: this.$options.propsData,
        uuid: this.uuid,
        content: this.$refs.content.innerHTML,
        parent: this.$parent.uuid,
      }
    },
  },
  methods: {
    remergeStyles () {
      const val = Object.values(this.background).join(', ');
      if (!val) {
        this.mergedStyles = '';
      }
      this.mergedStyles = `background: ${val}; ${this.styles}`;
      console.log('merged styles is now ', this.mergedStyles);
    },
    tellParentAboutMe () {
      if (!this.$store) {
        return;
      }

      this.$store.dispatch('setEditingComponent', this.me);
    }
  },
  mounted () {
    this.$store && this.$store.commit('registerComponentInTree', this.me);
  },
  data () {
    return {
      background: {},
      mergedStyles: this.styles,
    };
  },
}
</script>

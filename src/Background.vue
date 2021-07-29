<template>
<span class="media-unit--overlay" :style="`background: ${cssString}`"></span>
</template>

<script>
export default {
  name: 'Background',
  computed: {
    gradientString () {
      return this.linearGradient ? `linear-gradient(${this.linearGradient})` : null;
    },
    imageString () {
      return this.image ? `url(${this.image})` : null;
    },
    backgroundImage () {
      if (this.imageString) {
        return this.imageString;
      }
      if (this.gradientString) {
        return this.gradientString;
      }
      return null;
    },
    maybeSlash () {
      if (this.size) {
        return '/';
      }
      return null;
    },
    cssString () {
      const propsOrder = [
        'backgroundImage',
        'position',
        'maybeSlash',
        'size',
        'repeat',
        'attachment',
      ];
      return propsOrder.map(o => this[o]).filter(o => o).join(' ');
    },
  },
  watch: {
    cssString () {
      this.emitString();
    },
  },
  mounted () {
    this.emitString();
  },
  props: {
    linearGradient: { type: String },
    image: { type: String },
    position: { type: String },
    size: { type: String },
    repeat: { type: String },
    attachment: { type: String },
    color: { type: String },
    uuid: { type: String },
    for: { type: String, default: 'media-unit' },
  },
  methods: {
    emitString () {
      return;
    },
    tellParentAboutMe () {
      if (!this.$store) {
        return;
      }
      
      const me = {
        name: this.$options.name,
        props: this.$options.propsData,
        uuid: this.uuid,
        content: '',
      };
      this.$store.dispatch('setEditingComponent', me);
    }
  },
}
</script>

<template>
<span class="media-unit--overlay" :style="styleString" v-html="content"></span>
</template>

<script>
export default {
  name: 'Background',
  computed: {
    styleString () {
      return {
        background: this.cssString,
        opacity: this.opacity || null,
      };
    },
    gradientString () {
      if (this.linearGradient) {
        return `linear-gradient(${this.linearGradient})`;
      }
      if (this.gradient === 'linear') {
        return `linear-gradient(to ${this.to}, ${this.start} ${this.startAt || '0%'}, ${this.end} ${this.endAt || '100%'})`;
      }
      // `<background gradient="linear" to="right" start="#fff" start-at="0%" end="blue" end-at="50%">`

      return null;
    },

    content () {
      if (!this.video) return '';
      if (this.video.match(/youtube/)) {
        const id = this.video.split('?v=')[1];
        return `<iframe frameborder="0" src="https://youtube.com/embed/${id}?autoplay=1&controls=0&showinfo=0&autohide=1&loop=1&mute=1">`;
      }  else {
        return `<video src="${this.video}" role="presentation" crossorigin="anonymous" playsinline="" preload="auto" muted="" loop="" autoplay="" tabindex="-1" style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; max-width: unset; object-fit: cover; object-position: right;"></video>`;
      }
    },
    
    imageString () {
      return this.image ? `url(${this.image})` : null;
    },

    colorString () {
      return this.color || null;
    },
    
    backgroundImage () {
      if (this.imageString) {
        return this.imageString;
      }
      if (this.gradientString) {
        return this.gradientString;
      }
      if (this.colorString) {
        return this.colorString;
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
  props: {

    opacity: {
      type: String,
    },
    
    gradient: { type: String },
    to: { type: String },
    start: { type: String },
    startAt: { type: String },
    end: { type: String },
    endAt: { type: String },
    
    linearGradient: { type: String },

    video: { type: String },
    
    image: { type: String },
    
    position: { type: String },
    size: { type: String },
    repeat: { type: String },
    attachment: { type: String },
    color: { type: String },
    uuid: { type: String },
    for: { type: String, default: 'media-unit' },
  },
}
</script>

<style>
.media-unit--overlay iframe {
  width: 100% !important;
  height: 100% !important;
}
</style>

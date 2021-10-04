<template>
<div :id="uuid" :ref="uuid" class="media-unit foo"
     :style="mergedStyles">
  <slot name="backgrounds"></slot>
  <span class="media-unit--overlay"></span>
  <div ref="media" class="media-side" style="position: relative" :style="mediaStyles">
    <slot name="media-side">
      <div class="media-unit--background-video"
           v-if="video" v-html="videoEmbed">
      </div>

      <component v-if="image"
                 :is="maybeNuxtImg" v-for="img, index in images"
                 :key="index"
                 :src="img"
                 :class="index === visibleImageIndex ? '' : 'hidden'">
      </component>
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
    'video',
    'uuid',
  ],
  computed: {
    maybeNuxtImg () {
      return this.useNuxtImg() ? 'nuxt-img' : 'img';
    },
    
    videoEmbed () {
      if (!this.video) {
        return;
      }
      if (this.video.match(/youtube/)) {
        const id = this.video.split('?v=')[1];
        return `<iframe frameborder="0" height="100%" width="100%" src="https://youtube.com/embed/${id}?autoplay=1&controls=0&showinfo=0&autohide=1&loop=1&mute=1">`;
      }
    },
    
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
    useNuxtImg () {
      if (!this.$nuxt) {
        return false;
      }
      return true;
    },    
    remergeStyles () {
      const val = Object.values(this.background).join(', ');
      if (!val) {
        this.mergedStyles = '';
      }
      this.mergedStyles = `background: ${val}; ${this.styles}`;
      console.log('merged styles is now ', this.mergedStyles);
    },
  },
  unmounted () {
    if (this.interval) {
      window.clearInterval(this.interval);
      this.interval = null;
    }
  },
  mounted () {
    if (this.images.length > 1) {
      const self = this;
      this.interval = window.setInterval(() => {
        if (self.visibleImageIndex >= self.images.length - 1) {
          self.visibleImageIndex = 0;
        } else {
          self.visibleImageIndex += 1;
        }
      }, 3000);
    }
  },
  data () {
    return {
      background: {},
      mergedStyles: this.styles,
      visibleImageIndex: 0,
      interval: null,
    };
  },
}
</script>

<style>
.media-unit--background-video {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.media-side img {
  transition: opacity .3s ease;
}
.media-side .hidden {
  opacity: 0;
}
</style>

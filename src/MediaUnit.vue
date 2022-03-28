<template>
<div :id="uuid" :ref="uuid" class="media-unit foo" :class="video ? 'media-unit--has-background-video' : ''"
     :style="mergedStyles">
  <slot name="backgrounds"></slot>
  <span class="media-unit--overlay"></span>
  <div ref="media" class="media-side" style="position: relative" :style="mediaStyles">
    <slot name="media-side">
      <div class="media-unit--background-video"
           v-if="video" v-html="videoEmbed">
      </div>

      <component v-if="image"
                 :is="maybeNuxtImg(index)"
                 v-for="img, index in images"
                 :key="index"
                 :src="img"
                 :alt="imageAlts[index]"
                 v-bind="maybeNuxtImgProps(img, index)"
                 :class="index === visibleImageIndex ? '' : 'hidden'">
      </component>
    </slot>
  </div>
  
  <div ref="content" style="position: relative" :style="contentStyles" :class="contentClass">
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
    'contentClass',
    'mediaStyles',
    'image',
    'imageProp',
    'video',
    'loading',
    'uuid',
    'alt',
  ],
  computed: {
    videoEmbed () {
      if (!this.video) {
        return;
      }
      if (this.video.match(/youtube/)) {
        const id = this.video.split('?v=')[1];
        return `<iframe frameborder="0" src="https://youtube.com/embed/${id}">`;
      } else {
        return `<video src="${this.video}" role="presentation" crossorigin="anonymous" playsinline="" preload="auto" tabindex="-1" style="position: absolute; left: 0; right: 0; top: 0; bottom: 0; max-width: unset; object-fit: cover; object-position: right;"></video>`;
      }
    },
    
    images () {
      return (this.image || '').split(', ').map(o => o.trim()).filter(o => o);
    },
    imageAlts () {
      let alt = this.alt || [];
      let alts = [];
      for (var i = 0; i < this.images.length; ++i) {
        try {
          alts.push(alt[i]);
        } catch (err) {
          alts.push(null);
        }
        return alts;
      }
    },
    imageProps () {
      let prop = this.imageProp || [];
      let props = [];
      for (var i = 0; i < this.images.length; ++i) {
        try {
          props.push(prop[i] || {});
        } catch (err) {
          props.push({});
        }
        return props;
      }
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
    maybeNuxtImg (index) {
      return this.useNuxtImg(index) ? 'nuxt-img' : 'img';
    },

    maybeNuxtImgProps (img, index) {
      if (!this.useNuxtImg(index)) return {};
      return {
        loading: this.loading || 'lazy',
        ...this.imageProps[index],
      };
    },
    useNuxtImg (index) {
      if (!this.$nuxt) {
        return false;
      }
      if ((this.imageProps[index] || {}).useNuxtImg === false) {
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
.media-unit--has-background-video .media-side {
  z-index: 999;
}
.media-unit--background-video {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
}
.media-unit--background-video iframe {
  width: 100% !important;
  height: 100% !important;
}
.media-side img {
  transition: opacity .3s ease;
}
.media-side .hidden {
  opacity: 0;
}
</style>

<template>
<li class="wp-block-latest-posts--tile" :class="className">

  <div class="wp-block-latest-posts__featured-image">
    <a v-if="useNuxtLink(href)" :href="href">
      <component :is="maybeNuxtImg" :src="image"></component>
    </a>
    <a v-else :href="href" target="_blank">
      <component :is="maybeNuxtImg" :src="image"></component>
    </a>
  </div>
      
  <h3 :style="titleStyles || ''"><a :href="href">{{title}}</a></h3>
  <div class="wp-block-latest-posts__post-excerpt" ref="content">
    <slot></slot>
  </div>
  
  <div class="wp-block-latest-posts__post-meta">
    <a v-if="useNuxtLink(href)" :href="href">
      Read More
    </a>
    <a v-else :href="href" target="_blank">
      Read More
    </a>
  </div>

</li>
</template>

<script>
export default {
  name: 'Tile',
  props: [
    'title',
    'href',
    'image',
    'uuid',
    'className',
    'titleStyles',
  ],
  computed: {
    me () {
      return {
        name: this.$options.name,
        props: this.$options.propsData,
        uuid: this.uuid,
        content: this.$refs.content.innerHTML,
        parent: this.$parent.uuid,
      }
    },
    maybeNuxtImg () {
      return this.useNuxtImg() ? 'nuxt-img' : 'img';
    }
  },    
  methods: {
    useNuxtImg () {
      if (!this.$nuxt) {
        return false;
      }
      return true;
    },
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

<style>
.wp-block-latest-posts.wp-block-latest-posts__list li.wp-block-latest-posts--tile-pies_issue .wp-block-latest-posts__featured-image {
grid-area: image;
margin: 0 !important;
margin-bottom: 0 !important;
}
.wp-block-latest-posts--tile > h3 {
  grid-area: title;
}
.wp-block-latest-posts--tile .wp-block-latest-posts__post-excerpt {
  grid-area: excerpt;
}
.wp-block-latest-posts--tile .wp-block-latest-posts__post-meta {
  grid-area: meta;
}
</style>

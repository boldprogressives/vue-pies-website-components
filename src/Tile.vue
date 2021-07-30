<template>
<li class="wp-block-latest-posts--tile" :class="className"
    @click.stop.prevent="tellParentAboutMe">

  <div class="wp-block-latest-posts__featured-image">
    <component is="nuxt-link" v-if="$nuxt" :to="href">
      <img :src="image" />
    </component>
    <a v-else :href="href">
      <img :src="image" />
    </a>
  </div>
      
  <h3 style="margin-bottom: 1.75rem !important; font-size: 34px"><a :href="href">{{title}}</a></h3>
  <div class="wp-block-latest-posts__post-excerpt" ref="content">
    <slot></slot>
  </div>
  
  <div class="wp-block-latest-posts__post-meta">
    <a :href="href"> Read More</a>
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
  },    
  methods: {
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

<template>
<div :id="uuid" :ref="uuid" :class="`tile-row tile-row__show--${show}`"
     :data-order="order"
     :style="styles" @click.stop="tellParentAboutMe">

  <ul class="wp-block-latest-posts wp-block-latest-posts__list wp-block-latest-posts"
      :class="`wp-block-latest-posts--justify-${justify} wp-block-latest-posts--ar-${aspectRatio}`"
      :style="containerStyles"
      ref="content">
    <slot></slot>
  </ul>  
</div>

</template>

<script>
export default {
  name: 'TileRow',
  props: [
    'styles',
    'uuid',
    'show',
    'order',
    'justify',
    'columns',
    'containerStyles',
    'aspectRatio',
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
.tile-row__show--image li h3,
.tile-row__show--image li .wp-block-latest-posts__post-excerpt,
.tile-row__show--image li .wp-block-latest-posts__post-meta {
  display: none;
}

.tile-row[data-order="title,image,excerpt,link"] li h3 {
  order: 1
}
.tile-row[data-order="title,image,excerpt,link"] li .wp-block-latest-posts__featured-image {
  order: 2
}
.tile-row[data-order="title,image,excerpt,link"] li .wp-block-latest-posts__post-excerpt {
  order: 3
}
.tile-row[data-order="title,image,excerpt,link"] li .wp-block-latest-posts__post-meta {
  order: 4
}
.tile-row.tile-row-stacked-columns {
  --columns: 3;
}
.tile-row.tile-row-image-only .wp-block-latest-posts--tile > :not(.wp-block-latest-posts__featured-image) {
  display: none;
}
.tile-row.tile-row-image-only .wp-block-latest-posts--tile > :not(.wp-block-latest-posts__featured-image) {
  display: none;
}
.tile-row.tile-row-image-title-overlay .wp-block-latest-posts--tile > :not(.wp-block-latest-posts__featured-image, h3) {
  display: none;
}
.tile-row.tile-row-image-title-overlay .wp-block-latest-posts--tile {
  overflow: hidden;
}
.tile-row.tile-row-image-title-overlay .wp-block-latest-posts--tile .wp-block-latest-posts__featured-image {
  filter: opacity(.4) blur(2px);
  transition: all .8s ease;
}
.tile-row.tile-row-image-title-overlay .wp-block-latest-posts--tile:hover .wp-block-latest-posts__featured-image {
  transform: scale(1.5);
  filter: none;
  transition: all .2s ease;
}
.tile-row.tile-row-image-title-overlay .wp-block-latest-posts--tile {
  position: relative;
}
.tile-row.tile-row-image-title-overlay .wp-block-latest-posts--tile > h3,
.tile-row.tile-row-image-title-overlay .wp-block-latest-posts--tile > h3 a {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
}

.tile-row.tile-row-issues-long {
  --columns: 1;
}
.tile-row.tile-row-issues-long .wp-block-latest-posts--tile {
  display: grid !important;
  grid-template-areas:
    "image title"
    "image excerpt"
    "image excerpt"
    "image meta";
  grid-template-rows: auto auto;
  grid-template-columns: 2fr 4fr;
  grid-column-gap: 1rem;
  
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
  padding: 1rem;
  padding-bottom: 1rem !important;
  padding-top: 1rem !important;  
}
.tile-row.tile-row-article .wp-block-latest-posts__featured-image {
  display: none !important;
}
.tile-row.tile-row-article .wp-block-latest-posts--tile > h3 {
  text-align: left;
}
.tile-row.tile-row-article .wp-block-latest-posts__post-excerpt {
  padding-right: 0 !important;
  text-align: left;
  line-height: 1.1;
  margin-bottom: .5rem;
}
.tile-row.tile-row-article .wp-block-latest-posts__post-excerpt :last-child {  
  margin-bottom: 0;
}
.tile-row.tile-row-article .wp-block-latest-posts__post-meta a {
  background-color: transparent !important;
  color: black !important;
  justify-content: flex-end !important;
  text-transform: uppercase;
  font-size: .9em;
}
</style>

import Background from './src/Background.vue';
import PButtons from './src/PButtons.vue';
import PForm from './src/PForm.vue';
import Tile from './src/Tile.vue';
import MediaUnit from './src/MediaUnit.vue';
import TileRow from './src/TileRow.vue';

export default {
  install(Vue, options) {
    Vue.component('tile-row', TileRow);
    Vue.component('tile', Tile);
    Vue.component('media-unit', MediaUnit);
    Vue.component('p-form', PForm);
    Vue.component('p-buttons', PButtons);
    Vue.component('background', Background);
  }
}

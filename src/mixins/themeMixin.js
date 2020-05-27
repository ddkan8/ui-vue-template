import variables from '../assets/styles/common/gc-var.scss'
const ORIGINAL_THEME = variables.primaryColor // default color
import client from 'webpack-theme-color-replacer/client'
import forElementUI from 'webpack-theme-color-replacer/forElementUI'

export default {
  computed: {
    theme() {
      return this.$store.state.settings.theme
    }
  },
  mounted() {
    if (ORIGINAL_THEME !== this.theme) {
      const options = {
        newColors: forElementUI.getElementUISeries(this.theme)
      }
      client.changer.changeColor(options, Promise).finally()
    }
  },
  watch: {
    theme(val) {
      const options = {
        newColors: forElementUI.getElementUISeries(val)
      }
      client.changer.changeColor(options, Promise).finally()
    }
  }
}

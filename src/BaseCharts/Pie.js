import Vue from 'vue'
import Chart from 'chart.js'
import { mergeOptions } from '../helpers/options'

export default Vue.extend({
  render: function (createElement) {
    return createElement(
      'div',
      [
        createElement(
          'canvas', {
            attrs: {
              id: this.chartId,
              width: this.width,
              height: this.height
            },
            ref: 'canvas'
          }
        )
      ]
    )
  },

  props: {
    chartId: {
      default: 'pie-chart',
      type: String
    },
    width: {
      default: 400,
      type: Number
    },
    height: {
      default: 400,
      type: Number
    }
  },

  data () {
    return {
      defaultOptions: {
      },
      plugins: []
    }
  },

  methods: {
    addPlugin (plugin) {
      this.plugins.push(plugin)
    },
    renderChart (data, options) {
      let chartOptions = mergeOptions(this.defaultOptions, options)

      this._chart = new Chart(
        this.$refs.canvas.getContext('2d'), {
          type: 'pie',
          data: data,
          options: chartOptions,
          plugins: this.plugins
        }
      )
    }
  },
  beforeDestroy () {
    if (this._chart) {
      this._chart.destroy()
    }
  }
})

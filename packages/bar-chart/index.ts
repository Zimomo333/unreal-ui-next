import { App } from 'vue'
import type { SFCWithInstall } from '@/utils/types'
import BarChart from './src/index.vue'
import '@/scss/bar-chart.scss'

BarChart.install = (app: App): void => {
  app.component(BarChart.name, BarChart)
}

const UrBarChart: SFCWithInstall<typeof BarChart> = BarChart

export default UrBarChart

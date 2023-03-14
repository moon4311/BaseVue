<template>
  <n-card>
    <n-h3>차트관리</n-h3>
      <p>산점도 차트</p>
  </n-card>
  <n-card>
    <div>
      <div class="mt-8">
        <Scatter
          id="my-chart-id"
          v-if="loaded"
          :data="chartData"
        />
        <div>
        </div>
      </div>
    </div>
</n-card>
</template>

<script lang="ts">
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Scatter } from 'vue-chartjs'
import axios from 'axios'
import apiUrl from '/src/assets/base';
import { useRoute } from "vue-router";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

export default {
  name: 'ScatterChart',
  components: { Scatter },
  data: () => ({
    loaded: false,
    chartData: {labels: null, datasets: [ ]}
  }),
  async mounted () {
    const id = useRoute().params.id;
    const apiPath = 'chart';
    
    try {
      if(id){
      await axios.get(apiUrl + "/"+apiPath+"/info/"+ id ).then(res=>{
        const data = res.data.data;
        this.chartData.labels = JSON.parse(data.labels);
        this.chartData.datasets = JSON.parse(data.datasets);
        this.loaded = true
      })
    }
    
    } catch (e) {
      console.error(e)
    }
  }
}
</script>
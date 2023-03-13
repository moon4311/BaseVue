<template>
  <n-card>
    <n-h3>차트관리</n-h3>
      <p>버블 차트</p>
  </n-card>
  <n-card>
    <div>
      <div class="mt-8">
        <Bubble
          id="my-chart-id"
          v-if="loaded"
          :data="chartData"
        />
        <div>
          <!-- <n-input v-model:value="chartData.labels" />
          <n-input v-model:value="chartData.datasets" /> -->
        </div>
      </div>
    </div>
</n-card>
</template>

<script lang="ts">
import { Bubble } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import axios from 'axios'
import apiUrl from '/src/assets/base';
import { useRoute } from "vue-router";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BubbleChart',
  components: { Bubble },
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
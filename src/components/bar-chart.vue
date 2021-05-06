<template>
  <div>
    <ur-bar-chart :data="data" :xAxis="xAxis"/>
  </div>
</template>

<script>
export default {
  data(){
    return {
      xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [10, 20, 30, 40, 50, 60, 70],
    }
  }
}
</script>
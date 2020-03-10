<template>
  <div class="container">
    <custom-drag></custom-drag>
  </div>
</template>
<script>
import customDrag from '@/components/drag.vue'
export default {
  name: 'drag',
  components: {
    customDrag
  }
}
</script>
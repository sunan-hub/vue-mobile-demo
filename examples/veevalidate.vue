<template>
  <div>
    <ValidationProvider rules="email" v-slot="{ errors }">
      <input v-model="value">
      <span>{{ errors[0] }}</span>
    </ValidationProvider>
  </div>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
export default {
  components: {
    ValidationProvider
  }
}
</script>

<style lang="scss" scoped>

</style>

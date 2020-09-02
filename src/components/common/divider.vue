<template>
  <div class="divider-container">
    <div class="border" :style="borderStyle"></div>
    <div class="title" :style="titleStyle">
      <slot>{{title}}</slot>
    </div>
    <div class="border" :style="borderStyle"></div>
  </div>
</template>

<script>
export default {
  name: 'divider',
  props: {
    title: {
      default: ''
    },
    color: {
      defalut: ''
    },
    borderColor: {
      defalut: ''
    }
  },
  computed: {
    borderStyle () {
      const borderColor = this.color
      return {
        borderColor
      }
    },
    titleStyle () {
      const color = this.color
      return {
        color
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.divider-container {
  display: flex;
  padding: 12px 0 8px;
  .border {
    border-top: 1px solid #dcdfe6;
    flex: 1;
  }
  .title {
    font-size: 14px;
    padding: 0 15px;
    margin-top: -8px;
    color: #909399;
  }
}
</style>

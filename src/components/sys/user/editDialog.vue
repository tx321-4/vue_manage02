<template>
  <div>
    <el-dialog :title="title"></el-dialog>
  </div>
</template>

<script>
const formInit = {
  id: null
}
export default {
  name: 'EditDialog',
  data () {
    return {
      form: { ...formInit }
    }
  },
  computed: {
    isEdit () {
      return !!this.form.id
    },
    title () {
      let title = '登陆用户信息'
      if (this.isEdit) {
        title += ' [ 修改 ]'
      } else {
        title += ' [ 新增 ]'
      }
      return title
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
</style>

<template>
  <div>
    <list ref="list">
      <el-table-column slot="column" label="操作" fixed="right" align="center" width="60">
        <template slot-scope="{row}">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(row)"></el-button>
        </template>
      </el-table-column>
    </list>
    <edit-Dialog ref="editDialog" @updated="reload"></edit-Dialog>
  </div>
</template>

<script>
import list from '@/components/sys/config/list'
import editDialog from '@/components/sys/config/editDialog'
export default {
  name: 'Config',
  components: { list, editDialog },
  methods: {
    edit (row) {
      // console.log(Object.assign({}, row))
      this.$refs.editDialog.open().then(that => {
        that.initData({ ...row, isEdit: 1 })
      })
    },
    reload (form) {
      // this.$refs.list.reload()  线上

      const index = this.$refs.list.list.findIndex(v => v.key === form.key)
      this.$refs.list.list.splice(index, 1, form)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

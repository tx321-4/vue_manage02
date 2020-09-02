<template>
  <div>
    <list ref="list" init show-selection>
      <el-table-column slot="column" label="操作" fixed="right" align="center" width="60">
        <template slot-scope="{row}">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(row)" />
        </template>
      </el-table-column>
    </list>
    <edit-dialog ref="editDialog" @updated="reload"></edit-dialog>
  </div>
</template>

<script>
import list from '@/components/sys/config/list'
import editDialog from '@/components/sys/config/editDialog'
export default {
  name: 'Config',
  components: { list, editDialog },
  data () {
    return {

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    edit (row) {
      this.$refs.editDialog.open().then(that => {
        that.initData({ ...row, isEdit: 1 })
      })
    },
    reload (form) {
      // this.$refs.list.reload()
      // console.log(form.key)
      // console.log(this.$refs.list.list)
      const index = this.$refs.list.list.findIndex(v => v.key === form.key)
      this.$refs.list.list.splice(index, 1, form)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

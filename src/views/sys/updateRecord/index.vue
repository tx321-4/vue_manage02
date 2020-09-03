<template>
  <div>
    <div style="margin: 10px 0;">
      <el-button-group>
        <el-button type="primary" @click="create" icon="el-icon-edit">创建更新记录</el-button>
      </el-button-group>
    </div>
    <list ref="list" init show-selection>
      <el-table-column slot="column" label="操作" fixed="right" align="center" width="70">
        <template slot-scope="{row}">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(row)"></el-button>
          <el-button
            size="mini"
            type="text"
            style="color:#f78989"
            icon="el-icon-delete"
            @click="del(row)"
          ></el-button>
        </template>
      </el-table-column>
    </list>
    <editDialog ref="editDialog" @updated="reload"></editDialog>
  </div>
</template>

<script>
import list from '@/components/sys/updateRecord/list'
import editDialog from '@/components/sys/updateRecord/editDialog'
export default {
  name: 'Index',
  components: { list, editDialog },
  data () {
    return {

    }
  },
  methods: {
    create () {
      this.$refs.editDialog.open().then(that => {
        that.create()
      })
    },
    edit (row) {

    },
    del (row) {

    },
    reload () {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>

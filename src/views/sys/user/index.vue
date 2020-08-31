<template>
  <div>
    <div style="margin:10px 0px">
      <el-button-group>
        <el-button type="primary" @click="create" icon="el-icon-edit">创建用户</el-button>
      </el-button-group>
    </div>
    <list ref="list" init show-selection>
      <el-table-column slot="column" label="操作" fixed="right" align="center" width="70">
        <template slot-scope="{row}">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="edit(row)" />
          <el-button size="mini" type="danger" icon="el-icon-delete" @click="del(row)" />
        </template>
      </el-table-column>
    </list>
    <edit-dialog ref="editDialog" @updated="reload"></edit-dialog>
  </div>
</template>

<script>
import list from '@/components/sys/user/list'
import editDialog from '@/components/sys/user/editDialog'
export default {
  name: 'User',
  components: {
    list,
    editDialog
  },
  data () {
    return {

    }
  },
  methods: {
    create () {

    },
    edit () {

    },
    del () {

    },
    reload () {

    }
  }
}
</script>

<style lang="scss" scoped>
</style>

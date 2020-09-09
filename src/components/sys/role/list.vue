<template>
  <div>
    <!-- 查询条件 -->
    <div style="margin-bottom: 2px">
      <div style="float:right;">
        <el-button-group>
          <el-button type="primary" icon="el-icon-search" @click="query"></el-button>
          <el-tooltip content="重置查询条件" placement="top">
            <el-button icon="el-icon-refresh" @click="resetQuery"></el-button>
          </el-tooltip>
        </el-button-group>
      </div>
      <el-form ref="formQuery" :model="queryParams" label-width="68px" inline size="mini">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="queryParams.name" clearable @keyup.enter.native="query"></el-input>
        </el-form-item>
        <el-form-item label="角色说明" prop="remarks">
          <el-input v-model="queryParams.remarks" clearable @keyup.enter.native="query"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- / 查询条件 -->
    <!-- 数据表格 -->
    <el-table :data="list" ref="tableList" v-loading="loading" highlight-current-row border stripe>
      <el-table-column fixed type="selection" align="center" width="35"></el-table-column>
      <el-table-column prop="name" label="角色名称" min-width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="remarks" label="角色说明" min-width="120" show-overflow-tooltip></el-table-column>
      <el-table-column
        prop="factory_names"
        label="菜单权限"
        align="center"
        width="100"
        show-overflow-tooltip
      >
        <template slot-scope="{row}">
          <span class="c-link" @click="openMenuDialog(row)">{{getMenuCount(row.menu_ids)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="create_user_name" width="90" label="录入员"></el-table-column>
      <el-table-column prop="create_time" width="120" label="创建时间">
        <template slot-scope="{row}">
          <span>{{row.create_time | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="update_time" label="最近更新时间" width="120">
        <template slot-scope="{row}">
          <span>{{row.update_time | formatDate }}</span>
        </template>
      </el-table-column>
      <!-- slot[column] -->
      <slot name="column"></slot>
      <!-- / slot[column] -->
    </el-table>
    <!-- / 数据表格 -->
    <!-- 分页 -->
    <pagination
      v-show="dataTotal>0"
      :total="dataTotal"
      :page.sync="queryParams.page"
      :limit.sync="queryParams.limit"
      @pagination="getData"
    ></pagination>
    <!-- / 分页 -->
    <menu-dialog :in-dialog="inDialog" ref="menuDialog"></menu-dialog>
  </div>
</template>

<script>
import api from '@/api/sys/role'
import Pagination from '@/components/common/Pagination'
import menuDialog from '@/components/sys/menu/treeDialog'

export default {
  name: 'List',
  components: {
    Pagination,
    menuDialog
  },
  props: {
    inDialog: {
      type: Boolean,
      default: false
    },

    showSelection: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      queryParams: {
        name: '',
        remarks: '',
        page: 1, // 当前页
        limit: 20 // 分页大小
      },
      list: [],
      loading: false,
      dataTotal: 0
    }
  },
  mounted () {
    this.resetQuery()
  },
  methods: {
    getData () {
      this.loading = true
      api.getList(this.queryParams).then(res => {
        this.list = res.data.list
        this.dataTotal = res.data.total
        this.loading = false
      })
    },
    query () {
      this.getData()
    },
    resetQuery () {
      this.$refs.formQuery.resetFields()
      this.queryParams.page = 1
      this.query()
    },
    openMenuDialog (row) {
      this.$refs.menuDialog.open().then(that => {
        that.initData({ ids: row.menu_ids, isIds: 1 })
      })
    },
    getMenuCount (menu_ids) {
      if (menu_ids) {
        return menu_ids.split(',').length
      } else {
        return 0
      }
    },
    del (row, index) {
      if (row.id == -1) {
        this.$message.error('该角色为系统超级角色，禁止删除！')
        return false
      }
      const confirmText = '确定删除此角色吗？'
      this.$confirm(confirmText, '提示', {
        type: 'warning'
      }).then(() => {
        api.del(row.id).then(res => {
          // this.reload()
          this.$message.success('删除成功')
          // this.$emit('del')
          this.list.splice(index, 1)
        })
      })
    }
  }

}
</script>

<style>
</style>

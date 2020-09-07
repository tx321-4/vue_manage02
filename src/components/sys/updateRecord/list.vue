<template>
  <div>
    <!-- 查询条件 -->
    <div style="margin-bottom: 2px">
      <div style="float:right">
        <el-button-group>
          <el-button type="primary" icon="el-icon-search" @click="query"></el-button>
          <el-tooltip content="重置查询条件" placement="top">
            <el-button icon="el-icon-refresh" @click="resetQuery"></el-button>
          </el-tooltip>
        </el-button-group>
      </div>
      <el-form ref="formQuery" :model="queryParams" label-width="68px" inline size="mini">
        <el-form-item label="更新标题" prop="title">
          <el-input v-model="queryParams.title" clearable @keyup.enter.native="query"></el-input>
        </el-form-item>
        <el-form-item label="更新内容" prop="content">
          <el-input v-model="queryParams.content" clearable @keyup.enter.native="query"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- / 查询条件 -->
    <!-- 数据表格 -->
    <el-table :data="list" ref="tableList" v-loading="loading" highlight-current-row border stripe>
      <el-table-column prop="title" label="更新标题" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="update_date" label="更新日期" width="100"></el-table-column>
      <el-table-column prop="content" label="内容" min-width="150" show-overflow-tooltip></el-table-column>
      <el-table-column prop="create_user_name" width="90" label="录入员"></el-table-column>
      <el-table-column prop="create_time" width="120" label="创建时间">
        <template slot-scope="{row}">
          <span>{{row.create_time | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="update_time" width="120" label="最近更新时间">
        <template slot-scope="{row}">
          <span>{{row.update_time | formatDate}}</span>
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
  </div>
</template>

<script>
import api from '@/api/sys/updateRecord'
import Pagination from '@/components/common/Pagination'
export default {
  name: 'List',
  components: { Pagination },
  data () {
    return {
      queryParams: {
        title: '',
        content: '',
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
    query () {
      this.queryParams.page = 1
      this.getData()
    },
    resetQuery () {
      this.$refs.formQuery.resetFields()
      this.query()
    },
    getData () {
      this.loading = true
      api.getList(this.queryParams).then(res => {
        this.list = res.data.list
        this.dataTotal = res.data.total
        this.loading = false
      })
    },
    del (row) {
      const confirmText = '确定删除此更新记录吗？'
      this.$confirm(confirmText, '提示', {
        type: 'warning'
      }).then(() => {
        api.del(row.id).then(res => {
          this.reload()
          this.$message.success('删除成功')
          this.$emit('del')
        })
      })
    }
  }
}
</script>

<style>
</style>

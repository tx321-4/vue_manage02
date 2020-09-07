<!--
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
<template>
  <div>
    <!-- 查询条件 -->
    <div style="margin-bottom: 2px ">
      <div style="float:right">
        <el-button-group>
          <el-button type="primary" icon="el-icon-search" @click="query"></el-button>
          <el-tooltip content="重置查询条件" placement="top">
            <el-button icon="el-icon-refresh" @click="resetQuery"></el-button>
          </el-tooltip>
        </el-button-group>
      </div>
      <el-form
        ref="formQuery"
        :model="queryParams"
        class="c-form-condensed"
        label-width="68px"
        inline
        size="mini"
      >
        <el-form-item label="更新标题" prop="title">
          <el-input v-model="queryParams.title" clearable></el-input>
        </el-form-item>
        <el-form-item label="更新内容" prop="content">
          <el-input v-model="queryParams.content" clearable></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- / 查询条件 -->
    <!-- 数据表格 -->
    <el-table
      :data="list"
      ref="tableList"
      v-loading="loading"
      highlight-current-row
      border
      stripe
      row-key="id"
      :size="size"
      @sort-change="sortChange"
    >
      <el-table-column prop="title" label="更新标题" width="120" show-overflow-tooltip></el-table-column>
      <el-table-column prop="update_date" label="更新日期" sortable="custom" width="100"></el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        sortable="custom"
        min-width="150"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="create_user_name" width="90" label="录入员"></el-table-column>
      <el-table-column prop="crate_time" width="120" label="创建时间" sortable="custom">
        <template slot-scope="{row}">
          <span>{{ row.create_time | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="update_time" label="最近更新时间" width="120" sortable="custom">
        <template slot-scope="{row}">
          <span>{{row.update_time | formatDate}}</span>
        </template>
      </el-table-column>
      <!-- slot[cloumn] -->
      <slot name="column"></slot>
      <!-- / slot[cloumn] -->
    </el-table>
    <!-- / 数据表格 -->
    <!-- 分页 -->
    <pagination
      v-show="dataTotal>0"
      :total="dataTotal"
      :page.sync="requestParams.page"
      :limit.sync="requestParams.limit"
      @pagination="getData"
    />
    <!-- / 分页 -->
  </div>
</template>

<script>
import api from '@/api/sys/updateRecord'
import Pagination from '@/components/common/Pagination'

export default {
  name: 'List',
  components: { Pagination },
  props: {
    size: {
      type: String,
      default: ''
    },
    params: {
      default: () => ({})
    },
    init: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      dataTotal: 0,
      initparams: {},
      queryParams: {
        title: '',
        content: ''
      },
      requestParams: {
        page: 1, // 当前页
        limit: 20 // 分页大小
      }
    }
  },
  created () {

  },
  mounted () {
    if (this.init) {
      this.inited = true
      this.initData()
    }
  },
  methods: {
    // 初始化数据
    initData (params = {}) {
      this.initParams = { ...params }
      this.resetQuery()
    },
    getData () {
      this.loading = true
      api.getList({ ...this.requestParams, ...this.params, ...this.initParams }).then(res => {
        this.list = res.data.list
        this.dataTotal = res.data.total
        this.loading = false
      })
    },
    query ({ key } = {}) {
      if (key) {
        const value = this.queryParams[key]
        this.requestParams = { ...this.requestParams, [key]: value }
      } else {
        this.requestParams = { ...this.requestParams, ...this.queryParams }
      }
      this.requestParams.page = 1
      this.getData()
    },
    resetQuery () {
      this.$refs.formQuery.resetFields()
      this.query()
    },
    sortChange ({ prop, order }) {
      this.requestParams.sortProp = prop
      this.requestParams.sortOrder = order
      this.getData()
    },
    del (data) {
      const { row, index } = data
      const confirmText = '确定删除此更新记录吗？'
      this.$confirm(confirmText, '提示', {
        type: 'warning'
      }).then(() => {
        api.del(row.id).then(res => {
          // this.reload()
          this.list.splice(index, 1)
          this.$message.success('删除成功')
          this.$emit('del')
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

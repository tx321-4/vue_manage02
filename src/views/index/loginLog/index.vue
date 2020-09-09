<template>
  <div>
    <el-form ref="formQuery" :model="queryParams" inline sieze="mini">
      <el-form-item prop="ip" style="max-width: 150px;">
        <el-input
          v-model.trim="queryParams.ip"
          placeholder="IP查询"
          clearable
          prefix-icon="el-icon-search"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
        <el-button @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" ref="tableList" v-loading="loading" stripe>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="ip" label="登录IP" min-width="200"></el-table-column>
      <el-table-column prop="login_time" label="登录时间" width="200"></el-table-column>
    </el-table>
    <pagination
      v-show="dataTotal>0"
      :total="dataTotal"
      :page.sync="requestParams.page"
      :limit.sync="requestParams.limit"
      @pagination="getData"
    />
  </div>
</template>

<script>
import indexApi from '@/api/index'
import Pagination from '@/components/common/Pagination'
export default {
  name: 'LoginLog',
  components: { Pagination },
  data () {
    return {
      loading: false,
      list: [],
      unreadTotal: 0,
      dataTotal: 0,
      queryParams: {
        ip: ''
      },
      requestParams: {
        page: 1,
        limit: 20
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.loading = true
      indexApi.getLoginLogList(this.requestParams).then(res => {
        this.list = res.data.list
        console.log(this.list)
        this.dataTotal = res.data.total
        this.loading = false
      })
    },
    query () {
      this.requestParams.page = 1
      this.requestParams = Object.assign({}, this.requestParams, this.queryParams)
      this.getData()
    },
    resetQuery () {
      this.$refs.formQuery.resetFields()
      this.query()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

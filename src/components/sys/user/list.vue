<!--
此组件初始化时不会自动加载数据，请在mounted中 this.$refs.[].initData()
如果放在dialog里面的吗，请在dialog的open事件中用this.$nextTick进行加载
 -->
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
          <el-tooltip content="导出Excel" placement="top">
            <el-button icon="el-icon-download" @click="exportExcel"></el-button>
          </el-tooltip>
          <el-tooltip content="显示更多查询条件" placement="top">
            <el-button @click="queryShowMore=!queryShowMore">
              <i :class="{'el-icon-arrow-up':queryShowMore,'el-icon-arrow-down':!queryShowMore}"></i>
            </el-button>
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
        <el-form-item label="登录用户" prop="login_name">
          <el-input v-model="queryParams.login_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户名称" prop="name">
          <el-input v-model="queryParams.name" clearable></el-input>
        </el-form-item>
        <div v-show="queryShowMore">
          <el-form-item label="企业号ID" prop="qywx_user">
            <el-input v-model="queryParams.qywx_user" clearable></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!--/ 查询条件 -->
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
      @selection-change="selectionChange"
      @sort-change="sortChange"
    >
      <el-table-column fixed v-if="showSelection" type="selection" align="center" width="35" />
      <el-table-column prop="login_name" label="登录用户名" min-width="120" show-overflow-tooltip />
      <el-table-column prop="name" label="用户名称" min-width="120" show-overflow-tooltip />
      <el-table-column
        prop="qywx_user"
        label="企业号ID"
        sortable="custom"
        width="120"
        show-overflow-tooltip
      />
      <el-table-column
        prop="role_names"
        label="所属角色"
        sortable="custom"
        width="150"
        show-overflow-tooltip
      />
      <el-table-column align="center" label="菜单权限" width="80" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span class="c-link" @click="openMenuDialog(row)">查看</span>
        </template>
      </el-table-column>
      <el-table-column prop="last_login_time" width="130" label="最近登录时间" sortable="custom">
        <template slot-scope="{row}">
          <span>{{ row.last_login_time | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="create_user_name" width="90" label="录入员"></el-table-column>
      <el-table-column prop="create_time" width="120" label="创建时间" sortable="custom">
        <template slot-scope="{row}">
          <span>{{ row.create_time | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="update_time" width="120" label="最近更新时间" sortable="custom">
        <template slot-scope="{row}">
          <span>{{ row.update_time | formatDate}}</span>
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
      :page.sync="requestParams.page"
      :limit.sync="requestParams.limit"
      @pagination="getData"
    />
    <!-- / 分页 -->
  </div>
</template>

<script>
import api from '@/api/sys/user'
import Pagination from '@/components/common/Pagination'
export default {
  name: 'List',
  components: { Pagination },
  props: {
    size: {
      type: String,
      default: ''
    },
    maxHeight: {
      default: 400
    },
    init: {
      type: Boolean,
      default: false
    },
    params: {
      default: () => ({})
    },
    showMore: {
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
      inited: false,
      loading: false,
      list: [],
      dataTotal: 0,
      selectionList: [],
      queryShowMore: this.showMore,
      queryParams: {
        login_name: '',
        name: '',
        qywx_user: ''
      },
      // 数据请求的参数
      requestParams: {
        page: 1, // 当前页
        limit: 20, // 分页大小
        sortProp: '',
        sortOrder: ''
      }
    }
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
    selectionChange (valueArray) {
      this.selectionList = valueArray
    },
    // 获取数据
    getData () {
      this.loading = true
      api.getList({ ...this.requestParams, ...this.params, ...this.initParams }).then(res => {
        console.log(res)
        this.list = res.data.list
        this.dataTotal = res.data.total

        this.loading = false
      })
    },
    // 查询方法
    query ({ key } = {}) {
      if (key) {
        const value = this.queryParams[key]
        this.requestParams = { ...this.requestParams, [key]: value }
      } else {
        this.requestParams = { ...this.requestParams, ...this.queryParams }
      }
      this.getData()
    },
    // 重置查询条件
    resetQuery () {
      this.$refs.formQuery.resetFields()
      this.requestParams.page = 1
      this.query()
    },
    sortChange ({ prop, order }) {
      this.requestParams.sortProp = prop
      this.requestParams.sortOrder = order
      this.getData()
    },
    exportExcel () {

    },
    openMenuDialog () {

    }
  }
}
</script>

 <style lang="scss" scoped>
</style>

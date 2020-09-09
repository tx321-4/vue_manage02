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
            <el-button :loading="downloadloading" icon="el-icon-download" @click="exportExcel"></el-button>
          </el-tooltip>
          <el-tooltip content="显示更多查询条件" placement="top">
            <el-button @click="queryShowMore=!queryShowMore">
              <i :class="{'el-icon-arrow-up':queryShowMore,'el-icon-arrow-down':!queryShowMore}"></i>
            </el-button>
          </el-tooltip>
        </el-button-group>
      </div>
      <el-form ref="formQuery" :model="queryParams" label-width="68px" inline size="mini">
        <el-form-item label="登录用户" prop="login_name">
          <el-input v-model.trim="queryParams.login_name" clearable @keyup.enter.native="query"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" prop="name">
          <el-input v-model.trim="queryParams.name" clearable @keyup.enter.native="query"></el-input>
        </el-form-item>
        <div v-show="queryShowMore">
          <el-form-item label="企业号ID" prop="qywx_user">
            <el-input v-model.trim="queryParams.qywx_user" clearable @keyup.enter.native="query"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!--/ 查询条件 -->
    <!-- 数据表格 -->
    <el-table :data="list" ref="tableList" v-loading="loading" highlight-current-row border stripe>
      <el-table-column fixed type="selection" align="center" width="35" />
      <el-table-column prop="login_name" label="登录用户名" min-width="120" show-overflow-tooltip />
      <el-table-column prop="name" label="用户名称" min-width="120" show-overflow-tooltip />
      <el-table-column prop="qywx_user" label="企业号ID" width="120" show-overflow-tooltip />
      <el-table-column prop="role_names" label="所属角色" width="150" show-overflow-tooltip />
      <el-table-column align="center" label="菜单权限" width="80" show-overflow-tooltip>
        <template slot-scope="{row}">
          <span class="c-link" @click="openMenuDialog(row)">查看</span>
        </template>
      </el-table-column>
      <el-table-column prop="last_login_time" width="130" label="最近登录时间">
        <template slot-scope="{row}">
          <span>{{ row.last_login_time | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="create_user_name" width="90" label="录入员"></el-table-column>
      <el-table-column prop="create_time" width="120" label="创建时间">
        <template slot-scope="{row}">
          <span>{{ row.create_time | formatDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="update_time" width="120" label="最近更新时间">
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
      :page.sync="queryParams.page"
      :limit.sync="queryParams.limit"
      @pagination="getData"
    />
    <!-- / 分页 -->
    <menu-dialog :in-dialog="inDialog" ref="menuDialog" />
  </div>
</template>

<script>
import api from '@/api/sys/user'
import menuDialog from '@/components/sys/menu/treeDialog'
import Pagination from '@/components/common/Pagination'
import { parseTime } from '@/utils'

export default {
  name: 'List',
  components: { Pagination, menuDialog },
  props: {
    showMore: {
      type: Boolean,
      default: false
    },
    inDialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      list: [],
      dataTotal: 0,
      downloadloading: false,
      downloadList: [],
      queryShowMore: this.showMore,
      queryParams: {
        login_name: '',
        name: '',
        qywx_user: '',
        page: 1, // 当前页
        limit: 20 // 分页大小
      }
    }
  },
  mounted () {
    this.resetQuery()
  },
  methods: {
    // 获取数据
    getData () {
      this.loading = true
      api.getList({ ...this.queryParams }).then(res => {
        console.log(res)
        this.list = res.data.list
        this.dataTotal = res.data.total
        this.loading = false
      })
    },
    // 查询方法
    query () {
      this.getData()
    },
    // 重置查询条件
    resetQuery () {
      this.$refs.formQuery.resetFields()
      this.queryParams.page = 1
      this.query()
    },

    exportExcel () {
      this.$confirm('确认导出记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.downloadloading = true
        api.getDownloadList(this.queryParams).then(res => {
          this.downloadList = res.data.list || []
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = ['序号', '登录用户名', '用户名称', '企业号ID', '所属角色', '录入员', '创建时间', '最近登录时间']
            const filterVal = ['id', 'login_name', 'name', 'qywx_user', 'role_names', 'create_user_name', 'create_time', 'last_login_time']
            const data = this.formatJson(filterVal)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: '用户列表导出数据' + parseTime(new Date(), '{y}/{m}/{d}')
            })
            this.downloadloading = false
          })
        })
      }).catch(() => {

      })
    },
    formatJson (filterVal) {
      return this.downloadList.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
    openMenuDialog (row) {
      this.$refs.menuDialog.open().then(that => {
        that.initData({ ids: row.menu_ids, isIds: 1 })
      })
    }
  }
}
</script>

 <style lang="scss" scoped>
</style>

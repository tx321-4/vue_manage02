<template>
  <el-container style="height:100%">
    <el-header
      style="padding:0px;box-shadow:0px 0px 8px  rgba(0,0,0,.4);z-index: 1"
      :height="headerHeight"
    >
      <el-menu
        class="_layout-header"
        router
        mode="horizontal"
        :default-active="modulePath"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#409EFF"
        style="border:none"
        ref="elHeader"
      >
        <el-menu-item
          v-for="m in $store.state.user.routers.slice(0,maxShowHeaderMenu)"
          :index="m.path"
          :key="m.meta.id"
        >{{ m.meta.title }}</el-menu-item>
        <el-submenu index="/more" v-if="$store.state.user.routers.length>maxShowHeaderMenu">
          <template slot="title">更多</template>
          <el-menu-item
            v-for="m in $store.state.user.routers.slice(maxShowHeaderMenu)"
            :index="m.path"
            :key="m.meta.id"
          >{{ m.meta.title }}</el-menu-item>
        </el-submenu>
        <el-submenu index="/my" style="float:right;">
          <template slot="title">{{$store.state.user.name}}</template>
          <!-- <el-menu-item index="/my/setting" >配置</el-menu-item> -->
          <el-menu-item index @click="logout">注销</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <el-container style="overflow: auto;background-color: #FFF">
      <el-aside style="width:200px;box-shadow:0px 0px 10px  rgba(0,0,0,.12);z-index: 1">
        <el-scrollbar class="_scroll">
          <el-menu
            class="_layout-nav"
            :default-active="$route.path"
            :default-openeds="openedMenus"
            router
            ref="menu"
            style="border:none"
            @select="select"
          >
            <el-menu-tree
              v-for="menu in $store.state.user.routers"
              v-show="menu.path==modulePath"
              :menus="menu.children||[]"
              :key="menu.path"
            ></el-menu-tree>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-main style="padding:25px;">
          <el-breadcrumb separator="/" style="margin-bottom: 20px">
            <el-breadcrumb-item
              v-for="m in $route.matched"
              v-if="!m.meta.menuHide"
              :key="m.meta.id"
              :to="m.path"
              @click.native="itemClick"
            >{{m.meta.title}}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view style="margin-bottom:25px" />
        </el-main>
        <el-footer height="35px" style="text-align: center;border-top:1px solid #EBEEF5">
          <el-button type="text" @click="checkVersion">
            Copyright © {{ new Date().getFullYear() }} {{$store.state.sys.company}} | 版本：v
            <span
              ref="version"
            >20190219001</span>
          </el-button>
          <!-- <el-button type='text' @click='contactDialog=true'>系统帮助</el-button> -->
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import ElMenuTree from '@/components/common/elMenuTree'
import sysConfigApi from '@/api/sys/config'
export default {
  components: { ElMenuTree },
  data () {
    return {
      operationDialog: false,
      contactDialog: false,
      headerHeight: '60px',
      openedMenus: [],
      currentMenus: [],
      menuPath: '',
      maxShowHeaderMenu: 0
    }
  },
  created () {
    const meta = document.getElementsByTagName('meta')
    meta[1].content = ''
    this.maxShowHeaderMenu = Math.floor(document.body.clientWidth / 100) - 3
    this.checkVersion()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {

    })
  },
  mounted () {
    this.resize()
    window.addEventListener('resize', this.resize)
  },
  destroyed () {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    logout () {
      this.$confirm('您确定注销退出系统吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('logout')
      })
    },
    select (index, indexPath) {
      // console.log(this.$refs.menu.defaultActive)
    },
    resize () {
      this.headerHeight = this.$refs.elHeader.$el.clientHeight + 'px'
    },
    itemClick () {

    },
    down (d) {
      window.open('static/' + d)
    },
    checkVersion (e) {
      sysConfigApi.getValue('version').then(res => {
        const remoteVersion = res.data
        const localVersion = this.$refs.version.innerText
        if (remoteVersion !== localVersion) {
          this.$confirm('<b>检测本地系统版本与服务器系统版本不一致，是否进行刷新加载更新内容？</b><br/>本地版本：v' + localVersion + '<br/>服务器版本：v' + remoteVersion, '更新提示', {
            type: 'warning',
            dangerouslyUseHTMLString: true,
            confirmButtonText: '刷新'
          }).then(() => {
            window.location.reload()
          })
        } else {
          if (e) {
            this.$message.success('本地系统版本与服务器版本已一致，无需更新')
          }
        }
      })
    }
  },
  computed: {
    modulePath () {
      const e = this.$route.matched.length == 0 ? this.$route.path : this.$route.matched[0].path
      return e || '/'
    }
  }

}
</script>
<style lang='scss'>
._layout-header.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom-width: 4px;
}
._layout-header.el-menu--horizontal
  > .el-submenu.is-active
  > .el-submenu__title {
  border-bottom-width: 4px;
}
._layout-nav .el-menu-item.is-active {
  background-color: #ecf5ff;
  border-right: 4px solid #409eff;
}
._scroll {
  height: 100%;
  .el-scrollbar__wrap {
    overflow-x: auto;
  }
}
</style>

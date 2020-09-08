<template>
  <div v-loading="loading">
    <div style="margin-bottom: 5px">
      <el-input placeholder="输入菜单关键字" clearable v-model="filterText"></el-input>
    </div>
    <div :style="treeStyle">
      <el-tree
        node-key="id"
        :show-checkbox="showCheckbox"
        :expand-on-click-node="false"
        highlight-current
        default-expand-all
        :data="data"
        :props="{label: 'title'}"
        ref="treeList"
        :filter-node-method="filterNode"
        @node-click="nodeClick"
        @check="check"
      >
        <span slot-scope="{node,data}">
          <span style="font-size: 14px">
            {{data.title}}
            <span v-if="showPath">[{{data.path}}]</span>
          </span>
          <span>
            <slot name="right" :data="data" :node="node"></slot>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TreeList',
  data () {
    return {
      filterText: '',
      loading: false,
      data: []
    }
  },
  props: {
    showCheckbox: {
      type: Boolean,
      default: false
    },
    showPath: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: 'auto'
    }
  },
  computed: {
    treeStyle () {
      if (this.height == 'auto') {
        return {}
      } else {
        return {
          height: this.height,
          paddingRight: '15px',
          overflow: 'auto'
        }
      }
    }
  },
  methods: {
    filterNode () {

    },
    nodeClick () {

    },
    check () {

    }
  }
}
</script>

<style>
</style>

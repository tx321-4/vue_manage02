<template>
  <div>
    <el-dialog
      title="菜单列表"
      :visible.sync="show"
      :append-to-body="inDialog"
      @open="openDialog"
      @close="closeDialog"
    >
      <tree-list
        :show-checkbox="showCheckbox"
        max-height="300"
        :params="params"
        in-dialog
        ref="list"
      >
        <template slot="right" slot-scope="{data}">
          <slot name="right" :data="data">
            <el-button type="text" @click="select(data)" v-if="showSelect">选择</el-button>
          </slot>
        </template>
      </tree-list>
      <template slot="footer">
        <slot name="footer"></slot>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import treeList from './treeList'
export default {
  name: 'TreeDialog',
  components: {
    treeList
  },
  data () {
    return {
      show: false
    }
  },
  props: {
    inDialog: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    params: {
      default: () => ({})
    }
  },
  methods: {
    openDialog () {

    },
    closeDialog () {

    }
  }
}
</script>

<style>
</style>

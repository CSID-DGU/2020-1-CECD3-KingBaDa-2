<template>
  <sidebar-menu :menu="menu"
  @toggle-collapse="onToggleCollapse" @item-click="onItemClick" />
</template>

<script>
export default {
  data () {
    return {
      menu: [
        {
          href: '/',
          title: '홈',
          icon: 'fa fa-home'
        },
        {
          href: '/basic-usage',
          title: '공지사항',
          icon: 'fa fa-comment'
        },
        // {
        //   header: true,
        //   title: 'Usage',
        //   hiddenOnCollapse: true
        // },
        {
          href: '/props',
          title: '대시보드',
          icon: 'fa fa-th'
        },
        {
          href: '/events',
          title: '데이터',
          icon: 'fa fa-folder-open'
        },
        {
          href: '/styling',
          title: '설정',
          icon: 'fa fa-cog'
        }
      ]
    }
  },
  methods: {
   
  },
  props: {
    // Sidebar Collapse state
    collapsed: {
      type: Boolean,
      default: false
    },

    // Sidebar width (expanded)
    width: {
      type: String,
      default: '350px'
    },

    // Sidebar width (collapsed)
    widthCollapsed: {
      type: String,
      default: '50px'
    },

    // Keep only one child opened at a time (first level only)
    showOneChild: {
      type: Boolean,
      default: false
    },

    // Keep all child open
    showChild: {
      type: Boolean,
      default: false
    },

    // Sidebar right to left
    rtl: {
      type: Boolean,
      default: false
    },

    // Make sidebar relative to the parent (by default the sidebar is relative to the viewport)
    relative: {
      type: Boolean,
      default: false
    },

    // Hide toggle collapse btn
    hideToggle: {
      type: Boolean,
      default: false
    },

    // Sidebar theme (available themes: 'white-theme')
    theme: {
      type: String,
      default: ''
    },

    // Disable hover on collapse mode
    disableHover: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .v-sidebar-menu {
    background-color: #6FCEDC;
  }
</style>


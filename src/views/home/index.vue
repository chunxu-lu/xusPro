<template>
  <div class="store">
    <el-card>
      <div class="tit">技术栈</div>
      <div class="store_content">
        <el-row :gutter="8">
          <el-col :xs="24" :md="12" :lg="8">
            <div class="store_item">
              <div class="logo">
                <img src="@/assets/vue.png" alt="" />
                <el-button class="vue" @click="goVue" size="small"> Go </el-button>
              </div>
              <div class="content">渐进式 JavaScript 框架 易学易用，性能出色，适用场景丰富的 Web 前端框架。</div>
            </div>
          </el-col>
          <el-col :xs="24" :md="12" :lg="8">
            <div class="store_item">
              <div class="logo">
                <img src="@/assets/pinia.svg" alt="" />
                <el-button class="pinia" @click="goPinia" size="small"> Go </el-button>
              </div>
              <div class="content">Pinia 符合直觉的 Vue.js 状态管理库</div>
            </div>
          </el-col>
          <el-col :xs="24" :md="12" :lg="8">
            <div class="store_item">
              <div class="logo">
                <img src="@/assets/element.png" alt="" />
                <el-button @click="goElement" class="element" size="small"> Go </el-button>
              </div>
              <div class="content">网站快速成型工具， Element-plus一套为开发者、设计师和产品经理准备的桌面端组件库</div>
            </div>
          </el-col>
          <el-col :xs="24" :md="12" :lg="8">
            <div class="store_item">
              <div class="logo">
                <img src="@/assets/ts.png" alt="" />
                <el-button class="ts" @click="goTs" size="small"> Go </el-button>
              </div>
              <div class="content">
                TypeScript具有类型系统，且是JavaScript的超集。 它可以编译成普通的JavaScript代码。
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :md="12" :lg="8">
            <div class="store_item">
              <div class="logo">
                <img src="@/assets/vite.svg" alt="" />
                <el-button class="vite" @click="goVite" size="small"> Go </el-button>
              </div>
              <div class="content">Vite 下一代的前端工具链 为开发提供极速响应</div>
            </div>
          </el-col>
          <el-col :xs="24" :md="12" :lg="8">
            <div class="store_item">
              <div class="logo">
                <img src="@/assets/ECharts.png" alt="" />
                <el-button @click="goECharts" class="ECharts" size="small"> Go </el-button>
              </div>
              <div class="content">Apache ECharts 一个基于 JavaScript 的开源可视化图表库</div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
const title = import.meta.env.VITE_APP_TITLE

function goVue() {
  window.open('https://cn.vuejs.org/')
}

function goPinia() {
  window.open('https://pinia.vuejs.org/zh/')
}

function goElement() {
  window.open('https://element-plus.org/zh-CN/')
}

function goTs() {
  window.open('https://www.typescriptlang.org/zh/')
}

function goVite() {
  window.open('https://vitejs.dev/guide/')
}

function goECharts() {
  window.open('https://echarts.apache.org/zh/index.html')
}
</script>

<style lang="scss" scoped>
.store {
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
  box-sizing: border-box;

  .el-card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    :deep(.el-card__body) {
      padding: 0 !important;
    }

    .tit {
      width: 100%;
      border-bottom: 1px var(--el-border-color-dark) solid;
      padding: 20px;
      padding-bottom: 10px;
      font-size: 16px;
      font-weight: bold;
    }
    .store_content {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      flex-wrap: wrap;
      padding: 10px;
      line-height: 30px;
      .store_item {
        padding: 10px;
        min-height: 130px;
        border-radius: 5px;
        margin-bottom: 8px;
        border: 1px var(--el-border-color-dark) solid;
        .logo {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .el-button {
            color: #fff;
          }
          .vue {
            background-color: #41b883;
          }
          .vite {
            background-color: #9c5cfe;
          }
          .element {
            background-color: #409eff;
          }
          .ECharts {
            background-color: #a9314d;
          }
          .pinia {
            background-color: #ffc61e;
          }
          .ts {
            background-color: #007acc;
          }
          img {
            width: 50px;
            height: 50px;
          }
        }
        .content {
          margin-top: 5px;
          // color: gray;
        }
      }
    }
  }
}
</style>

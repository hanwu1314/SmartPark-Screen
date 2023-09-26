<script setup>
import { onMounted, ref } from 'vue'
import { useParkInfo, useInitBarChart, useInitPieChart } from '@/hooks'
import { Application } from '@splinetool/runtime'
import Loading from '@/component/Loading.vue'
import VScaleScreen from 'v-scale-screen'
const { parkInfo, getUserInfo } = useParkInfo()
const { initBarChart, barChart } = useInitBarChart(parkInfo)
const { initPieChart, pieChart } = useInitPieChart(parkInfo)

const isShowLoading = ref(false)

// 初始化3d模型
const ref3d = ref(null)
const init3dModel = () => {
  isShowLoading.value = true
  // 实例化解析器实例
  let spline = new Application(ref3d.value)
  // 拉取模型
  spline.load('https://fe-hmzs.itheima.net/scene.splinecode').then(() => {
    // console.log('3D模型加载并渲染完毕')
    isShowLoading.value = false
  })
}

onMounted(async () => {
  await getUserInfo()
  initBarChart()
  initPieChart()
  // init3dModel()
})
</script>

<template>
  <v-scale-screen width="1920" height="1080">
    <Loading :loading="isShowLoading" />
    <div class="all-charts">
      <!-- 园区概况 -->
      <div class="section-one">
        <img class="img-header" src="@/assets/park-overview.png" alt="" />
        <div class="icons-container">
          <div class="item">
            <div class="icons-item building-icon">
              <span class="number">
                {{ parkInfo.base?.buildingTotal }}
              </span>
            </div>
            <span class="title">楼宇总数</span>
            <span class="unity">（栋）</span>
          </div>
          <div class="item">
            <div class="icons-item enterprise-icon">
              <span class="number">
                {{ parkInfo.base?.chargePoleTotal }}
              </span>
            </div>
            <span class="title">入驻企业总数</span>
            <span class="unity">（家）</span>
          </div>
          <div class="item">
            <div class="icons-item car-icon">
              <span class="number">
                {{ parkInfo.base?.enterpriseTotal }}
              </span>
            </div>
            <span class="title">车位总数</span>
            <span class="unity">（个）</span>
          </div>
          <div class="item">
            <div class="icons-item rod-icon">
              <span class="number">
                {{ parkInfo.base?.parkingTotal }}
              </span>
            </div>
            <span class="title">一体杆总数</span>
            <span class="unity">（个）</span>
          </div>
        </div>
      </div>
      <!-- 园区年度收入分析 -->
      <div class="section-two">
        <img class="img-header" src="@/assets/park-annual-revenue.png" alt="" />
        <div class="bar-chart-titile">
          <span>单位：元</span>
          <div>
            <span class="bar-icon blue-bar-icon"></span>
            <span class="bar-icon red-bar-icon"></span>
            收入情况
          </div>
        </div>
        <div class="bar-chart" ref="barChart"></div>
      </div>
      <!-- 园区产业分布 -->
      <div class="section-three">
        <img
          class="img-header"
          src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E4%BA%A7%E4%B8%9A%E5%88%86%E5%B8%83%402x.png"
          alt="" />
        <div class="pie-chart" ref="pieChart"></div>
      </div>
    </div>
    <div class="model-container">
      <!-- 准备3D渲染节点 -->
      <canvas class="canvas-3d" ref="ref3d" />
    </div>
  </v-scale-screen>
</template>

<style scoped lang="scss">
.all-charts {
  position: absolute;
  top: 0;
  left: 0;
  width: 480px;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(
    to left,
    rgba(0, 6, 15, 0) 0%,
    rgba(0, 6, 15, 0) 20%,
    rgba(0, 0, 0, 0.4) 30%,
    rgba(0, 0, 0, 0.6) 40%,
    rgba(1, 4, 11, 1) 70%,
    #04070d 100%
  );

  .img-header {
    height: 30px;
  }
}

.section-one {
  flex-basis: 25%;
  .icons-container {
    display: flex;
    justify-content: space-between;
    padding: 20px 0;

    .item {
      text-align: center;
      display: flex;
      flex-direction: column;
      flex: 1;

      .icons-item {
        height: 80px;
        position: relative;

        .number {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-size: 18px;
          font-family: FontquanXinYiGuanHeiTi, FontquanXinYiGuanHeiTi-Regular;
          color: #ffffff;
        }
      }

      .building-icon {
        background: url('@/assets/building-icon.png') no-repeat 50% 0 / contain;
      }

      .enterprise-icon {
        background: url('@/assets/enterprise-icon.png') no-repeat 50% 0 /
          contain;
      }

      .rod-icon {
        background: url('@/assets/rod-icon.png') no-repeat 50% 0 / contain;
      }

      .car-icon {
        background: url('@/assets/car-icon.png') no-repeat 50% 0 / contain;
      }

      .title,
      .unity {
        font-size: 14px;
        color: #cdd7e1;
      }

      .title {
        margin-top: 8px;
      }
    }
  }
}

.section-two {
  flex-basis: 35%;
  margin-top: 50px;

  .bar-chart {
    width: 100%;
    height: calc(100% - 90px);
  }
}

.section-three {
  flex-basis: 40%;

  .pie-chart {
    position: relative;
    margin: 0 auto;
    padding-bottom: 20px;
    width: 80%;
    height: calc(100% - 40px);
  }
}

.model-container {
  height: 100%;
  background-color: black;
  width: 100%;
  flex-shrink: 0;
}
</style>

<template>
  <div class="verify">
    <canvas id="verify" :width="contentWidth" :height="contentHeight"></canvas>
  </div>
</template>

<script setup>
import md5 from "js-md5";
import { toRefs, onMounted, watch, defineProps, defineEmits } from "vue";
const props = defineProps({
  change: {
    // 刷新验证码使用
    type: Boolean,
    default: false,
  },
  contentWidth: {
    // 验证码图片宽
    type: Number,
    default: 112,
  },
  contentHeight: {
    // 验证码图片高
    type: Number,
    default: 38,
  },
});
const emit = defineEmits(["getCode"]);
// 默认值
const defaultData = {
  identifyCode: "", // 验证码值，未加密的
  identifyCodes: "1234567890", // 生成验证码的元素，可以加入字母
  fontSizeMin: 30, // 图片上验证文字的最小值
  fontSizeMax: 40, // 图片上验证文字的最小值
  backgroundColorMin: 180, // 图片背景色值最小
  backgroundColorMax: 240, // 图片背景色值最大
  colorMin: 50, // 文字色值最小
  colorMax: 160, // 文字色值最大
  lineColorMin: 40, // 干扰线色值最小
  lineColorMax: 120, // 干扰线色值最大
  dotColorMin: 0, // 干扰点色值最小
  dotColorMax: 255, // 干扰点色值最大
  lineSum: 3, // 干扰线数量
  dotSum: 20, // 干扰点数量
};
// 父级传递
const { contentWidth, contentHeight, change } = toRefs(props);

// 生成一个随机数
const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// 生成一个随机的颜色
const randomColor = (min, max) => {
  let r = randomNum(min, max);
  let g = randomNum(min, max);
  let b = randomNum(min, max);
  return "rgb(" + r + "," + g + "," + b + ")";
};

// 创建图形
const drawPic = () => {
  let canvas = document.getElementById("verify");
  let ctx = canvas.getContext("2d");
  ctx.textBaseline = "bottom";
  // 绘制背景
  ctx.fillStyle = randomColor(
    defaultData.backgroundColorMin,
    defaultData.backgroundColorMax
  );
  ctx.fillRect(0, 0, contentWidth.value, contentHeight.value);
  // 绘制文字
  for (let i = 0; i < defaultData.identifyCode.length; i++) {
    drawText(ctx, defaultData.identifyCode[i], i);
  }
  drawLine(ctx);
  drawDot(ctx);
};

// 绘制文字
const drawText = (ctx, txt, i) => {
  ctx.fillStyle = randomColor(defaultData.colorMin, defaultData.colorMax);
  ctx.font =
    randomNum(defaultData.fontSizeMin, defaultData.fontSizeMax) + "px SimHei";
  let x =
    (i + 1) * (contentWidth.value / (defaultData.identifyCode.length + 1));
  let y = randomNum(defaultData.fontSizeMax, contentHeight.value - 5);
  var deg = randomNum(-45, 45);
  // 修改坐标原点和旋转角度
  ctx.translate(x, y);
  ctx.rotate((deg * Math.PI) / 180);
  ctx.fillText(txt, 0, 0);
  // 恢复坐标原点和旋转角度
  ctx.rotate((-deg * Math.PI) / 180);
  ctx.translate(-x, -y);
};

// 绘制干扰线
const drawLine = (ctx) => {
  for (let i = 0; i < 4; i++) {
    ctx.strokeStyle = randomColor(
      defaultData.lineColorMin,
      defaultData.lineColorMax
    );
    ctx.beginPath();
    ctx.moveTo(
      randomNum(0, contentWidth.value),
      randomNum(0, contentHeight.value)
    );
    ctx.lineTo(
      randomNum(0, contentWidth.value),
      randomNum(0, contentHeight.value)
    );
    ctx.stroke();
  }
};
// 绘制干扰点
const drawDot = (ctx) => {
  for (let i = 0; i < 60; i++) {
    ctx.fillStyle = randomColor(0, 255);
    ctx.beginPath();
    ctx.arc(
      randomNum(0, contentWidth.value),
      randomNum(0, contentHeight.value),
      1,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }
};

// 生成图片
const makeCode = () => {
  defaultData.identifyCode = "";
  for (let i = 0; i < 4; i++) {
    defaultData.identifyCode +=
      defaultData.identifyCodes[randomNum(0, defaultData.identifyCodes.length)];
  }

  // 绘制图片
  drawPic();
  // 返回加密后的图片验证码值
  emit("getCode", md5(defaultData.identifyCode));
};

// 初识函数，生成图片
onMounted(() => {
  makeCode();
});

// 监听change变化，重新生成图片
watch(change, () => {
  makeCode();
});
</script>

<style lang="less"></style>

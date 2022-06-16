<template>
  <div>
    <n-card class="box-card h100">
      <div id="toolbar-container"></div>
      <div class="editor" id="editor-container"></div>
    </n-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { NCard } from "naive-ui";
import "@wangeditor/editor/dist/css/style.css";
import { createEditor, createToolbar } from "@wangeditor/editor";
const editorConfig = {};
editorConfig.placeholder = "请输入内容";
editorConfig.onChange = (editor) => {
  // 当编辑器选区、内容变化时，即触发
  console.log("content", editor.children);
  console.log("html", editor.getHtml());
};

// 工具栏配置
const toolbarConfig = {};

onMounted(() => {
  // 创建编辑器
  const editor = createEditor({
    selector: "#editor-container",
    config: editorConfig,
    mode: "default", // 或 'simple' 参考下文
  });
  // 创建工具栏
  const toolbar = createToolbar({
    editor,
    selector: "#toolbar-container",
    config: toolbarConfig,
    mode: "default", // 或 'simple' 参考下文
  });
});
</script>

<style>
.editor {
  min-height: 600px;
}
</style>

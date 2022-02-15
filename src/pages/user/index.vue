<template>
  <n-card class="box-card" title="用户数据">
    <n-data-table
      ref="table"
      :columns="columns"
      :data="data"
      :pagination="pagination"
    />
  </n-card>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { NDataTable, NCard } from "naive-ui";

const columns = [
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Age",
    key: "age",
  },
  {
    title: "Address",
    key: "address",
  },
];

const data = Array.apply(null, { length: 46 }).map((_, index) => ({
  key: index,
  name: `Edward King ${index}`,
  age: 32,
  address: `London, Park Lane no. ${index}`,
}));

export default defineComponent({
  components: { NDataTable, NCard },
  setup() {
    const paginationReactive = reactive({
      page: 2,
      pageSize: 5,
      showSizePicker: true,
      pageSizes: [3, 5, 7],
      onChange: (page) => {
        paginationReactive.page = page;
      },
      onUpdatePageSize: (pageSize) => {
        paginationReactive.pageSize = pageSize;
        paginationReactive.page = 1;
      },
    });

    return {
      data,
      columns,
      pagination: paginationReactive,
    };
  },
});
</script>

<template>
  <div class="bg-white p-1 relative">
    <table class="table-auto">
      <caption class="mb-2">
        Sample
        {{
          data.title
        }}
      </caption>
      <thead class="border-b-2 mb-2">
        <tr>
          <th></th>

          <th>Axial</th>
          <th>Area</th>
          <th>Count</th>
          <th>Mean</th>
          <th>Std Dev</th>
          <th>Min</th>
          <th>Max</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data.data" :key="index">
          <td @click="indexClicked(index)">
            <svg
              class="w-4 h-4 cursor-pointer"
              fill="none"
              stroke="red"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="delete-row path"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </td>
          <td>{{ item.depth }}</td>
          <td>{{ item.area }}</td>
          <td>{{ item.count }}</td>
          <td>{{ item.mean }}</td>
          <td>{{ item.std }}</td>
          <td>{{ item.min }}</td>
          <td>{{ item.max }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <ButtonDrag class="icon-button absolute right-2 top-2" />
</template>

<script>
import { onMounted, reactive } from 'vue';
import ButtonDrag from '../../components/Buttons/ButtonDrag.vue';
export default {
  components: {
    ButtonDrag,
  },
  setup() {
    const data = reactive({ data: null, title: '' });

    window.api.receive('image-data-change:reply', (arg) => {
      data.data = arg.table;
      data.title = arg.sampleNo;
      console.log('image-data-changed', data.value);
    });

    onMounted(() => {
      window.api.send('table-mounted');
    });

    // Send index to delete
    const indexClicked = (index) => {
      console.log(index);
      window.api.send('delete-data-at', index);
    };
    return {
      data,
      indexClicked,
    };
  },
};
</script>

<style scoped>
th,
td,
tr {
  padding: 0 0.75rem;
  font-size: 1rem;
  text-align: center;
}
</style>

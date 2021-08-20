<template>
  <div
    id="toolbar"
    class="flex flex-col flex-nowrap items-center justify-start gap-2 px-4"
  >
    <ButtonDownloadStudies class="mb-2" />
    <ButtonOpenDicom class="mb-2" />
    <ButtonAddCircle />
    <ButtonClearLast />
    <ButtonClearAll class="mb-2" />
    <ButtonPrevImg />
    <ButtonNextImg class="mb-2" />
    <ButtonRecordData />
    <ButtonCreateCharts />
    <ButtonDeleteCharts class="mb-2" />
    <ButtonSaveCsv />
    <ButtonSaveImages />
    <ButtonTest />
  </div>
</template>

<script>
import ButtonOpenDicom from './Buttons/ButtonOpenDicom.vue';
import ButtonDownloadStudies from './Buttons/ButtonDownloadStudies.vue';
import ButtonAddCircle from './Buttons/ButtonAddCircle.vue';
import ButtonClearLast from './Buttons/ButtonClearLast.vue';
import ButtonClearAll from './Buttons/ButtonClearAll.vue';
import ButtonPrevImg from './Buttons/ButtonPrevImg.vue';
import ButtonSaveCsv from './Buttons/ButtonSaveCsv.vue';
import ButtonDeleteCharts from './Buttons/ButtonDeleteCharts.vue';
import ButtonCreateCharts from './Buttons/ButtonCreateCharts.vue';
import ButtonRecordData from './Buttons/ButtonRecordData.vue';
import ButtonNextImg from './Buttons/ButtonNextImg.vue';
import ButtonSaveImages from './Buttons/ButtonSaveImages.vue';
import ButtonTest from './Buttons/ButtonTest.vue';

export default {
  components: {
    ButtonOpenDicom,
    ButtonDownloadStudies,
    ButtonAddCircle,
    ButtonClearLast,
    ButtonClearAll,
    ButtonRecordData,
    ButtonNextImg,
    ButtonPrevImg,
    ButtonCreateCharts,
    ButtonDeleteCharts,
    ButtonSaveCsv,
    ButtonSaveImages,
    ButtonTest,
  },
};
</script>

<style></style>

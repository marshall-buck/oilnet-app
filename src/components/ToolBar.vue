<template>
  <div
    id="toolbar"
    class="flex flex-col flex-nowrap items-center justify-start gap-2 px-4"
  >
    <ButtonDownloadStudies class="mb-4" />
    <ButtonOpenDicom class="mb-4" />
    <ButtonAddCircle />
    <ButtonClearLast />
    <ButtonClearAll class="mb-4" />
    <ButtonPrevImg />
    <ButtonNextImg class="mb-4" />
    <ButtonRecordData class="mb-4" />

    <ButtonSave />
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

import ButtonRecordData from './Buttons/ButtonRecordData.vue';
import ButtonNextImg from './Buttons/ButtonNextImg.vue';
import ButtonSave from './Buttons/ButtonSave.vue';
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

    ButtonSave,
    ButtonTest,
  },
};
</script>

<style></style>

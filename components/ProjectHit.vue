<script setup lang="ts">
const props = defineProps<{
  project: AlgoliaProjectEntry;
}>();

const modelSelections = useState<ModelSelectionsType>(
  "model-selections",
  () => ({
    type: "Residential",
    squareFootage: undefined,
    ppReview: false,
    ppInspection: false,
  }),
);

onMounted(() => {
  modelSelections.value.type =
    props.project.commercial_fee > 0 && !props.project.residential_fee
      ? "Commercial"
      : "Residential";
});

const total = computed(() => {
  let sub = {
    Residential: props.project.residential_fee,
    Commercial: props.project.commercial_fee,
  }[modelSelections.value.type];

  if (props.project.square_footage && modelSelections.value.squareFootage) {
    sub *= modelSelections.value.squareFootage;
  }

  const ppAdjustment = modelSelections.value.ppReview
    ? modelSelections.value.ppInspection
      ? 0.25
      : 0.75
    : modelSelections.value.ppInspection
    ? 0.5
    : 1;
  sub *= ppAdjustment;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(sub ?? 0);
});

const valid = computed(() => true);
</script>

<template>
  <URadioGroup
    class="mb-2"
    v-if="project.residential_fee > 0 && project.commercial_fee > 0"
    v-model="modelSelections.type"
    :items="['Residential', 'Commercial']"
  />

  <UInputNumber
    class="mb-3 font-black"
    v-if="project.square_footage"
    v-model="modelSelections.squareFootage"
    :step="50"
    :min="0"
    placeholder="Square Footage"
  />

  <UCheckbox
    class="mb-1"
    v-model="modelSelections.ppReview"
    label="Plan Review completed by Private Provider"
  />
  <UCheckbox
    class="mb-5"
    v-model="modelSelections.ppInspection"
    label="Inspection(s) completed by Private Provider"
  />

  <p class="text-lg" v-if="valid">{{ total }}</p>
</template>

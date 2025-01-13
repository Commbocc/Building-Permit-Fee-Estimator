<script setup lang="ts">
const props = defineProps<{
  project: AlgoliaProjectEntry;
}>();

const modelSelections = useState("model-selections", () => ({
  type: "Residential",
  squareFootage: undefined,
  ppReview: false,
  ppInspection: false,
}));

onMounted(() => {
  // modelSelections.type = ?
});

const total = computed(() => {
  let sub = {
    Residential: props.project.residential_fee,
    Commercial: props.project.commercial_fee,
  }[modelSelections.value.type];

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(sub ?? 0);
});

const valid = computed(() => true);
</script>

<template>
  <URadioGroup
    v-if="project.residential_fee > 0 && project.commercial_fee > 0"
    v-model="modelSelections.type"
    :items="['Residential', 'Commercial']"
  />

  <UInputNumber
    v-if="project.square_footage"
    v-model="modelSelections.squareFootage"
    :step="50"
    :min="0"
    placeholder="Square Footage"
  />

  <UCheckbox
    v-model="modelSelections.ppReview"
    label="Plan Review completed by Private Provider"
  />
  <UCheckbox
    v-model="modelSelections.ppInspection"
    label="Inspection(s) completed by Private Provider"
  />

  <code v-if="valid">{{ total }}</code>
</template>

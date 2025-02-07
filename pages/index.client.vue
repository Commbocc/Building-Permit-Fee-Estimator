<script setup lang="ts">
import {
  AisInstantSearch,
  AisSearchBox,
  AisHits,
  AisRefinementList,
} from "vue-instantsearch/vue3/es";

const indexName = "test_permit_fees";
const algolia = useAlgoliaRef();

const transformCategories =
  (taxonomy_uid: string) =>
  (
    items: ToDo[],
    { results }: { results: { hits: AlgoliaProjectEntry[] } },
  ) => {
    const categories = new Map<string, boolean>(
      results.hits
        .flatMap((x) => x.taxonomies)
        .filter((x) => x.taxonomy_uid === taxonomy_uid)
        .map((x) => [x.term_uid, true]),
    );

    function getTermNameFromKey(key: string) {
      return {
        fbc_occupancy_classification: "FBC Occupancy Classification",
        building: "Building",
        mechanical: "Mechanical",
        plumbing: "Plumbing",
        electrical: "Electrical",
        signs: "Signs",
        new_construction_permits: "New Construction Permits",
        additions_permits: "Additions Permits",
        alterations_permits: "Alterations Permits",
        trade_permits: "Trade Permits",
        miscellaneous_permits: "Miscellaneous Permits",
        general_admim: "General Admin",
      }[key];
    }

    return items
      .filter((x) => categories.has(x.value))
      .map((x) => ({ ...x, label: getTermNameFromKey(x.label) }));
  };
</script>

<template>
  <ais-instant-search :index-name="indexName" :search-client="algolia">
    <UContainer class="my-5">
      <div class="sm:grid grid-cols-3 gap-3">
        <aside class="space-y-3">
          <UCard>
            <template #header>Project Type</template>
            <ais-refinement-list
              attribute="type"
              :class-names="{
                'ais-RefinementList-labelText': 'ml-1',
                'ais-RefinementList-count': 'ml-1',
              }"
            />
          </UCard>

          <UCard>
            <template #header>Project Category</template>
            <ais-refinement-list
              attribute="taxonomies.term_uid"
              :transform-items="
                transformCategories('building_permit_project_category')
              "
              :class-names="{
                'ais-RefinementList-labelText': 'ml-1',
                'ais-RefinementList-count': 'ml-1',
              }"
            />
          </UCard>

          <UCard>
            <template #header>Project Subcategory</template>
            <ais-refinement-list
              attribute="taxonomies.term_uid"
              :transform-items="
                transformCategories('building_permit_project_subcategory')
              "
              :class-names="{
                'ais-RefinementList-labelText': 'ml-1',
                'ais-RefinementList-count': 'ml-1',
              }"
            />
          </UCard>
        </aside>

        <section class="col-span-2">
          <div class="space-y-3">
            <ais-search-box />

            <ais-hits
              v-slot="{ items }: { items: AlgoliaProjectEntry[] }"
              class="space-y-3"
            >
              <UAccordion
                :items="items.map((item) => ({ label: item.title, ...item }))"
              >
                <template #body="{ item }">
                  <ProjectHit :project="item" />
                </template>
              </UAccordion>
            </ais-hits>
          </div>
        </section>
      </div>

      <section class="text-xs prose mx-auto my-5 max-w-full">
        <hr />
        <p>
          To determine what type of permit application must be submitted for
          your project, use the
          <a href="https://commbocc.github.io/hillsgovhub-permit-types/"
            >Permit Types by Project Tool</a
          >.
        </p>
        <p>
          This permit fee estimator is for Building Fees only. Fees include
          building, mechancial, electrical, and plumbing disciplines. Other fees
          may apply such as fire, natural resources, impact, utility, etc. as
          required per project scope. For information regarding trade permit
          fees, visit the
          <a href="https://hcfl.gov/businesses/permits-and-records/permit-fees"
            >Permit Fees</a
          >
          page.
        </p>
        <p>
          The amounts provided reflect an estimate for the costs of plan review
          and permits based on the information entered by the client. This
          estimate can provide guidance for decision-making, however it is not
          intended to be a guarantee of the actual building permitting costs.
          Other miscellaneous fees may be added and may alter the final costs.
          The final determination of the permit cost will be made through the
          plan review process itself.
        </p>
        <p>
          Fees for permits or services not specified in any of the fee scheduels
          will be calculated by the Building Official or their designee
          utilizing the most current fee study methodology based on the
          estimated actual cost to perform the work.
        </p>
        <p>
          All permitting fees will be assessed surcharges as required per
          established Florida Statutes.
        </p>
        <p>DCBA and DBR fee of 2.5% will apply.</p>
      </section>
    </UContainer>
  </ais-instant-search>
</template>

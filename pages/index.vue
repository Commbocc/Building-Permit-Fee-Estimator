<script setup lang="ts">
const { data } = await useFetch(`/api/test`);
</script>

<template>
  <UContainer class="my-5">
    <div class="prose mx-auto">
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam sapiente
        ex quam in id deserunt expedita sint quasi, repellendus alias,
        necessitatibus, quas laudantium. Minima fuga iure aperiam accusamus
        quibusdam architecto!
      </p>

      <UCheckbox label="Plan Review completed by Private Provider" />
      <UCheckbox label="Inspection(s) completed by Private Provider" />

      <hr />

      <details>
        <pre class="text-sm">{{ data }}</pre>
      </details>

      <hr />

      <section class="text-xs">
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
    </div>
  </UContainer>
</template>

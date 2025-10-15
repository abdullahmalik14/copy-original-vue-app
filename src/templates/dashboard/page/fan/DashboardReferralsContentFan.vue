<template>
  <DashboardWrapperTwoColContainer>
      <section class="space-y-4">
        <div class="rounded-2xl border p-4">
          <h2 class="text-lg font-semibold">Referrals Overview</h2>
          <p class="text-sm opacity-80">
            Track invites, conversions, and earnings.
          </p>
        </div>
        <!-- swap these for your real UI atoms under components/ui/... -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="rounded-2xl border p-4">
            <p class="text-xs opacity-70">Total Invites</p>
            <p class="text-3xl fontbold">128</p>
          </div>
          <div class="rounded-2xl border p-4">
            <p class="text-xs opacity-70">Conversions</p>
            <p class="text-3xl fontbold">46</p>
          </div>
          <div class="rounded-2xl border p-4">
            <p class="text-xs opacity-70">Referral Earnings</p>
            <p class="text-3xl fontbold">$1,842</p>
          </div>
        </div>
        <div class="rounded-2xl border">
          <div class="flex items-center justify-between px-4 py-3 border-b">
            <h3 class="font-semibold">Recent Referrals</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full text-sm">
              <thead class="bg-gray-50">
                <tr>
                  <th class="text-left px-4 py-2">User</th>
                  <th class="text-left px-4 py-2">Joined</th>
                  <th class="text-left px-4 py-2">Status</th>
                  <th class="text-left px-4 py-2">Earnings</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="border-t"
                  @click="$emit('table:row-select', { handle: '@amy' })"
                >
                  <td class="px-4 py-2">@amy</td>
                  <td class="px-4 py-2">2025-08-12</td>
                  <td class="px-4 py-2">Active</td>
                  <td class="px-4 py-2">$24.00</td>
                </tr>
                <tr
                  class="border-t"
                  @click="$emit('table:row-select', { handle: '@ben' })"
                >
                  <td class="px-4 py-2">@ben</td>
                  <td class="px-4 py-2">2025-08-10</td>
                  <td class="px-4 py-2">Trial</td>
                  <td class="px-4 py-2">$0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
  </DashboardWrapperTwoColContainer>
</template>
<script setup>
import DashboardWrapperTwoColContainer from '@/components/dashboard/DashboardWrapperTwoColContainer.vue';

</script>

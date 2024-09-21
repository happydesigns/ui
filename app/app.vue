<template>
  <Footer>
    <template #left>
      <p>Left 1</p>
    </template>
    <template #right>
      <p>Right 1</p>
      <p>Right 2</p>
    </template>
    <template #copyright="{ copyrightYear, copyrightHolder, copyrightHomepage }">
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Copyright © {{ copyrightYear }}
        <NuxtLink :to="copyrightHomepage">
          {{ copyrightHolder }}
        </NuxtLink>
      </p>
    </template>
  </Footer>
</template>

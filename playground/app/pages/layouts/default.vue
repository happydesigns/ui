<template>
  <NuxtLayout>
    <section class="p-8 space-y-6">
      <h1 class="text-2xl font-bold">
        Break Words Test
      </h1>

      <p>
        Normal text should look fine. But below is one long, unbroken “word”
        without spaces. If `break-words` is active, it will wrap onto multiple
        lines instead of overflowing the screen.
      </p>

      <div class="border p-4 font-mono">
        supercalifragilisticexpialidocioussupercalifragilisticexpialidocioussupercalifragilisticexpialidocious
      </div>
    </section>
  </NuxtLayout>
</template>

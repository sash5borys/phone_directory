<template>
  <div id="observer" ref="observer" />
</template>

<script>
import { onMounted, onUnmounted, ref } from "@vue/composition-api";

export default {
  name: "IObserver",
  setup(props, { emit }) {
    const observer = ref();

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            emit("intersect");
          }
        });
      },
      { threshold: 1 }
    );

    // Lifecycle Events
    onMounted(() => {
      io.observe(observer.value);
    });
    onUnmounted(() => {
      io.disconnect();
    });
    return { observer, io };
  }
};
</script>

<style scoped lang="scss">
#observer {
  height: 0;
}
</style>

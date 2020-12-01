<template lang="pug">
    span.action-button.items-center.justify-center(@click="$emit('click')")
        span.action-button__element(
            :class="{ \
                'action-button__element--rotate': rotate, \
                'action-button__element--dark-background': dark \
            }"
        ) +
</template>

<script>
export default {
  name: 'ActionButton',
  props: {
    rotate: Boolean,
    dark: Boolean,
  },
};
</script>

<style lang="scss" scoped>
@import "src/styles/variables";

.action-button {
    font-size: 1.8rem;
    font-weight: 200;
    color: $app-light;
    cursor: pointer;
    display: flex;
    width: 1.875rem;
    height: 1.875rem;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;

    &__element {
        &--rotate {
            transform: rotate(45deg);
        }

        &--dark-background {
            color: $primary-on-dark;
        }
    }
}
</style>

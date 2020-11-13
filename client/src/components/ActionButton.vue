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
.action-button {
    font-size: 1.8rem;
    font-weight: 200;
    color: #A8A8A8;
    cursor: pointer;
    display: flex;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;

    &__element {
        &--rotate {
            transform: rotate(45deg);
        }

        &--dark-background {
            color: white;
        }
    }
}
</style>

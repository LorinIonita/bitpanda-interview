<template lang="pug">
    label.checkbox.items-center(
        :class="{ 'checkbox--checked': value }" @click="$emit('input', !value)"
    )
        span.checkbox__checkmark
        span.label__container
            span.label
                slot
            span.checkbox__caption -&nbsp;
                slot(name="caption")
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    value: Boolean,
  },
};
</script>

<style lang="scss" scoped>
@import "src/styles/variables";

.checkbox {
    $self: &;

    position: relative;
    cursor: pointer;

    &__checkmark {
        display: inline-flex;
        position: relative;
        height: 1.875rem;
        width: 1.875rem;
        border-radius: 50%;
        border: $default-border-width solid $primary-alternate;
        margin-right: 0.5rem;
        flex-shrink: 0;

        &::after {
            content: "";
            position: absolute;
            display: none;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) rotate(35deg);
            width: 0.375rem;
            height: 1rem;
            border: solid $primary;
            border-width: 0 0.125rem 0.125rem 0;
        }
    }

    &__caption {
        font-size: 0.625rem;
        color: $primary-on-light;
        margin-left: 0.5rem;
    }

    &--checked {
        #{$self}__checkmark {
            &::after {
                display: block;
            }
        }

        .label {
            text-decoration: line-through;
            color: $grayed-out;
        }
    }
}

.label__container {
    text-align: left;
}
</style>

<template lang="pug">
    label.checkbox.items-center
        input.checkbox__input(
            type="checkbox"
            :value="value"
            :checked="value"
            @input="$emit('input', !value)"
        )/
        span.checkbox__checkmark
        span.checkbox__label__container
        span.checkbox__label(:class="{ 'checkbox__label--checked': value }")
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
.checkbox {
    $self: &;

    position: relative;
    cursor: pointer;

    &__checkmark {
        display: inline-block;
        position: relative;
        height: 1.875rem;
        width: 1.875rem;
        min-height: 1.875rem;
        min-width: 1.875rem;
        border-radius: 50%;
        border: 0.0625rem solid #BDDAD5;
        margin-right: 0.5rem;

        &:after {
            content: "";
            position: absolute;
            display: none;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) rotate(35deg);
            width: 0.375rem;
            height: 1rem;
            border: solid #5DC2AF;
            border-width: 0 2px 2px 0;
        }
    }

    &__input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;

        &:checked ~ #{$self}__checkmark {
            &:after {
                display: block;
            }
        }
    }

    &__label {
        &--checked {
            text-decoration: line-through;
            color: #AEAEAE;
        }
    }

    &__caption {
        font-size: 0.625rem;
        color: #5E5E5E;
        margin-left: 0.5rem;
    }
}
</style>

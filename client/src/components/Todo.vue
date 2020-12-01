<template lang="pug">
    li.todos__item.items-center
        checkbox(:value="todo.done" @input="toggle(todo._id, $event)") {{ todo.description }}
            template(#caption) {{ humanizedDate }}
        action-button(rotate @click="remove(todo._id)")
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from '@vue/composition-api';
import { DateTime } from 'luxon';

import ActionButton from './ActionButton.vue';
import Checkbox from './Checkbox.vue';

export default defineComponent({
  name: 'Todo',
  components: { Checkbox, ActionButton },
  props: ['todo', 'index', 'toggle', 'remove'],
  setup(props) {
    let { updatedAt } = props.todo as Record<string, string>;
    const humanizeDate = (date: string): string | null => DateTime.fromISO(date).toRelative();
    const humanizedDate = ref(humanizeDate(updatedAt));

    watchEffect(() => {
      updatedAt = (props.todo as Record<string, string>).updatedAt;
      humanizedDate.value = humanizeDate(updatedAt);
    });

    setInterval(() => {
      humanizedDate.value = humanizeDate(updatedAt);
    }, 5000);

    return {
      humanizedDate,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "src/styles/variables";

.todos__item {
    border-top: $default-border-width solid $border-color;
    min-height: 3.125rem;
    padding: 0 1.125rem;
    font-weight: 200;
    justify-content: space-between;

    .action-button {
        opacity: 1;
        visibility: hidden;
    }

    &:hover {
        .action-button {
            opacity: 1;
            visibility: visible;
        }
    }
}
</style>

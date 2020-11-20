<template lang="pug">
    li.todos__item.items-center
        checkbox(:value="todo.done" @input="toggle(todo._id, $event)") {{ todo.description }}
            template(#caption) {{ humanizeDate(todo.updatedAt) }}
        action-button(rotate @click="remove(todo._id)")
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { DateTime } from 'luxon';

import ActionButton from './ActionButton.vue';
import Checkbox from './Checkbox.vue';

export default defineComponent({
  name: 'Todo',
  components: { Checkbox, ActionButton },
  props: ['todo', 'index', 'toggle', 'remove'],
  methods: {
    humanizeDate: (date: string): string | null => DateTime.fromISO(date).toRelative(),
  },
});
</script>

<style lang="scss" scoped>
.todos__item {
    border-top: 0.0625rem solid #C6C6C6;
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

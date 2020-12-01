<template lang="pug">
    #app.todo-app
        #todos.todos__container
            input#search(v-model="search" placeholder="Search")
            ul.todos
                li.todos__header
                    input(
                        type="text"
                        v-model="todo.description"
                        placeholder="Take a todo"
                        @keypress.enter="addTodo"
                        ref="todoInput"
                    )
                    action-button(@click="addTodo")
                todo(
                    v-for="(todo, index) in todos"
                    :todo="todo"
                    :index="index"
                    :key="index"
                    :toggle="toggleTodo"
                    :remove="removeTodo"
                )
        .errors(v-if="apiErrors") {{ apiErrors }}
            action-button.errors__close(rotate dark @click="clearApiErrors")
</template>

<script lang="ts">
import {
  defineComponent, reactive, ref, computed, onMounted,
} from '@vue/composition-api';

import ActionButton from './components/ActionButton.vue';
import Todo from './components/Todo.vue';
/* eslint-disable */
import { read, create, remove, update } from './use/fetch';
/* eslint-enable */

interface TodoInterface {
  _id: string;
  description: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

export default defineComponent({
  name: 'App',
  components: { Todo, ActionButton },
  setup() {
    const apiErrors = ref('');
    const search = ref<string>('');
    const todoInput = ref<HTMLInputElement>();

    const todos = ref<TodoInterface[]>([]);
    const todo = reactive<TodoInterface>({
      _id: '',
      description: '',
      done: false,
      createdAt: '',
      updatedAt: '',
    });

    const filteredTodos = computed(() => todos.value.filter(
      ({ description }) => description.toLowerCase().includes(search.value.toLowerCase()),
    ));

    const fetchTodos = async (): Promise<void> => {
      try {
        todos.value = await read<TodoInterface[]>('http://localhost:3000/api/v1/todo');
      } catch (e) {
        apiErrors.value = e as string;
      }
    };

    const addTodo = async (): Promise<void> => {
      if (todo.description.length) {
        try {
          await create('http://localhost:3000/api/v1/todo', todo);
        } catch (e) {
          apiErrors.value = e as string;
        }

        todo.description = '';
        await fetchTodos();
      } else {
        (todoInput.value as HTMLInputElement).focus();
      }
    };

    const removeTodo = async (identifier: string): Promise<void> => {
      try {
        await remove('http://localhost:3000/api/v1/todo', identifier);
      } catch (e) {
        apiErrors.value = e as string;
      }

      await fetchTodos();
    };

    const toggleTodo = async (todoID: string, toggled: boolean): Promise<void> => {
      try {
        await update('http://localhost:3000/api/v1/todo', todoID, {
          done: toggled,
        });
      } catch (e) {
        apiErrors.value = e as string;
      }

      await fetchTodos();
    };

    const clearApiErrors = (): void => {
      apiErrors.value = '';
    };

    onMounted(fetchTodos);

    return {
      todos: filteredTodos,
      todo,
      addTodo,
      removeTodo,
      toggleTodo,
      search,
      todoInput,
      apiErrors,
      clearApiErrors,
    };
  },
});
</script>

<style lang="scss" scoped>
@import "styles/variables";

.todo-app {
  text-align: center;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#search {
  width: 100%;
  margin-bottom: 1rem;
  height: 2rem;
  background: $background-darker;
  border-radius: $default-radius;
  border: 0 none;
  outline: 0 none;
  padding: 0.625rem;
  font-weight: 300;
  color: $primary-on-light;
}

.todos {
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: $primary-on-dark;
  border-radius: $default-radius;
  border: $default-border-width solid $border-color;
  max-height: calc(100vh - 6.25rem);
  overflow-y: auto;

  &__container {
    width: 90%;
    max-width: 37rem;
  }

  &__header {
    font-weight: 300;
    line-height: 3.625rem;
    background-color: rgba(196, 196, 196, 0.09);
    position: relative;

    input {
      background-color: transparent;
      height: 3.625rem;
      width: 100%;
      padding: 0 1.125rem;
      border: 0 none;
      outline: none;

      &:focus {
        height: 3.5625rem;
        border-bottom: $default-border-width solid $primary;
      }
    }

    .action-button {
      position: absolute;
      right: 1.125rem;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
    }
  }
}

.errors {
  position: fixed;
  z-index: 1000;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: $error-color;
  color: $primary-on-dark;
  border-radius: $default-radius;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 300;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  box-shadow: 0 0 0.4rem $primary-shadow-color;

  &__close{
    margin-left: 1rem;
  }
}
</style>

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
                    @toggle="toggleTodo(todo._id, $event)"
                    @remove="removeTodo"
                )
        .errors(v-if="apiErrors") {{ apiErrors }}
            action-button.errors__close(rotate dark @click="clearApiErrors")
</template>

<script lang="ts">
import {
  defineComponent, reactive, ref, onMounted, computed,
} from '@vue/composition-api';

import ActionButton from './components/ActionButton.vue';
import Todo from './components/Todo.vue';

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
    const todos = ref<TodoInterface[]>([]);
    const todo: Record<string, unknown> = reactive({
      description: null,
    });
    const search = ref<string>('');
    const filteredTodos = computed(() => todos.value.filter(
      ({ description }) => description.toLowerCase().includes(search.value.toLowerCase()),
    ));
    const todoInput = ref<HTMLInputElement>();

    const fetchTodos = async (): Promise<void> => {
      try {
        todos.value = (
          await fetch('http://localhost:3000/api/v1/todo').then((resp) => resp.json())
        ) as TodoInterface[];
      } catch (e) {
        apiErrors.value = e as string;
      }
    };

    const addTodo = async (): Promise<void> => {
      if (todo.description) {
        try {
          await fetch('http://localhost:3000/api/v1/todo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
          });
        } catch (e) {
          apiErrors.value = e as string;
        }

        todo.description = null;
        await fetchTodos();
      } else {
        (todoInput.value as HTMLInputElement).focus();
      }
    };

    const removeTodo = async (identifier: string): Promise<void> => {
      try {
        await fetch(`http://localhost:3000/api/v1/todo/${identifier}`, {
          method: 'DELETE',
        });
      } catch (e) {
        apiErrors.value = e as string;
      }

      await fetchTodos();
    };

    const toggleTodo = async (todoID: string, toggled: boolean): Promise<void> => {
      try {
        await fetch(`http://localhost:3000/api/v1/todo/${todoID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            done: toggled,
          }),
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
  margin-bottom: 16px;
  height: 2rem;
  background: #DBDBDB;
  border-radius: $default-radius;
  border: 0 none;
  outline: 0 none;
  padding: 10px;
  font-weight: 300;
  color: #787878;
}

.todos {
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: #fff;
  border-radius: $default-radius;
  border: 0.0625rem solid rgba(0, 0, 0, 0.17);
  max-height: calc(100vh - 100px);
  overflow-y: auto;

  &__container {
    width: 90%;
    max-width: 37rem;
  }

  &__header {
    color: #a8a8a8;
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
        border-bottom: 0.0625rem solid #000;
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
  background: red;
  color: white;
  border-radius: $default-radius;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 300;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.2);

  &__close{
    margin-left: 1rem;
  }
}
</style>

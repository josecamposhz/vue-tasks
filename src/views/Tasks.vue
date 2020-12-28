<template>
  <section>
    <h1>My tasks</h1>
    <div class="form-group">
      <v-text-field
        ref="newNote"
        v-model="newTodo"
        placeholder="Crear una nota..."
        filled
        rounded
        @keyup.enter="addNewTodo()"
      />
    </div>

    <TaskCard :tasks="todos">
      <template v-slot:buttons="props">
        <v-btn color="error" icon @click="deleteTodo(props.index)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </TaskCard>

    <TaskCard title="Papelera" :tasks="trash">
      <template v-slot:buttons="props">
        <v-btn color="primary" icon @click="restoreTodo(props.index)">
          <v-icon>mdi-delete-restore</v-icon>
        </v-btn>
        <v-btn color="error" icon @click="deleteForever(props.index)">
          <v-icon>mdi-delete-forever</v-icon>
        </v-btn>
      </template>
    </TaskCard>

    <pre>{{ $data }} </pre>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      newTodo: "",
      todos: [],
      trash: [],
    };
  },
  created() {
    this.getTasks();
  },
  methods: {
    getTasks() {
      axios
        .get("/users/1/todos")
        .then((data) => {
          this.todos = data.data;
          // console.log(data);
        });
    },
    addNewTodo() {
      if (this.newTodo.length > 0) {
        this.todos.push({
          title: this.newTodo,
          status: false,
        });
        this.newTodo = "";
      }
    },
    deleteTodo(index) {
      this.trash.push(this.todos[index]);
      this.todos.splice(index, 1);
    },
    restoreTodo(index) {
      this.todos.push(this.trash[index]);
      this.trash.splice(index, 1);
    },
    deleteForever(index) {
      this.trash.splice(index, 1);
    },
  },
};
</script>

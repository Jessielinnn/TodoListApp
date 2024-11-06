<template>
<div class="app-container">
  <div class="tool-bar">
    <h4><font-awesome-icon icon="bars" /> FRAMEWORKS</h4>
    <span>
      <button class="add-btn" @click="openDialog('add')">
        <font-awesome-icon icon="plus-circle" /> Add
      </button>
    </span>
  </div>

  <!-- Task Data Table -->
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Deadline</th>
          <th>Priority</th>
          <th>Is Complete</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.deadline }}</td>
          <td>{{ task.priority }}</td>
          <td><input type="checkbox" v-model="task.isComplete" /></td>
          <td class="button-group">
            <button v-if="!task.isComplete" @click="openDialog('edit', index)" class="action-btn update-btn">
              <font-awesome-icon icon="pencil-square" /> Update
            </button>
            <button @click="deleteTask(index)" class="action-btn delete-btn">
              <font-awesome-icon icon="times-circle" /> Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Task Dialog -->
  <TaskDialog
    :visible="showTaskDialog"
    :mode="dialogMode"
    :task="editingTask"
    :existingTitles="existingTitles"
    @close="showTaskDialog = false"
    @add-task="addTask"
    @edit-task="updateTask"
  />
</div>
</template>

<script>
import TaskDialog from './components/TaskDialog.vue';
import { toast} from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
components: { TaskDialog },
data() {
  return {
    tasks: [],
    existingTitles: [],
    showTaskDialog: false,
    dialogMode: 'add',
    editingIndex: null,
    editingTask: null,
  };
},
computed: {
  existingTitles() {
    return this.tasks.map(task => task.title);
  },
},
methods: {
  openDialog(mode, index = null) {
    this.dialogMode = mode;
    this.showTaskDialog = true;
    if (mode === 'edit' && index !== null) {
      this.editingTask = { ...this.tasks[index] };
      this.editingIndex = index;
    } else {
      this.editingTask = null;
      this.editingIndex = null; //reset
    }
  },
  addTask(newTask) {
    if (this.editingIndex === null) {
    this.tasks.push(newTask);
    this.showToast('Task added successfully');
    this.resetDialogState();
    }
  },
  updateTask(updatedTask) {
    if (this.editingIndex !== null) {
    this.tasks.splice(this.editingIndex, 1, updatedTask);
    this.showTaskDialog = false;
    this.showToast('Task updated successfully');
    this.resetDialogState();
    }
  },
  deleteTask(index) {
    this.tasks.splice(index, 1);
    this.showToast('Task deleted successfully');
    this.resetDialogState();
  },
  resetDialogState() {
    this.editingIndex = null;
    this.showTaskDialog = false;
    this.dialogMode = 'add'; // Reset to add mode by default
  },
  showToast(message) {
    toast.success(message, {
      position: "bottom-right",
      timeout: 2000,
    });
  },
},
};
</script>
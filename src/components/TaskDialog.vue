<template>
  <div v-if="visible" class="dialog-overlay">
    <div class="dialog">
      <h3>
        <font-awesome-icon :icon="mode === 'add' ? 'plus-circle' : 'pencil-square'" />
        {{ mode === 'add' ? 'Add Task' : 'Edit Task' }}
      </h3>

      <!-- Title Field (only shown in Add mode) -->
      <div v-if="mode === 'add'" class="form-group">
        <input
          v-model="taskForm.title"
          type="text"
          placeholder="Title"
          :class="{ error: !isTitleUnique || !taskForm.title }"
          @input="validateTitle"
          required
        />
        <p v-if="!taskForm.title" class="error-text">Title is required!</p>
        <p v-if="!isTitleUnique && taskForm.title" class="error-text">Title must be unique!</p>
      </div>

      <!-- Description Field -->
      <div class="form-group floating-label">
        <input
          v-model="taskForm.description"
          type="text"
          placeholder="Description"
          :class="{ error: !taskForm.description }"
          required
        />
        <label>Description</label>
        <p v-if="!taskForm.description" class="error-text">Description is required!</p>
      </div>

      <!-- Deadline Field -->
      <div class="form-group">
        <label>Deadline</label>
        <input
          v-model="taskForm.deadline"
          type="date"
          :class="{ error: !taskForm.deadline }"
          required
        />
        <p v-if="!taskForm.deadline" class="error-text">Deadline is required!</p>
      </div>

      <!-- Priority Radio Options -->
      <div class="form-group">
        <h5>Priority</h5>
        <div class="priority-options" :class="{ error: !taskForm.priority }" required>
          <input type="radio" v-model="taskForm.priority" value="Low" /> Low
          <input type="radio" v-model="taskForm.priority" value="Med" /> Med
          <input type="radio" v-model="taskForm.priority" value="High" /> High
        </div>
        <p v-if="!taskForm.priority" class="error-text">Priority is required!</p>
      </div>

      <!-- Dialog Buttons -->
      <div class="dialog-buttons">
        <button @click="saveTask" class="dialog-btn blue-btn">
          <font-awesome-icon :icon="mode === 'add' ? 'plus-circle' : 'pencil-square'" />
          {{ mode === 'add' ? 'Add' : 'Edit' }}
        </button>
        <button @click="close" class="dialog-btn cancel-btn">
          <font-awesome-icon icon="times-circle" /> Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    mode: {
      type: String,
      required: true,
      validator: value => ['add', 'edit'].includes(value),
    },
    task: Object,
    existingTitles: Array,
  },
  data() {
    return {
      taskForm: {
        title: this.task?.title || '',
        description: this.task?.description || '',
        deadline: this.task?.deadline || '',
        priority: this.task?.priority || 'Low',
      },
      isTitleUnique: true,
    };
  },
  watch: {
    task(newTask) {
      this.taskForm = { 
        title: newTask.title || '',
      description: newTask.description || '',
      deadline: newTask.deadline || '',
      priority: newTask.priority || '',
       };

    },
  },
  methods: {
    validateTitle() {
      if (this.mode === 'add') {
        this.isTitleUnique = !this.existingTitles.includes(this.taskForm.title);
      }
    },
    saveTask() {
      if (
      (this.mode === 'add' && (!this.taskForm.title || !this.isTitleUnique)) ||
      !this.taskForm.description ||
      !this.taskForm.deadline ||
      !this.taskForm.priority
    ) return;

    // Emit event based on mode
    this.$emit(this.mode === 'add' ? 'add-task' : 'edit-task', { ...this.taskForm });
    this.close();
    },
    close() {
      this.$emit('close');
      this.resetForm();
  },
  resetForm() {
    this.taskForm = {
      title: '',
      description: '',
      deadline: '',
      priority: 'Low',
      isComplete: false,
    };
    this.isTitleUnique = true;
  },
  },
};
</script>

<style scoped>
/* Add necessary styles for dialog appearance */
</style>

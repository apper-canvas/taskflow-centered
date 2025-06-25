import taskData from '../mockData/tasks.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let tasks = [...taskData];

const taskService = {
  async getAll() {
    await delay(300);
    return [...tasks];
  },
  
  async getById(id) {
    await delay(200);
    const task = tasks.find(t => t.Id === parseInt(id, 10));
    if (!task) {
      throw new Error('Task not found');
    }
    return { ...task };
  },
  
  async create(taskData) {
    await delay(300);
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.Id)) : 0;
    const newTask = {
      ...taskData,
      Id: maxId + 1,
      createdAt: new Date().toISOString(),
      order: tasks.length
    };
    tasks.push(newTask);
    return { ...newTask };
  },
  
  async update(id, updateData) {
    await delay(300);
    const index = tasks.findIndex(t => t.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Task not found');
    }
    
    const updatedTask = {
      ...tasks[index],
      ...updateData,
      Id: tasks[index].Id // Preserve ID
    };
    tasks[index] = updatedTask;
    return { ...updatedTask };
  },
  
  async delete(id) {
    await delay(200);
    const index = tasks.findIndex(t => t.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Task not found');
    }
    
    const deletedTask = tasks[index];
    tasks.splice(index, 1);
    return { ...deletedTask };
  },
  
  async getByCategory(categoryId) {
    await delay(250);
    return tasks.filter(t => t.categoryId === categoryId).map(t => ({ ...t }));
  },
  
  async getByPriority(priority) {
    await delay(250);
    return tasks.filter(t => t.priority === priority).map(t => ({ ...t }));
  },
  
  async toggleComplete(id) {
    await delay(200);
    const index = tasks.findIndex(t => t.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Task not found');
    }
    
    tasks[index].completed = !tasks[index].completed;
    return { ...tasks[index] };
  },
  
  async reorder(taskIds) {
    await delay(300);
    taskIds.forEach((id, index) => {
      const taskIndex = tasks.findIndex(t => t.Id === parseInt(id, 10));
      if (taskIndex !== -1) {
        tasks[taskIndex].order = index;
      }
    });
    return [...tasks];
  }
};

export default taskService;
import categoriesData from "@/services/mockData/categories.json";
import tasksData from "@/services/mockData/tasks.json";
const taskService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "title_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "category_id_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "order_c" } }
        ],
        orderBy: [
          {
            fieldName: "order_c",
            sorttype: "ASC"
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },
  
  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "Tags" } },
          { field: { Name: "Owner" } },
          { field: { Name: "title_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "category_id_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "order_c" } }
        ]
      };
      
      const response = await apperClient.getRecordById('task_c', parseInt(id, 10), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching task with ID ${id}:`, error);
      throw error;
    }
  },
  
  async create(taskData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
// Only include Updateable fields
      const createData = {
        Name: taskData.Name || "",
        Tags: taskData.Tags || "",
        Owner: taskData.Owner || null,
        title_c: taskData.title,
        completed_c: taskData.completed || false,
        priority_c: taskData.priority || "medium",
        category_id_c: taskData.categoryId || null,
        due_date_c: taskData.dueDate || null,
        created_at_c: new Date().toISOString(),
        order_c: taskData.order || 0
      };
      
      const params = {
        records: [createData]
      };
      
      const response = await apperClient.createRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return result.data;
        } else {
          throw new Error(result.message || 'Failed to create task');
        }
      }
      
      throw new Error('No result returned from create operation');
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },
  
  async update(id, updateData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Only include Updateable fields that are provided
      const updateFields = {
        Id: parseInt(id, 10)
      };
      
      if (updateData.Name !== undefined) {
        updateFields.Name = updateData.Name;
      }
      if (updateData.Tags !== undefined) {
        updateFields.Tags = updateData.Tags;
      }
if (updateData.Owner !== undefined) {
        updateFields.Owner = updateData.Owner;
      }
      if (updateData.title !== undefined) {
        updateFields.title_c = updateData.title;
      }
      if (updateData.completed !== undefined) {
        updateFields.completed_c = updateData.completed;
      }
      if (updateData.priority !== undefined) {
        updateFields.priority_c = updateData.priority;
      }
      if (updateData.categoryId !== undefined) {
        updateFields.category_id_c = updateData.categoryId;
      }
      if (updateData.dueDate !== undefined) {
        updateFields.due_date_c = updateData.dueDate;
      }
      if (updateData.createdAt !== undefined) {
        updateFields.created_at_c = updateData.createdAt;
      }
      if (updateData.order !== undefined) {
        updateFields.order_c = updateData.order;
      }
      
      const params = {
        records: [updateFields]
      };
      
      const response = await apperClient.updateRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return result.data;
        } else {
          throw new Error(result.message || 'Failed to update task');
        }
      }
      
      throw new Error('No result returned from update operation');
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },
  
  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        RecordIds: [parseInt(id, 10)]
      };
      
const response = await apperClient.deleteRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (!result.success) {
          throw new Error(result.message || 'Failed to delete task');
        }
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  },
  
  async getByCategory(categoryId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "category_id_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "order_c" } }
        ],
        where: [
          {
            FieldName: "category_id_c",
            Operator: "EqualTo",
            Values: [categoryId]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching tasks by category:", error);
      throw error;
    }
  },
  
  async getByPriority(priority) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "category_id_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "order_c" } }
        ],
        where: [
          {
            FieldName: "priority_c",
            Operator: "EqualTo",
            Values: [priority]
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching tasks by priority:", error);
      throw error;
    }
  },
  
  async toggleComplete(id) {
    try {
      // First get the current task
      const currentTask = await this.getById(id);
      
      // Update the completed status
      return await this.update(id, {
        completed: !currentTask.completed
      });
    } catch (error) {
      console.error("Error toggling task completion:", error);
      throw error;
    }
  },
  
  async reorder(taskIds) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
// Create update records for each task with new order
      const updateRecords = taskIds.map((id, index) => ({
        Id: parseInt(id, 10),
        order_c: index
      }));
      
      const params = {
        records: updateRecords
      };
      
      const response = await apperClient.updateRecord('task_c', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      // Return updated tasks
      return this.getAll();
    } catch (error) {
      console.error("Error reordering tasks:", error);
      throw error;
    }
  }
};

export default taskService;
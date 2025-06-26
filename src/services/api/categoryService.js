const categoryService = {
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
          { field: { Name: "color" } },
          { field: { Name: "order" } }
        ],
        orderBy: [
          {
            fieldName: "order",
            sorttype: "ASC"
          }
        ]
      };
      
      const response = await apperClient.fetchRecords('category', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data || [];
    } catch (error) {
      console.error("Error fetching categories:", error);
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
          { field: { Name: "color" } },
          { field: { Name: "order" } }
        ]
      };
      
      const response = await apperClient.getRecordById('category', parseInt(id, 10), params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching category with ID ${id}:`, error);
      throw error;
    }
  },
  
  async create(categoryData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Only include Updateable fields
      const createData = {
        Name: categoryData.name || categoryData.Name,
        Tags: categoryData.Tags || "",
        Owner: categoryData.Owner || null,
        color: categoryData.color,
        order: categoryData.order
      };
      
      const params = {
        records: [createData]
      };
      
      const response = await apperClient.createRecord('category', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return result.data;
        } else {
          throw new Error(result.message || 'Failed to create category');
        }
      }
      
      throw new Error('No result returned from create operation');
    } catch (error) {
      console.error("Error creating category:", error);
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
      
      // Only include Updateable fields
      const updateFields = {
        Id: parseInt(id, 10)
      };
      
      if (updateData.name !== undefined || updateData.Name !== undefined) {
        updateFields.Name = updateData.name || updateData.Name;
      }
      if (updateData.Tags !== undefined) {
        updateFields.Tags = updateData.Tags;
      }
      if (updateData.Owner !== undefined) {
        updateFields.Owner = updateData.Owner;
      }
      if (updateData.color !== undefined) {
        updateFields.color = updateData.color;
      }
      if (updateData.order !== undefined) {
        updateFields.order = updateData.order;
      }
      
      const params = {
        records: [updateFields]
      };
      
      const response = await apperClient.updateRecord('category', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return result.data;
        } else {
          throw new Error(result.message || 'Failed to update category');
        }
      }
      
      throw new Error('No result returned from update operation');
    } catch (error) {
      console.error("Error updating category:", error);
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
      
      const response = await apperClient.deleteRecord('category', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (!result.success) {
          throw new Error(result.message || 'Failed to delete category');
        }
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  }
};

export default categoryService;
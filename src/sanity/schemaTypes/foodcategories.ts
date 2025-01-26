const foodCategorySchema = {
    name: "foodCategories",
    title: "Food Categories",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Category Name",
        type: "string",
      },
      {
        name: "description",
        title: "Description",
        type: "text",
        rows: 3,
      },
    ],
  };
  export default foodCategorySchema;
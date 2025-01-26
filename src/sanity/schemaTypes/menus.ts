const menuSchema = {
    name: 'menu',
    type: 'document',
    title: 'Menu',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Menu Title',
      },
      {
        name: 'sections',
        type: 'array',
        title: 'Menu Sections',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'title', type: 'string', title: 'Section Title' },
              {
                name: 'items',
                type: 'array',
                title: 'Items',
                of: [
                  {
                    type: 'object',
                    fields: [
                      { name: 'name', type: 'string', title: 'Item Name' },
                      { name: 'description', type: 'text', title: 'Description' },
                      { name: 'calories', type: 'number', title: 'Calories' },
                      { name: 'price', type: 'number', title: 'Price' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'image',
        type: 'image',
        title: 'Menu Image',
        options: {
          hotspot: true,
        },
      },
    ],
  };
export default menuSchema;
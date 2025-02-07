const orderSchema = {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    { name: 'userId', title: 'User ID', type: 'reference', to: [{ type: 'user' }] },
    { 
      name: 'items', 
      title: 'Items', 
      type: 'array', 
      of: [{ 
        type: 'object', 
        fields: [
          { name: 'name', title: 'Name', type: 'string' },
          { name: 'price', title: 'Price', type: 'number' },
          { name: 'quantity', title: 'Quantity', type: 'number' },
        ],
      }],
    },
    { name: 'subtotal', title: 'Subtotal', type: 'number' },
    { name: 'discount', title: 'Discount', type: 'number' },
    { name: 'shipping', title: 'Shipping', type: 'number' },
    { name: 'total', title: 'Total', type: 'number' },
    { 
      name: 'shippingDetails', 
      title: 'Shipping Details', 
      type: 'object', 
      fields: [
        { name: 'phone', title: 'Phone', type: 'string' },
        { name: 'company', title: 'Company', type: 'string' },
        { name: 'country', title: 'Country', type: 'string' },
        { name: 'city', title: 'City', type: 'string' },
        { name: 'address', title: 'Address', type: 'string' },
        { name: 'zipCode', title: 'Zip Code', type: 'string' },
        { name: 'postalCode', title: 'Postal Code', type: 'string' },
        { name: 'state', title: 'State', type: 'string' },
      ],
    },
    { 
      name: 'createdAt', 
      title: 'Created At', 
      type: 'datetime', 
      initialValue: new Date().toISOString(),
    },
  ],
};

export default orderSchema;

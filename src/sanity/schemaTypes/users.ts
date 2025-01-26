const userSchema = {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    { name: 'clerkId', title: 'Clerk ID', type: 'string' },
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'email', title: 'Email', type: 'string' },
    { name: 'phone', title: 'Phone', type: 'string' },
  ],
};
export default userSchema;
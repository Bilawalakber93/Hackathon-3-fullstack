import { type SchemaTypeDefinition } from 'sanity';
import chef from './chefs';
import food from './foods';
import foodCategories from "./foodcategories";
import menu from "./menus";
import user from './users';
import order from './orders';
import blog from './blogs';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [food, chef, foodCategories, menu, user, order, blog],
};

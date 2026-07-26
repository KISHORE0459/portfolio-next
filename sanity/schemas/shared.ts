import { defineField } from "sanity";

export const visibilityField = defineField({
  name: "isVisible",
  title: "Visible",
  type: "boolean",
  initialValue: true,
});

export const orderField = defineField({
  name: "order",
  title: "Order",
  type: "number",
  initialValue: 0,
});

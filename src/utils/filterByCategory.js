export function filterByCategory(items, category) {
  if (category === "all") return items;
  return items.filter((item) =>
    item.category?.toLowerCase().includes(category.toLowerCase())
  );
}

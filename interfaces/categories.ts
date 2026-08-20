export type CategoriesDropdownOption = { id: string; name: string } | null;

export type CategoriesType = ["income", "expense"];

export interface CategoriesRowProps {
  categoryId: string;
  categoryName: string;
  categoryType: string;
  categoryTypeDropdown: CategoriesType;
}

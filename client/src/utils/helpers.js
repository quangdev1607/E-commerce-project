// Trường hợp quên tạo slug cho productCategories trong database
export const createSlug = string => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('-')
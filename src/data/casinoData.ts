export const BLUE = "#015D8F";
export const campuses = ["San Joaquín", "Casa Central Valparaíso", "Viña del Mar", "Concepción"];
export const menuTypes = ["Común", "Hipocalórico", "Vegetariano"];
export const weekdays = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];
export const sections = ["Reserva de menú", "Mis reservas", "Mis consumos"];

export const minuteByCampus = {
  "San Joaquín": {
    title: "Minuta Casino Campus San Joaquín",
    subtitle: "Semana actual",
    days: [
      { day: "Lunes", entry: "Ensaladas surtidas", main: "Chapsui de ave con arroz", veg: "Chapsui de verduras con arroz", hypo: "Bowl de ensaladas surtidas con atún", dessert: "Yogurt / fruta / jalea", allergens: "Huevo, lácteo, soya" },
      { day: "Martes", entry: "Ensaladas surtidas", main: "Porotos mazamorra con longaniza", veg: "Porotos mazamorra con hamburguesa de soya", hypo: "Ensaladas surtidas con tomate relleno", dessert: "Jalea / fruta / flan", allergens: "Huevo, sulfitos, lácteos, soya" },
      { day: "Miércoles", entry: "Ensaladas surtidas", main: "Trutro entero asado con fideos mostaccioli", veg: "Verduras salteadas con fideos mostaccioli", hypo: "Ensaladas surtidas con palta reina", dessert: "Jalea / fruta / semola con leche", allergens: "Huevo, lácteo, soya, gluten" },
      { day: "Jueves", entry: "Ensaladas surtidas", main: "Merluza apanada con puré florentino", veg: "Pastel de papas carne de soya", hypo: "Ensaladas surtidas con huevo y carne", dessert: "Jalea / fruta / brownie", allergens: "Lácteo, soya, huevo, leche" },
      { day: "Viernes", entry: "Ensaladas surtidas", main: "Carbonada de vacuno", veg: "Carbonada de verduras con carne de soya", hypo: "Ensaladas griegas surtidas", dessert: "Fruta / helado / jalea", allergens: "Gluten, lácteo, soya" },
    ],
  },
  "Viña del Mar": {
    title: "Minuta Sede Viña del Mar",
    subtitle: "Semana actual",
    days: [
      { day: "Lunes", entry: "Ensaladas surtidas", main: "Pollo al horno con arroz", veg: "Quiche de verduras", hypo: "Ensalada completa", dessert: "Fruta", allergens: "Gluten, huevo" },
      { day: "Martes", entry: "Crema", main: "Pescado al vapor con puré", veg: "Guiso vegetal", hypo: "Plato liviano", dessert: "Jalea", allergens: "Pescado, lácteo" },
      { day: "Miércoles", entry: "Ensaladas surtidas", main: "Vacuno salteado", veg: "Lasaña vegetal", hypo: "Bowl proteico", dessert: "Flan", allergens: "Lácteo, gluten" },
      { day: "Jueves", entry: "Sopa", main: "Cerdo a la mostaza", veg: "Hamburguesa vegetal", hypo: "Ensalada griega", dessert: "Fruta", allergens: "Soya, mostaza" },
      { day: "Viernes", entry: "Ensaladas surtidas", main: "Pavo al romero", veg: "Charquicán de cochayuyo", hypo: "Bowl saludable", dessert: "Jalea", allergens: "Gluten, huevo" },
    ],
  },
  "Casa Central Valparaíso": {
    title: "Minuta Casa Central Valparaíso",
    subtitle: "Semana actual",
    days: [
      { day: "Lunes", entry: "Sopa / ensalada", main: "Escalopa Kayser", veg: "Quiche cebolla", hypo: "Bowl liviano", dessert: "Jalea", allergens: "Gluten, huevo" },
      { day: "Martes", entry: "Ensaladas surtidas", main: "Cerdo mongoliano", veg: "Curry de garbanzos", hypo: "Bowl integral", dessert: "Fruta", allergens: "Lácteos, gluten" },
      { day: "Miércoles", entry: "Sopa de pollo", main: "Ragout de pollo", veg: "Charquicán de cochayuyo", hypo: "Ensaladas 4", dessert: "Postres variados", allergens: "Soya, gluten" },
      { day: "Jueves", entry: "Crema", main: "Longaniza", veg: "Hamburguesa plant based", hypo: "Bowl de vegetales", dessert: "Jaleas", allergens: "Mariscos, soya" },
      { day: "Viernes", entry: "Sopa carne / verduras", main: "Burrito con pino", veg: "Fajita vegetariana", hypo: "Ensalada griega", dessert: "Fruta", allergens: "Gluten, lácteos" },
    ],
  },
  Concepción: {
    title: "Minuta Concepción",
    subtitle: "Semana actual",
    days: [
      { day: "Lunes", entry: "Crema", main: "Pasta con salsa", veg: "Verduras salteadas", hypo: "Ensalada completa", dessert: "Jalea", allergens: "Huevo" },
      { day: "Martes", entry: "Ensalada", main: "Carne al jugo", veg: "Hamburguesa vegetal", hypo: "Bowl integral", dessert: "Fruta", allergens: "Gluten, pescado" },
      { day: "Miércoles", entry: "Sopa", main: "Lasaña", veg: "Lasaña vegetal", hypo: "Plato liviano", dessert: "Flan", allergens: "Lácteos" },
      { day: "Jueves", entry: "Ensaladas surtidas", main: "Porotos", veg: "Garbanzos", hypo: "Bowl proteico", dessert: "Brownie", allergens: "Soya, gluten" },
      { day: "Viernes", entry: "Crema", main: "Charquicán", veg: "Pastel de verduras", hypo: "Ensalada griega", dessert: "Fruta", allergens: "Lácteos" },
    ],
  },
} as const;



export const initialReservations = [
  {
    id: 1,
    code: "112721",
    registeredAt: "26-05-2026 01:00",
    from: "26-06-2026",
    to: "26-06-2026",
    menu: "Hipocalórico",
    campus: "San Joaquín",
    status: "Activa",
  },
];
export const BLUE = "#015D8F";
export const campuses = ["San Joaquín", "Casa Central Valparaíso", "Viña del Mar", "Concepción"];
export const menuTypes = ["Común", "Hipocalórico", "Vegetariano"];
export const weekdays = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];
export const sections = ["Reserva de menú", "Mis reservas", "Mis consumos"];

// Alérgenos oficiales EU/Reglamento 1169/2011 + Chile
export const ALL_ALLERGENS = [
  { id: "gluten",    label: "Gluten",     emoji: "🌾" },
  { id: "lacteo",   label: "Lácteo",     emoji: "🥛" },
  { id: "huevo",    label: "Huevo",      emoji: "🥚" },
  { id: "soya",     label: "Soya",       emoji: "🫘" },
  { id: "pescado",  label: "Pescado",    emoji: "🐟" },
  { id: "mariscos", label: "Mariscos",   emoji: "🦐" },
  { id: "mostaza",  label: "Mostaza",    emoji: "🌿" },
  { id: "sulfitos", label: "Sulfitos",   emoji: "🍷" },
  { id: "frutos_secos", label: "Frutos secos", emoji: "🥜" },
] as const;

export type AllergenId = typeof ALL_ALLERGENS[number]["id"];

export type DayMenu = {
  day: string;
  entry: string;
  main: string;
  veg: string;
  hypo: string;
  dessert: string;
  // Alérgenos por tipo de menú
  allergens: {
    main: AllergenId[];
    veg: AllergenId[];
    hypo: AllergenId[];
    entry: AllergenId[];
    dessert: AllergenId[];
  };
};

export const minuteByCampus = {
  "San Joaquín": {
    title: "Minuta Casino Campus San Joaquín",
    subtitle: "Semana actual",
    days: [
      {
        day: "Lunes",
        entry: "Ensaladas surtidas",
        main: "Chapsui de ave con arroz",
        veg: "Chapsui de verduras con arroz",
        hypo: "Bowl de ensaladas surtidas con atún",
        dessert: "Yogurt / fruta / jalea",
        allergens: {
          entry: [],
          main: ["soya", "huevo"],
          veg: ["soya"],
          hypo: ["pescado"],
          dessert: ["lacteo"],
        },
      },
      {
        day: "Martes",
        entry: "Ensaladas surtidas",
        main: "Porotos mazamorra con longaniza",
        veg: "Porotos mazamorra con hamburguesa de soya",
        hypo: "Ensaladas surtidas con tomate relleno",
        dessert: "Jalea / fruta / flan",
        allergens: {
          entry: [],
          main: ["sulfitos"],
          veg: ["soya"],
          hypo: ["huevo"],
          dessert: ["lacteo", "huevo"],
        },
      },
      {
        day: "Miércoles",
        entry: "Ensaladas surtidas",
        main: "Trutro entero asado con fideos mostaccioli",
        veg: "Verduras salteadas con fideos mostaccioli",
        hypo: "Ensaladas surtidas con palta reina",
        dessert: "Jalea / fruta / sémola con leche",
        allergens: {
          entry: [],
          main: ["gluten", "huevo"],
          veg: ["gluten"],
          hypo: [],
          dessert: ["lacteo", "gluten"],
        },
      },
      {
        day: "Jueves",
        entry: "Ensaladas surtidas",
        main: "Merluza apanada con puré florentino",
        veg: "Pastel de papas carne de soya",
        hypo: "Ensaladas surtidas con huevo y carne",
        dessert: "Jalea / fruta / brownie",
        allergens: {
          entry: [],
          main: ["pescado", "gluten", "lacteo", "huevo"],
          veg: ["soya", "lacteo"],
          hypo: ["huevo"],
          dessert: ["gluten", "lacteo", "huevo"],
        },
      },
      {
        day: "Viernes",
        entry: "Ensaladas surtidas",
        main: "Carbonada de vacuno",
        veg: "Carbonada de verduras con carne de soya",
        hypo: "Ensaladas griegas surtidas",
        dessert: "Fruta / helado / jalea",
        allergens: {
          entry: [],
          main: ["gluten"],
          veg: ["soya"],
          hypo: ["lacteo"],
          dessert: ["lacteo"],
        },
      },
    ] as DayMenu[],
  },
  "Viña del Mar": {
    title: "Minuta Sede Viña del Mar",
    subtitle: "Semana actual",
    days: [
      {
        day: "Lunes",
        entry: "Ensaladas surtidas",
        main: "Pollo al horno con arroz",
        veg: "Quiche de verduras",
        hypo: "Ensalada completa",
        dessert: "Fruta",
        allergens: {
          entry: [],
          main: [],
          veg: ["gluten", "huevo", "lacteo"],
          hypo: [],
          dessert: [],
        },
      },
      {
        day: "Martes",
        entry: "Crema",
        main: "Pescado al vapor con puré",
        veg: "Guiso vegetal",
        hypo: "Plato liviano",
        dessert: "Jalea",
        allergens: {
          entry: ["lacteo"],
          main: ["pescado", "lacteo"],
          veg: [],
          hypo: [],
          dessert: [],
        },
      },
      {
        day: "Miércoles",
        entry: "Ensaladas surtidas",
        main: "Vacuno salteado",
        veg: "Lasaña vegetal",
        hypo: "Bowl proteico",
        dessert: "Flan",
        allergens: {
          entry: [],
          main: [],
          veg: ["gluten", "lacteo"],
          hypo: [],
          dessert: ["lacteo", "huevo"],
        },
      },
      {
        day: "Jueves",
        entry: "Sopa",
        main: "Cerdo a la mostaza",
        veg: "Hamburguesa vegetal",
        hypo: "Ensalada griega",
        dessert: "Fruta",
        allergens: {
          entry: [],
          main: ["mostaza"],
          veg: ["soya"],
          hypo: ["lacteo"],
          dessert: [],
        },
      },
      {
        day: "Viernes",
        entry: "Ensaladas surtidas",
        main: "Pavo al romero",
        veg: "Charquicán de cochayuyo",
        hypo: "Bowl saludable",
        dessert: "Jalea",
        allergens: {
          entry: [],
          main: [],
          veg: [],
          hypo: [],
          dessert: [],
        },
      },
    ] as DayMenu[],
  },
  "Casa Central Valparaíso": {
    title: "Minuta Casa Central Valparaíso",
    subtitle: "Semana actual",
    days: [
      {
        day: "Lunes",
        entry: "Sopa / ensalada",
        main: "Escalopa Kayser",
        veg: "Quiche cebolla",
        hypo: "Bowl liviano",
        dessert: "Jalea",
        allergens: {
          entry: [],
          main: ["gluten", "huevo"],
          veg: ["gluten", "huevo", "lacteo"],
          hypo: [],
          dessert: [],
        },
      },
      {
        day: "Martes",
        entry: "Ensaladas surtidas",
        main: "Cerdo mongoliano",
        veg: "Curry de garbanzos",
        hypo: "Bowl integral",
        dessert: "Fruta",
        allergens: {
          entry: [],
          main: ["soya", "gluten"],
          veg: [],
          hypo: ["gluten"],
          dessert: [],
        },
      },
      {
        day: "Miércoles",
        entry: "Sopa de pollo",
        main: "Ragout de pollo",
        veg: "Charquicán de cochayuyo",
        hypo: "Ensaladas variadas",
        dessert: "Postres variados",
        allergens: {
          entry: [],
          main: ["gluten"],
          veg: [],
          hypo: [],
          dessert: ["lacteo", "gluten", "huevo"],
        },
      },
      {
        day: "Jueves",
        entry: "Crema",
        main: "Longaniza con puré",
        veg: "Hamburguesa plant-based",
        hypo: "Bowl de vegetales",
        dessert: "Jalea",
        allergens: {
          entry: ["lacteo"],
          main: ["sulfitos", "lacteo"],
          veg: ["soya"],
          hypo: [],
          dessert: [],
        },
      },
      {
        day: "Viernes",
        entry: "Sopa carne / verduras",
        main: "Burrito con pino",
        veg: "Fajita vegetariana",
        hypo: "Ensalada griega",
        dessert: "Fruta",
        allergens: {
          entry: [],
          main: ["gluten"],
          veg: ["gluten"],
          hypo: ["lacteo"],
          dessert: [],
        },
      },
    ] as DayMenu[],
  },
  Concepción: {
    title: "Minuta Concepción",
    subtitle: "Semana actual",
    days: [
      {
        day: "Lunes",
        entry: "Crema",
        main: "Pasta con salsa",
        veg: "Verduras salteadas",
        hypo: "Ensalada completa",
        dessert: "Jalea",
        allergens: {
          entry: ["lacteo"],
          main: ["gluten", "huevo"],
          veg: [],
          hypo: [],
          dessert: [],
        },
      },
      {
        day: "Martes",
        entry: "Ensalada",
        main: "Carne al jugo",
        veg: "Hamburguesa vegetal",
        hypo: "Bowl integral",
        dessert: "Fruta",
        allergens: {
          entry: [],
          main: ["gluten"],
          veg: ["soya"],
          hypo: [],
          dessert: [],
        },
      },
      {
        day: "Miércoles",
        entry: "Sopa",
        main: "Lasaña",
        veg: "Lasaña vegetal",
        hypo: "Plato liviano",
        dessert: "Flan",
        allergens: {
          entry: [],
          main: ["gluten", "lacteo", "huevo"],
          veg: ["gluten", "lacteo"],
          hypo: [],
          dessert: ["lacteo", "huevo"],
        },
      },
      {
        day: "Jueves",
        entry: "Ensaladas surtidas",
        main: "Porotos con riendas",
        veg: "Garbanzos salteados",
        hypo: "Bowl proteico",
        dessert: "Brownie",
        allergens: {
          entry: [],
          main: ["sulfitos"],
          veg: [],
          hypo: [],
          dessert: ["gluten", "huevo"],
        },
      },
      {
        day: "Viernes",
        entry: "Crema",
        main: "Charquicán",
        veg: "Pastel de verduras",
        hypo: "Ensalada griega",
        dessert: "Fruta",
        allergens: {
          entry: ["lacteo"],
          main: [],
          veg: ["lacteo"],
          hypo: ["lacteo"],
          dessert: [],
        },
      },
    ] as DayMenu[],
  },
};

export const initialReservations = [
  {
    id: 1,
    code: "112721",
    registeredAt: "26-05-2026 01:00",
    dates: ["26-06-2026"],
    menu: "Hipocalórico",
    campus: "San Joaquín",
    status: "Activa",
  },
];

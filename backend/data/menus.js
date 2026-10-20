const menus = [
  // ===== Breakfast =====
  {
    id: "1",
    name: "Shakshuka",
    description: "Israeli eggs gently simmered in rich tomato sauce with fragrant spices.",
    category: "Breakfast",
    country: "images/flag/israel.png",
    price: 120,
    image: "images/menus/1-shakshuka.jpg",
    rating: { stars: 4.5, count: 112 },
    keywords: ["egg", "tomato", "breakfast"]
  },
  {
    id: "11",
    name: "Fry-Up",
    description: "A classic British breakfast with eggs, sausage, beans, and toast.",
    category: "Breakfast",
    country: "images/flag/united-kingdom.png",
    price: 120,
    image: "images/menus/11-fry-up.png",
    rating: { stars: 4.5, count: 180 },
    keywords: ["breakfast", "hearty", "fried"]
  },
  {
    id: "10",
    name: "Potato Pancakes",
    description: "Traditional Polish potato pancakes, pan-fried until golden and crisp.",
    category: "Breakfast",
    country: "images/flag/poland.png",
    price: 95,
    image: "images/menus/10-potato-pancakes.png",
    rating: { stars: 4.5, count: 240 },
    keywords: ["crispy", "street food", "potato"]
  },

  // ===== Main =====
  {
    id: "2",
    name: "Pasta",
    description: "Italian pasta tossed with creamy cheese sauce and aromatic herbs.",
    category: "Main",
    country: "images/flag/italy.png",
    price: 150,
    image: "images/menus/2-pasta.jpg",
    rating: { stars: 5.0, count: 98 },
    keywords: ["cream", "noodles", "italian"]
  },
  {
    id: "4",
    name: "Chili Con Carne",
    description: "American-style beef and beans slowly cooked with warming spices.",
    category: "Main",
    country: "images/flag/united-states.png",
    price: 180,
    image: "images/menus/4-chiliconcarne.jpg",
    rating: { stars: 5.0, count: 203 },
    keywords: ["beef", "spicy", "stew"]
  },
  {
    id: "6",
    name: "Tomato Soup",
    description: "Creamy American tomato soup made with ripe tomatoes and herbs.",
    category: "Main",
    country: "images/flag/united-states.png",
    price: 120,
    image: "images/menus/6-creamy-tomato-soup.jpg",
    rating: { stars: 5.0, count: 88 },
    keywords: ["soup", "tomato", "creamy"]
  },
  {
    id: "7",
    name: "Nachos",
    description: "Mexican tortilla chips topped with melted cheese and fresh salsa.",
    category: "Main",
    country: "images/flag/mexico.png",
    price: 130,
    image: "images/menus/7-nachos.jpg",
    rating: { stars: 4.5, count: 132 },
    keywords: ["cheese", "crispy", "snack"]
  },
  {
    id: "8",
    name: "Steak",
    description: "American grilled beef steak finished with garlic butter and herbs.",
    category: "Main",
    country: "images/flag/united-states.png",
    price: 200,
    image: "images/menus/8-steak.jpg",
    rating: { stars: 5.0, count: 90 },
    keywords: ["beef", "grilled", "premium"]
  },
  {
    id: "9",
    name: "Shrimp Salad",
    description: "Greek-inspired shrimp salad with feta cheese, olives, and greens.",
    category: "Main",
    country: "images/flag/greece.png",
    price: 180,
    image: "images/menus/9-shrimp-salad.jpg",
    rating: { stars: 4.5, count: 110 },
    keywords: ["seafood", "fresh", "salad"]
  },
  // ===== Dessert =====
  {
    id: "3",
    name: "Financier",
    description: "French almond cake baked with butter for a delicate golden finish.",
    category: "Dessert",
    country: "images/flag/france.png",
    price: 95,
    image: "images/menus/3-financier.jpg",
    rating: { stars: 4.5, count: 150 },
    keywords: ["dessert", "cake", "butter"]
  },
  {
    id: "12",
    name: "Blini",
    description: "Traditional Russian blini served with smoked salmon and cream.",
    category: "Dessert",
    country: "images/flag/russia.png",
    price: 95,
    image: "images/menus/12-blini.png",
    rating: { stars: 4.5, count: 120 },
    keywords: ["pancake", "soft", "traditional"]
  },
  {
    id: "5",
    name: "Bliss Balls",
    description: "Australian energy bites made with dates, oats, nuts, and cocoa.",
    category: "Dessert",
    country: "images/flag/australia.png",
    price: 95,
    image: "images/menus/5-energyballs.jpg",
    rating: { stars: 4.5, count: 76 },
    keywords: ["healthy", "snack", "protein"]
  }
];

module.exports = { menus };
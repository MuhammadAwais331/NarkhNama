import {
  FaAppleAlt,
  FaCarrot,
  FaLeaf,
  FaLemon,
  FaPepperHot,
  FaSeedling,
} from "react-icons/fa";

import {
  GiPotato,
  GiTomato,
  GiCabbage,
  GiWheat,
  GiRiceCooker,
  GiChickenLeg,
  GiGoat,
  GiMeat,
} from "react-icons/gi";

const products = [
  // =========================
  // VEGETABLES
  // =========================
  {
    id: 1,
    name: "Tomato",
    urdu: "ٹماٹر",
    category: "vegetables",
    icon: GiTomato,
    unit: "کلو",
  },
  {
    id: 2,
    name: "Potato",
    urdu: "آلو",
    category: "vegetables",
    icon: GiPotato,
    unit: "کلو",
  },
  {
    id: 3,
    name: "Onion",
    urdu: "پیاز",
    category: "vegetables",
    // icon: ,
    unit: "کلو",
  },
  {
    id: 4,
    name: "Carrot",
    urdu: "گاجر",
    category: "vegetables",
    icon: FaCarrot,
    unit: "کلو",
  },
  {
    id: 5,
    name: "Cabbage",
    urdu: "بند گوبھی",
    category: "vegetables",
    icon: GiCabbage,
    unit: "کلو",
  },
  {
    id: 6,
    name: "LadyFinger",
    urdu: "بینڈھی",
    category: "vegetables",
    icon: FaLeaf,
    unit: "کلو",
  },

  // =========================
  // FRUITS
  // =========================
  {
    id: 7,
    name: "Apple",
    urdu: "سیب",
    category: "fruits",
    icon: FaAppleAlt,
    unit: "کلو",
  },
  {
    id: 8,
    name: "Banana",
    urdu: "کیلا",
    category: "fruits",
    icon: FaLeaf,
    unit: "درجن",
  },
  {
    id: 9,
    name: "Pomegranate",
    urdu: "آنار",
    category: "fruits",
    icon: FaLeaf,
    unit: "کلو",
  },
  {
    id: 10,
    name: "Orange",
    urdu: "سنگترہ",
    category: "fruits",
    icon: FaLemon,
    unit: "کلو",
  },
  {
    id: 11,
    name: "Grapes",
    urdu: "انگور",
    category: "fruits",
    icon: FaSeedling,
    unit: "کلو",
  },

  // =========================
  // GRAINS
  // =========================
  {
    id: 12,
    name: "Rice",
    urdu: "چاول",
    category: "grains",
    icon: GiRiceCooker,
    unit: "کلو",
  },
  {
    id: 13,
    name: "Wheat",
    urdu: "گندم",
    category: "grains",
    icon: GiWheat,
    unit: "کلو",
  },

  // =========================
  // MEAT
  // =========================
  {
    id: 14,
    name: "Chicken",
    urdu: "چکن",
    category: "meat",
    icon: GiChickenLeg,
    unit: "کلو",
  },
  {
    id: 15,
    name: "Beef",
    urdu: "گائے کا گوشت",
    category: "meat",
    icon: GiMeat,
    unit: "کلو",
  },
  {
    id: 16,
    name: "Mutton",
    urdu: "بکرے کا گوشت",
    category: "meat",
    icon: GiGoat,
    unit: "کلو",
  },
];

export default products;
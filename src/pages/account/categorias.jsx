import { IoCartOutline, IoColorFillOutline, IoFastFoodOutline, IoNewspaperOutline, IoRestaurantOutline } from "react-icons/io5";

const styles = { color: "white", fontSize: "2rem" };

const menuCategarias = [
  {
    categoria: "Buy",
    icon: <IoCartOutline style={styles} />,
    to: "/buy",
  },
  {
    categoria: "Snack",
    icon: <IoFastFoodOutline style={styles} />,
    to: "/snack",
  },
  {
    categoria: "Market",
    icon: <IoRestaurantOutline style={styles}/>,
    to: '/market'
  },
  {
    categoria: 'Fuel',
    icon: <IoColorFillOutline style={styles} />,
    to: '/fuel'
  },
  {
    categoria: 'List',
    icon: <IoNewspaperOutline style={styles} />,
    to: '/list'
  }
];

export { menuCategarias };

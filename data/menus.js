export function getMenu(menuId){
  let matchingMenu;
  menus.forEach((menu) => {
    if (menu.id === menuId){
      matchingMenu = menu;
    }
  });
  return matchingMenu;
}

export const menus = [
  {
    id: "1",
    name: "คั่วกลิ้ง",
    price: 55,
    image: "images/menus/khua-kling.jpg",
    rating: { stars: 4.5, count: 112 },
    keywords: ["เผ็ด", "ผัดแห้ง", "หมู", "อาหารใต้", "spicy"]
  },
  {
    id: "2",
    name: "แกงคั่วหอยขมใบชะพลู",
    price: 75,
    image: "images/menus/bitter-shells-curry.jpg",
    rating: { stars: 5.0, count: 98 },
    keywords: ["แกง", "หอยขม", "ใบชะพลู", "กะทิ", "curry"]
  },
  {
    id: "3",
    name: "แกงไตปลา",
    price: 60,
    image: "images/menus/kaeng-tai-pla.jpg",
    rating: { stars: 4.5, count: 150 },
    keywords: ["แกง", "ไตปลา", "เผ็ดจัด", "อาหารใต้"]
  },
  {
    id: "4",
    name: "ขนมจีนน้ำยาปู",
    price: 80,
    image: "images/menus/nam-ya-poo.jpg",
    rating: { stars: 5.0, count: 203 },
    keywords: ["ขนมจีน", "ปู", "กะทิ", "noodle"]
  },
  {
    id: "5",
    name: "หมูผัดกะปิ",
    price: 55,
    image: "images/menus/moo-phad-kapi.jpg",
    rating: { stars: 4.5, count: 76 },
    keywords: ["หมู", "กะปิ", "ผัด"]
  },
  {
    id: "6",
    name: "น้ำพริกกุ้งเสียบ",
    price: 65,
    image: "images/menus/nam-phrik-kung-siap.jpg",
    rating: { stars: 5.0, count: 88 },
    keywords: ["น้ำพริก", "กุ้งเสียบ", "dip"]
  },
  {
    id: "7",
    name: "แกงเหลืองปลากระพง",
    price: 70,
    image: "images/menus/southern-thai-cuisine.jpg",
    rating: { stars: 4.5, count: 132 },
    keywords: ["แกงเหลือง", "ปลา", "เผ็ดเปรี้ยว"]
  },
  {
    id: "8",
    name: "ใบเหลียงผัดไข่",
    price: 50,
    image: "images/menus/bai-liang-phad-khai.jpg",
    rating: { stars: 4.0, count: 90 },
    keywords: ["ผัก", "ไข่", "ผัด", "healthy"]
  },
  {
    id: "9",
    name: "ไก่กอและ",
    price: 65,
    image: "images/menus/gai-golae.jpg",
    rating: { stars: 4.5, count: 110 },
    keywords: ["ไก่", "ย่าง", "หวานเผ็ด"]
  },
  {
    id: "10",
    name: "ไก่ทอดหาดใหญ่",
    price: 60,
    image: "images/menus/kai-tod-had-yai.jpg",
    rating: { stars: 4.5, count: 240 },
    keywords: ["ไก่ทอด", "กรอบ", "street food"]
  },
  {
    id: "11",
    name: "ข้าวยำ",
    price: 55,
    image: "images/menus/khao-yam.jpg",
    rating: { stars: 4.5, count: 180 },
    keywords: ["ข้าวยำ", "ผัก", "healthy"]
  },
  {
    id: "12",
    name: "ผัดสะตอ",
    price: 60,
    image: "images/menus/pad-sa-tor.jpg",
    rating: { stars: 4.5, count: 120 },
    keywords: ["สะตอ", "ผัด", "กะปิ"]
  },
  {
    id: "13",
    name: "หมูฮ้อง",
    price: 85,
    image: "images/menus/moo-hong.jpg",
    rating: { stars: 5.0, count: 140 },
    keywords: ["หมู", "ตุ๋น", "ภูเก็ต"]
  },
  {
    id: "14",
    name: "ปลาทรายทอดขมิ้น",
    price: 70,
    image: "images/menus/pla-tod.jpg",
    rating: { stars: 4.5, count: 95 },
    keywords: ["ปลา", "ทอด", "ขมิ้น"]
  },
  {
    id: "15",
    name: "น้ำพริกกะปิกุ้งสด",
    price: 65,
    image: "images/menus/num-prik-gung-sod.jpg",
    rating: { stars: 4.5, count: 102 },
    keywords: ["น้ำพริก", "กะปิ", "กุ้งสด"]
  },
  {
    id: "16",
    name: "ไก่ต้มขมิ้น",
    price: 60,
    image: "images/menus/kai-tom-kamin.jpg",
    rating: { stars: 4.5, count: 60 },
    keywords: ["ไก่", "ต้ม", "ขมิ้น", "ซุป"]
  }
];
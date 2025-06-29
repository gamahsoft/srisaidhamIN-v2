import {
  // FiUser,
  FiGift,
  // FiAlertCircle,
  FiHelpCircle,
  // FiTruck,
  // FiPhoneCall,
  // FiCreditCard,
  // FiMail,
  // FiMapPin,
} from "react-icons/fi";

import {
  IoBagCheckOutline,
  // IoGridOutline,
  // IoListOutline,
  // IoSettingsOutline,
} from "react-icons/io5";

import {
  HiOutlineDocumentText,
  HiOutlinePhoneIncoming,
  HiOutlineHome,
  HiOutlineUserGroup,
} from "react-icons/hi";

import { TbToolsKitchen2 } from "react-icons/tb";

const sliderData = [
  {
    id: 1,
    title: "Shrada 🙏 | Saburi 🙏",
    info: "God is one – Sabka Maaalik ek",
    url: "/search?category=fresh-vegetable",
    image: "/carousel/home-slider-1.jpg",
    // urls: 'https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg',
  },
  {
    id: 2,
    title: "Shrada 🙏 | Saburi 🙏",
    info: "My devotees see everything as their Guru",
    url: "/search?category=fresh-vegetable",
    image: "/carousel/home-slider-2.jpg",
    // urls: 'https://mdbootstrap.com/img/Photos/Slides/img%20(131).jpg',
  },
  {
    id: 3,
    title: "Shrada 🙏 | Saburi 🙏",
    info: "Hands that serve are holier than lips that pray",
    url: "/search?category=fresh-vegetable",
    image: "/carousel/home-slider-3.jpg",
    // urls: 'https://mdbootstrap.com/img/Photos/Slides/img%20(134).jpg',
  },
  {
    id: 4,
    title: "Sab ka Malik Eik",
    info: "Do not be obsessed by the importance of wealth. See the divine in the human being",
    url: "/search?category=fresh-vegetable",
    image: "/carousel/home-slider-4.jpg",
  },
  {
    id: 5,
    title: "Shrada 🙏 | Saburi 🙏",
    info: "Stay by me and keep quiet. I will do the rest",
    url: "/search?category=fresh-vegetable",
    image: "/carousel/home-slider-5.jpg",
    // urls: 'https://mdbootstrap.com/img/Photos/Slides/img%20(137).jpg',
  },
  {
    id: 6,
    title: "Shrada 🙏 | Saburi 🙏",
    info: "Spend money in charity; be generous and munificent but not extravagant",
    url: "/search?category=fresh-vegetable",
    image: "/carousel/home-slider-6.jpg",
    // urls: 'https://mdbootstrap.com/img/Photos/Slides/img%20(137).jpg',
  },
  {
    id: 7,
    title: "Shrada 🙏 | Saburi 🙏",
    info: "Get on with your worldly activities cheerfully, but do not forget God",
    url: "/search?category=fresh-vegetable",
    image: "/carousel/home-slider-7.jpg",
    // urls: 'https://mdbootstrap.com/img/Photos/Slides/img%20(137).jpg',
  },
  {
    id: 8,
    title: "Sab Ka Malik Ek ",
    info: "Give food to the hungry, water to the thirsty, and clothes to the naked",
    url: "/search?category=fresh-vegetable",
    image: "/carousel/home-slider-8.jpg",
    // urls: 'https://mdbootstrap.com/img/Photos/Slides/img%20(137).jpg',
  },
  {
    id: 9,
    title: "Shrada 🙏 | Saburi 🙏",
    info: "Distinguish right from wrong and be honest, upright and virtuous",
    url: "/search?category=fresh-vegetable",
    image: "/carousel/home-slider-9.jpg",
    // urls: 'https://mdbootstrap.com/img/Photos/Slides/img%20(137).jpg',
  },
  {
    id: 10,
    title: "Shrada 🙏 | Saburi 🙏",
    info: "Give food to the hungry, water to the thirsty, and clothes to the naked",
    url: "/search?category=fresh-vegetable",
    image: "/carousel/home-slider-10.jpg",
    // urls: 'https://mdbootstrap.com/img/Photos/Slides/img%20(137).jpg',
  },
];

export const poojaServices = [
  // {
  //   title: 'User',
  //   href: '/user/dashboard',
  //   icon: FiUser,
  // },
  {
    id: 1,
    title: "Saibaba Services",
    to: "/saibaba-services",
    icon: FiGift,
  },
  {
    id: 2,
    title: "All Pooja services",
    to: "/all-pooja-services",
    icon: IoBagCheckOutline,
  },
  {
    id: 3,
    title: "Wish List",
    to: "/wish-list",
    icon: FiHelpCircle,
  },
  {
    id: 4,
    title: "Membership",
    to: "/membership",
    icon: HiOutlineUserGroup,
  },
  {
    id: 5,
    title: "Priest Services",
    to: "/priest-services",
    icon: HiOutlinePhoneIncoming,
  },
  {
    id: 6,
    title: "Hall Rentals",
    to: "/hall-rentals",
    icon: HiOutlineHome,
  },
  {
    id: 7,
    title: "Pooja Items",
    to: "/pooja-items",
    icon: HiOutlineDocumentText,
  },
  {
    id: 8,
    title: "Kitchen",
    to: "/kitchen",
    icon: TbToolsKitchen2,
  },
];

export default sliderData;

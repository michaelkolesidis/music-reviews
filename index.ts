const albumContainer = document.querySelector(".properties");
const reviewContainer = document.querySelector(".reviews");
const container = document.querySelector(".container");
const button = document.querySelector("button");
const footer = document.querySelector(".footer");

// Classes
// ===================================
export default class MainAlbum {
  src: string;
  title: string;
  reviews: Review[];
  constructor(src: string, title: string, reviews: Review[]) {
    this.src = src;
    this.title = title;
    this.reviews = reviews;
  }
}

// Enums
// ===================================
export enum Permissions {
  ADMIN = "ADMIN",
  READ_ONLY = "READ_ONLY",
}

export enum LoyaltyUser {
  PREMIUM_USER = "PREMIUM_USER",
  BASIC_USER = "BASIC_USER",
  FREE_USER = "FREE_USER",
}

// Interfaces
// ===================================
export interface Review {
  name: string;
  stars: number;
  loyaltyUser: LoyaltyUser;
  date: string;
}

export interface Album {
  image: string;
  artist: string;
  title: string;
  price: Price;
  origin: {
    city: string;
    country: Country;
  };
  isAvailable: boolean;
}

// Types
// ===================================
export type Price = 15 | 20 | 25 | 35;
export type Country = "USA" | "Greece" | "United Kingdom" | "Australia";

// Utils
// ===================================
const reviewTotalDisplay = document.querySelector("#reviews");
const returningUserDisplay = document.querySelector("#returning-user");
const userNameDisplay = document.querySelector("#user");

export function showReviewTotal(
  value: number,
  reviewer: string,
  isLoyalty: LoyaltyUser
) {
  const iconDisplay = LoyaltyUser.PREMIUM_USER ? "★" : "";
  reviewTotalDisplay!.innerHTML =
    value.toString() +
    " review" +
    makeMultiple(value) +
    " | last reviewed by " +
    reviewer +
    " " +
    iconDisplay;
}

export function populateUser(isReturning: boolean, userName: string) {
  if (isReturning) {
    returningUserDisplay!.innerHTML = "back";
  }
  userNameDisplay!.innerHTML = `${userName} !`;
}

export function showDetails(
  value: boolean | Permissions,
  element: HTMLDivElement,
  price: number
) {
  if (value) {
    const priceDisplay = document.createElement("div");
    priceDisplay.innerHTML = "$" + price.toString();
    element.appendChild(priceDisplay);
  }
}

export function makeMultiple(value: number): string {
  if (value > 1 || value == 0) {
    return "s";
  } else return "";
}

export function getTopTwoReviews(reviews: Review[]): Review[] {
  const sortedReviews = reviews.sort((a, b) => b.stars - a.stars);
  return sortedReviews.slice(0, 2);
}

// Data
// ===================================
let isLoggedIn: boolean;

// Reviews
const reviews: Review[] = [
  {
    name: "Jerry",
    stars: 5,
    loyaltyUser: LoyaltyUser.PREMIUM_USER,
    date: "01-04-2022",
  },
  {
    name: "Althea",
    stars: 3,
    loyaltyUser: LoyaltyUser.FREE_USER,
    date: "28-03-2022",
  },
  {
    name: "Jude",
    stars: 4,
    loyaltyUser: LoyaltyUser.BASIC_USER,
    date: "27-03-2022",
  },
];

const you = {
  firstName: "Michael",
  lastName: "Kolesidis",
  permissions: Permissions.ADMIN,
  isReturning: true,
  age: 32,
  hasListened: ["the-universe-smiles", "tame-impala", "abbey-road"],
};

// Array of Properties
const properties: Album[] = [
  {
    image: "images/the-universe-smiles-upon-you.jpg",
    artist: "Khruangbin",
    title: "The Universe Smiles Upon You",
    price: 20,
    origin: {
      city: "Houston",
      country: "USA",
    },
    isAvailable: true,
  },
  {
    image: "images/the-best-of-grateful-dead.jpg",
    artist: "Grateful Dead",
    title: "The Best Of The Grateful Dead",
    price: 35,
    origin: {
      city: "San Francisco",
      country: "USA",
    },
    isAvailable: true,
  },
  {
    image: "images/tame-impala.jpg",
    artist: "Tame Impala",
    title: "Tame Impala",
    price: 25,
    origin: {
      city: "Perth",
      country: "Australia",
    },
    isAvailable: true,
  },
  {
    image: "images/abbey-road.jpg",
    artist: "Beatles",
    title: "Abbey Road",
    price: 35,
    origin: {
      city: "Liverpool",
      country: "United Kingdom",
    },
    isAvailable: true,
  },
];

// Main
// ===================================
// Functions
showReviewTotal(reviews.length, reviews[0].name, reviews[0].loyaltyUser);

populateUser(you.isReturning, you.firstName);

// Add the properties
for (let i = 0; i < properties.length; i++) {
  const card = document.createElement("div");
  card.classList.add("card");

  const image = document.createElement("img");
  image.setAttribute("src", properties[i].image);
  card.appendChild(image);

  card.innerHTML += properties[i].title;

  showDetails(you.permissions, card, properties[i].price);
  albumContainer!.appendChild(card);
}

let count = 0;
function addReviews(array: Review[]): void {
  if (!count) {
    count++;
    const topTwo = getTopTwoReviews(array);
    for (let i = 0; i < topTwo.length; i++) {
      const card = document.createElement("div");
      card.classList.add("review-card");
      card.innerHTML = topTwo[i].stars + " stars from " + topTwo[i].name;
      reviewContainer!.appendChild(card);
    }
    container!.removeChild(button!);
  }
}

button!.addEventListener("click", () => addReviews(reviews));

let nowPlaying: [string, string, string, string] = [
  "Now Playing:",
  "Jeanines",
  "Who's in The Dark",
  "1:24",
];
footer!.innerHTML =
  nowPlaying[0] +
  "   " +
  nowPlaying[1] +
  " - " +
  nowPlaying[2] +
  " " +
  nowPlaying[3];

let yourMainAlbum = new MainAlbum(
  "images/con-todo-el-mundo.jpg",
  "Con Todo El Mundo",
  [
    {
      name: "Olive",
      stars: 5,
      loyaltyUser: LoyaltyUser.PREMIUM_USER,
      date: "12-04-2021",
    },
  ]
);

const mainImageContainer = document.querySelector(".main-image");
const image = document.createElement("img");
image.setAttribute("src", yourMainAlbum.src);
mainImageContainer!.appendChild(image);

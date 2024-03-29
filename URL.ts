type urlsType = { [key: string]: string };

const urls = {
  DOWNLOADS: "/downloads",
  FAVOURITES: "/favourites",
  HOME: "/",
  UPLOADED: "/uploaded",
  NOTIFICATIONS: "/notifications",
  PROFILE: "/profile",
  QUEUE: "/queue",
  SEARCH: "/search",
  SONG: "/song",
  SONGS: "/songs",

  // API

  CHECKOUT_SESSION: "/api/checkout-session",
  CREATE_PORTAL_LINK: "/api/create-portal-link",
  WEBHOOKS: "/api/webhooks",
} as urlsType;

export default urls;

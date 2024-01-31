type urlsType = { [key: string]: string };

const urls = {
  COLLECTIONS: "/collections",
  DOWNLOADS: "/downloads",
  FAVOURITES: "/favourites",
  HOME: "/",
  LOCAL_FILES: "/local-files",
  MY_PLAYLISTS: "/my-playlists",
  NOTIFICATIONS: "/notifications",
  PROFILE: "/profile",
  RECENTLY_PLAYED: "/recently-played",
  SEARCH: "/search",

  // API

  CHECKOUT_SESSION: "/api/checkout-session",
  CREATE_PORTAL_LINK: "/api/create-portal-link",
  WEBHOOKS: "/api/webhooks",
} as urlsType;

export default urls;

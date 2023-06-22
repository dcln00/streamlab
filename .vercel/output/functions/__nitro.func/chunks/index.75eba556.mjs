import { h as defineStore } from './server.mjs';
import { ref } from 'vue';

const siteSettings = defineStore("settings", () => {
  const meta = ref({
    title: "Streamlab",
    description: "Video Streaming App"
  });
  const nav = ref([
    { name: "Home", path: "/", icon: "ri:home-line" },
    { name: "Movies", path: "/movie", icon: "ic:outline-movie" },
    { name: "TV Shows", path: "/tv", icon: "ic:baseline-tv" }
  ]);
  const mobileNav = ref([
    ...nav.value,
    { name: "Search", path: "/search", icon: "ic:outline-search" }
  ]);
  return { meta, nav, mobileNav };
});
const searchQuery = defineStore("searchterms", () => {
  const term = ref("");
  return { term };
});

export { searchQuery as a, siteSettings as s };
//# sourceMappingURL=index.75eba556.mjs.map

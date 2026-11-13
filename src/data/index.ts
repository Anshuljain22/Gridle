import { DRIVERS } from "./drivers";
import { TEAMS } from "./teams";
import { TRACKS } from "./tracks";
import { Category, Driver, Team, Track, Difficulty } from "@/types";

export { DRIVERS } from "./drivers";
export { TEAMS } from "./teams";
export { TRACKS } from "./tracks";
export { COUNTRY_CONTINENT_MAP, getContinent, isSameRegion, getFlag } from "./continents";

export function getEntitiesByCategory(category: Category): (Driver | Team | Track)[] {
  switch (category) {
    case "driver":
      return DRIVERS;
    case "team":
      return TEAMS;
    case "track":
      return TRACKS;
  }
}

export function getEntityById(category: Category, id: string): Driver | Team | Track | undefined {
  const list = getEntitiesByCategory(category);
  return list.find((item) => item.id.toLowerCase() === id.toLowerCase());
}

export function searchEntities(category: Category, query: string): (Driver | Team | Track)[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];

  const list = getEntitiesByCategory(category);

  return list.filter((item) => {
    // Check main name
    if (item.name.toLowerCase().includes(clean)) return true;

    // Check aliases
    if (item.aliases && item.aliases.some((a) => a.toLowerCase().includes(clean))) return true;

    // Check category specifics
    if (category === "driver") {
      const d = item as Driver;
      if (d.code && d.code.toLowerCase().includes(clean)) return true;
      if (d.nationality.toLowerCase().includes(clean)) return true;
      if (d.iconicTeam.toLowerCase().includes(clean)) return true;
      if (d.teams.some((t) => t.toLowerCase().includes(clean))) return true;
    } else if (category === "team") {
      const t = item as Team;
      if (t.shortName.toLowerCase().includes(clean)) return true;
      if (t.country.toLowerCase().includes(clean)) return true;
    } else if (category === "track") {
      const tr = item as Track;
      if (tr.shortName.toLowerCase().includes(clean)) return true;
      if (tr.country.toLowerCase().includes(clean)) return true;
    }

    return false;
  });
}

export function getEntitiesByDifficulty(category: Category, difficulty: Difficulty) {
  const list = getEntitiesByCategory(category);
  if (difficulty === "hard") return list; // all available
  if (difficulty === "medium") return list.filter((x) => x.difficulty === "easy" || x.difficulty === "medium");
  return list.filter((x) => x.difficulty === "easy");
}


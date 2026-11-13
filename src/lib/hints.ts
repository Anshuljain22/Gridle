import { Driver, Team, Track, Category, Hint } from "@/types";

export function getDriverHints(driver: Driver): Hint[] {
  return [
    {
      id: 1,
      unlockedAtGuess: 2,
      title: "Birth Year",
      value: `Born in ${driver.birthYear}`,
      iconName: "Calendar",
    },
    {
      id: 2,
      unlockedAtGuess: 3,
      title: "Nationality",
      value: `Raced under the flag of ${driver.nationality}`,
      iconName: "Flag",
    },
    {
      id: 3,
      unlockedAtGuess: 4,
      title: "F1 Debut",
      value: `Made Formula 1 debut in ${driver.debutYear}`,
      iconName: "PlayCircle",
    },
    {
      id: 4,
      unlockedAtGuess: 5,
      title: "Career Grand Prix Victories",
      value:
        driver.wins === 0
          ? "0 Grand Prix victories (best finish: podium/points contender)"
          : `${driver.wins} Grand Prix ${driver.wins === 1 ? "victory" : "victories"} (${driver.podiums} podiums)`,
      iconName: "Trophy",
    },
    {
      id: 5,
      unlockedAtGuess: 6,
      title: "World Championships",
      value:
        driver.championships === 0
          ? "0 World Drivers' Championships"
          : `${driver.championships} World Drivers' ${driver.championships === 1 ? "Championship" : "Championships"}${
              driver.championshipYears ? ` (${driver.championshipYears.join(", ")})` : ""
            }`,
      iconName: "Award",
    },
    {
      id: 6,
      unlockedAtGuess: 7,
      title: "Teams Represented",
      value: `Competed for ${driver.teamsCount} teams: ${driver.teams.join(", ")}`,
      iconName: "Users",
    },
  ];
}

export function getTeamHints(team: Team): Hint[] {
  const lastTitle = team.championshipYears && team.championshipYears.length > 0
    ? team.championshipYears[team.championshipYears.length - 1]
    : "None";

  return [
    {
      id: 1,
      unlockedAtGuess: 2,
      title: "Country of Origin",
      value: `Headquartered / registered in ${team.country}`,
      iconName: "MapPin",
    },
    {
      id: 2,
      unlockedAtGuess: 3,
      title: "Constructor Debut",
      value: `Made Formula 1 constructor debut in ${team.debutYear} (${team.seasonsCompeted} seasons competed)`,
      iconName: "Calendar",
    },
    {
      id: 3,
      unlockedAtGuess: 4,
      title: "Grand Prix Victories",
      value:
        team.wins === 0
          ? `0 Grand Prix victories (${team.podiums} podiums, ${team.polePositions} pole positions)`
          : `${team.wins} Grand Prix ${team.wins === 1 ? "victory" : "victories"} and ${team.podiums} podiums`,
      iconName: "Trophy",
    },
    {
      id: 4,
      unlockedAtGuess: 5,
      title: "Constructors' Championships",
      value:
        team.championships === 0
          ? "0 World Constructors' Championships"
          : `${team.championships} World Constructors' ${team.championships === 1 ? "Championship" : "Championships"}`,
      iconName: "Award",
    },
    {
      id: 5,
      unlockedAtGuess: 6,
      title: "Championship Era & Milestone",
      value:
        team.championships > 0
          ? `Most recent constructors' title: ${lastTitle} (${team.educationalInfo.highlight1Title})`
          : `Historic milestone: ${team.educationalInfo.highlight1Title}`,
      iconName: "Sparkles",
    },
    {
      id: 6,
      unlockedAtGuess: 7,
      title: "Famous Drivers",
      value: `Iconic drivers who raced for the team: ${team.famousDrivers.slice(0, 4).join(", ")}`,
      iconName: "Users",
    },
  ];
}

export function getTrackHints(track: Track): Hint[] {
  return [
    {
      id: 1,
      unlockedAtGuess: 2,
      title: "Country & Location",
      value: `Located in ${track.country} (${track.continent})`,
      iconName: "MapPin",
    },
    {
      id: 2,
      unlockedAtGuess: 3,
      title: "First Grand Prix",
      value: `First hosted an official Formula 1 Grand Prix in ${track.firstGPYea}`,
      iconName: "Calendar",
    },
    {
      id: 3,
      unlockedAtGuess: 4,
      title: "Circuit Length",
      value: `Total lap distance: ${track.lengthKm.toFixed(3)} km (${track.raceLaps} race laps)`,
      iconName: "Gauge",
    },
    {
      id: 4,
      unlockedAtGuess: 5,
      title: "Number of Corners",
      value: `${track.corners} corners on the current Grand Prix configuration`,
      iconName: "GitCommit",
    },
    {
      id: 5,
      unlockedAtGuess: 6,
      title: "Circuit Type & Direction",
      value: `${track.circuitType} circuit layout running in a ${track.direction} direction`,
      iconName: "Compass",
    },
    {
      id: 6,
      unlockedAtGuess: 7,
      title: "Famous Corner / Landmark",
      value: `Legendary sector: ${track.famousCorner} (Lap record: ${track.lapRecord})`,
      iconName: "Flame",
    },
  ];
}

export function getHintsForEntity(
  category: Category,
  entity: Driver | Team | Track
): Hint[] {
  if (category === "driver") return getDriverHints(entity as Driver);
  if (category === "team") return getTeamHints(entity as Team);
  return getTrackHints(entity as Track);
}


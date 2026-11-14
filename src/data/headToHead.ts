export interface DriverBattleCard {
  id: string;
  name: string;
  nationality: string;
  era: string;
  team: string;
  wins: number;
  poles: number;
  podiums: number;
  championships: number;
  starts: number;
}

export interface BattleStatComparison {
  key: "wins" | "poles" | "podiums" | "championships" | "starts";
  label: string;
  unit: string;
}

export const STAT_COMPARISONS: BattleStatComparison[] = [
  { key: "wins", label: "Career Grand Prix Wins", unit: "wins" },
  { key: "poles", label: "Career Pole Positions", unit: "poles" },
  { key: "podiums", label: "Career Podiums", unit: "podiums" },
  { key: "championships", label: "World Drivers' Championships", unit: "titles" },
  { key: "starts", label: "Grand Prix Race Starts", unit: "starts" },
];

export const BATTLE_DRIVERS: DriverBattleCard[] = [
  {
    id: "hamilton",
    name: "Lewis Hamilton",
    nationality: "British",
    era: "2007–Present",
    team: "Mercedes AMG / Ferrari",
    wins: 105,
    poles: 104,
    podiums: 201,
    championships: 7,
    starts: 353,
  },
  {
    id: "schumacher",
    name: "Michael Schumacher",
    nationality: "German",
    era: "1991–2012",
    team: "Scuderia Ferrari / Benetton",
    wins: 91,
    poles: 68,
    podiums: 155,
    championships: 7,
    starts: 306,
  },
  {
    id: "verstappen",
    name: "Max Verstappen",
    nationality: "Dutch",
    era: "2015–Present",
    team: "Red Bull Racing",
    wins: 63,
    poles: 40,
    podiums: 111,
    championships: 4,
    starts: 207,
  },
  {
    id: "vettel",
    name: "Sebastian Vettel",
    nationality: "German",
    era: "2007–2022",
    team: "Red Bull / Ferrari / Aston Martin",
    wins: 53,
    poles: 57,
    podiums: 122,
    championships: 4,
    starts: 299,
  },
  {
    id: "prost",
    name: "Alain Prost",
    nationality: "French",
    era: "1980–1993",
    team: "McLaren / Williams / Ferrari",
    wins: 51,
    poles: 33,
    podiums: 106,
    championships: 4,
    starts: 199,
  },
  {
    id: "senna",
    name: "Ayrton Senna",
    nationality: "Brazilian",
    era: "1984–1994",
    team: "McLaren / Lotus / Williams",
    wins: 41,
    poles: 65,
    podiums: 80,
    championships: 3,
    starts: 161,
  },
  {
    id: "alonso",
    name: "Fernando Alonso",
    nationality: "Spanish",
    era: "2001–Present",
    team: "Renault / Ferrari / Aston Martin",
    wins: 32,
    poles: 22,
    podiums: 106,
    championships: 2,
    starts: 401,
  },
  {
    id: "mansell",
    name: "Nigel Mansell",
    nationality: "British",
    era: "1980–1995",
    team: "Williams / Ferrari",
    wins: 31,
    poles: 32,
    podiums: 59,
    championships: 1,
    starts: 187,
  },
  {
    id: "stewart",
    name: "Jackie Stewart",
    nationality: "British",
    era: "1965–1973",
    team: "Tyrrell / Matra",
    wins: 27,
    poles: 17,
    podiums: 43,
    championships: 3,
    starts: 99,
  },
  {
    id: "clark",
    name: "Jim Clark",
    nationality: "British",
    era: "1960–1968",
    team: "Team Lotus",
    wins: 25,
    poles: 33,
    podiums: 32,
    championships: 2,
    starts: 72,
  },
  {
    id: "lauda",
    name: "Niki Lauda",
    nationality: "Austrian",
    era: "1971–1985",
    team: "Ferrari / McLaren / Brabham",
    wins: 25,
    poles: 24,
    podiums: 54,
    championships: 3,
    starts: 171,
  },
  {
    id: "raikkonen",
    name: "Kimi Räikkönen",
    nationality: "Finnish",
    era: "2001–2021",
    team: "Ferrari / McLaren / Lotus",
    wins: 21,
    poles: 18,
    podiums: 103,
    championships: 1,
    starts: 349,
  },
];

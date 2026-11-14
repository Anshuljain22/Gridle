export interface CareerStop {
  team: string;
  years: string;
  color: string;
  carNumber?: number;
  highlight?: string;
}

export interface CareerTimelinePuzzle {
  id: string;
  driverId: string;
  driverName: string;
  nationality: string;
  countryCode: string;
  stops: CareerStop[];
  totalChampionships: number;
  totalWins: number;
  trivia: string;
}

export const CAREER_TIMELINES: CareerTimelinePuzzle[] = [
  {
    id: "vettel-timeline",
    driverId: "vettel",
    driverName: "Sebastian Vettel",
    nationality: "German",
    countryCode: "DE",
    stops: [
      { team: "BMW Sauber", years: "2007", color: "#1E3D59", highlight: "Scored point on debut at Indianapolis" },
      { team: "Toro Rosso", years: "2007–2008", color: "#002F6C", highlight: "Historic maiden victory at Monza 2008 in torrential rain" },
      { team: "Red Bull Racing", years: "2009–2014", color: "#1E22AA", highlight: "4 consecutive World Drivers' Championships (2010–2013)" },
      { team: "Scuderia Ferrari", years: "2015–2020", color: "#E10600", highlight: "14 Grand Prix victories in scarlet red" },
      { team: "Aston Martin", years: "2021–2022", color: "#006F62", highlight: "Podium in Baku, final F1 career podium" },
    ],
    totalChampionships: 4,
    totalWins: 53,
    trivia: "Youngest World Champion in Formula 1 history at 23 years, 134 days.",
  },
  {
    id: "hamilton-timeline",
    driverId: "hamilton",
    driverName: "Lewis Hamilton",
    nationality: "British",
    countryCode: "GB",
    stops: [
      { team: "McLaren", years: "2007–2012", color: "#FF8000", highlight: "Maiden title in 2008 with last-corner drama in Interlagos" },
      { team: "Mercedes AMG", years: "2013–2024", color: "#00D2BE", highlight: "6 World Titles, breaking all-time win & pole records" },
      { team: "Scuderia Ferrari", years: "2025–", color: "#E10600", highlight: "Blockbuster transfer to the Prancing Horse" },
    ],
    totalChampionships: 7,
    totalWins: 105,
    trivia: "First and only driver to surpass 100 Grand Prix wins and 100 pole positions.",
  },
  {
    id: "alonso-timeline",
    driverId: "alonso",
    driverName: "Fernando Alonso",
    nationality: "Spanish",
    countryCode: "ES",
    stops: [
      { team: "Minardi", years: "2001", color: "#18181B", highlight: "Outperformed the car in his rookie season" },
      { team: "Renault", years: "2003–2006", color: "#F59E0B", highlight: "Back-to-back World Championships (2005, 2006)" },
      { team: "McLaren", years: "2007", color: "#C0C0C0", highlight: "Fierce rookie partnership with Hamilton" },
      { team: "Renault", years: "2008–2009", color: "#F59E0B", highlight: "Two victories in Singapore and Fuji" },
      { team: "Scuderia Ferrari", years: "2010–2014", color: "#E10600", highlight: "Finished runner-up 3 times in title fights" },
      { team: "McLaren", years: "2015–2018", color: "#FF8000", highlight: "Heroic midfield drives during the Honda reunion" },
      { team: "Alpine", years: "2021–2022", color: "#0090FF", highlight: "Podium return in Qatar 2021" },
      { team: "Aston Martin", years: "2023–", color: "#006F62", highlight: "8 podiums in 2023 renaissance" },
    ],
    totalChampionships: 2,
    totalWins: 32,
    trivia: "The most experienced driver in F1 history with over 400 Grand Prix starts.",
  },
  {
    id: "raikkonen-timeline",
    driverId: "raikkonen",
    driverName: "Kimi Räikkönen",
    nationality: "Finnish",
    countryCode: "FI",
    stops: [
      { team: "Sauber", years: "2001", color: "#002F6C", highlight: "Scored points on debut after just 23 car races" },
      { team: "McLaren", years: "2002–2006", color: "#C0C0C0", highlight: "Title contender in 2003 and 2005" },
      { team: "Scuderia Ferrari", years: "2007–2009", color: "#E10600", highlight: "2007 World Drivers' Champion by 1 single point" },
      { team: "Lotus F1", years: "2012–2013", color: "#000000", highlight: "Iconic Abu Dhabi win ('Leave me alone')" },
      { team: "Scuderia Ferrari", years: "2014–2018", color: "#E10600", highlight: "Emotional final win in Austin 2018" },
      { team: "Alfa Romeo", years: "2019–2021", color: "#990000", highlight: "Led the Swiss squad before retiring" },
    ],
    totalChampionships: 1,
    totalWins: 21,
    trivia: "The 'Iceman' remains Ferrari's most recent World Drivers' Champion (2007).",
  },
  {
    id: "verstappen-timeline",
    driverId: "verstappen",
    driverName: "Max Verstappen",
    nationality: "Dutch",
    countryCode: "NL",
    stops: [
      { team: "Toro Rosso", years: "2015–2016", color: "#002F6C", highlight: "Youngest ever F1 starter at 17 years old" },
      { team: "Red Bull Racing", years: "2016–", color: "#1E22AA", highlight: "Won on Red Bull debut in Barcelona at age 18; 4x World Champion" },
    ],
    totalChampionships: 4,
    totalWins: 63,
    trivia: "Holds the record for most wins in a single season (19 in 2023).",
  },
  {
    id: "schumacher-timeline",
    driverId: "schumacher",
    driverName: "Michael Schumacher",
    nationality: "German",
    countryCode: "DE",
    stops: [
      { team: "Jordan", years: "1991", color: "#008080", highlight: "Stunning P7 qualifying at Spa on debut" },
      { team: "Benetton", years: "1991–1995", color: "#00A859", highlight: "Maiden two World Championships in 1994 & 1995" },
      { team: "Scuderia Ferrari", years: "1996–2006", color: "#E10600", highlight: "Golden era: 5 consecutive titles (2000–2004)" },
      { team: "Mercedes GP", years: "2010–2012", color: "#C0C0C0", highlight: "Comeback years, podium in Valencia 2012" },
    ],
    totalChampionships: 7,
    totalWins: 91,
    trivia: "Won 5 consecutive world titles between 2000 and 2004 with Scuderia Ferrari.",
  },
  {
    id: "senna-timeline",
    driverId: "senna",
    driverName: "Ayrton Senna",
    nationality: "Brazilian",
    countryCode: "BR",
    stops: [
      { team: "Toleman", years: "1984", color: "#18181B", highlight: "Heroic wet weather drive in Monaco" },
      { team: "Lotus", years: "1985–1987", color: "#000000", highlight: "Famous black-and-gold John Player Special wins" },
      { team: "McLaren", years: "1988–1993", color: "#FF8000", highlight: "3 World Championships (1988, 1990, 1991) and Prost rivalry" },
      { team: "Williams", years: "1994", color: "#002F6C", highlight: "Pole position in all 3 races contested" },
    ],
    totalChampionships: 3,
    totalWins: 41,
    trivia: "Master of Monaco with an unmatched 6 Grand Prix victories in the principality.",
  },
  {
    id: "leclerc-timeline",
    driverId: "leclerc",
    driverName: "Charles Leclerc",
    nationality: "Monegasque",
    countryCode: "MC",
    stops: [
      { team: "Sauber", years: "2018", color: "#002F6C", highlight: "Standout rookie drives earning immediate Ferrari promotion" },
      { team: "Scuderia Ferrari", years: "2019–", color: "#E10600", highlight: "Maiden wins in Spa and Monza 2019; emotional Monaco 2024 victory" },
    ],
    totalChampionships: 0,
    totalWins: 8,
    trivia: "First Monegasque driver to win the Monaco Grand Prix in 93 years (2024).",
  },
  {
    id: "norris-timeline",
    driverId: "norris",
    driverName: "Lando Norris",
    nationality: "British",
    countryCode: "GB",
    stops: [
      { team: "McLaren", years: "2019–", color: "#FF8000", highlight: "Maiden win in Miami 2024; led McLaren to 2024 Constructors' Title" },
    ],
    totalChampionships: 0,
    totalWins: 4,
    trivia: "Vice World Champion in 2024, winning in Miami, Zandvoort, Singapore, and Abu Dhabi.",
  },
  {
    id: "ricciardo-timeline",
    driverId: "ricciardo",
    driverName: "Daniel Ricciardo",
    nationality: "Australian",
    countryCode: "AU",
    stops: [
      { team: "HRT", years: "2011", color: "#18181B", highlight: "Debut at Silverstone" },
      { team: "Toro Rosso", years: "2012–2013", color: "#002F6C", highlight: "Earned Red Bull promotion alongside Vettel" },
      { team: "Red Bull Racing", years: "2014–2018", color: "#1E22AA", highlight: "7 victories including Monaco 2018 redemption" },
      { team: "Renault", years: "2019–2020", color: "#F59E0B", highlight: "Podiums in Nürburgring and Imola (tattoo bet)" },
      { team: "McLaren", years: "2021–2022", color: "#FF8000", highlight: "Iconic Monza 2021 1-2 victory" },
      { team: "AlphaTauri / RB", years: "2023–2024", color: "#002F6C", highlight: "Mid-season return and fastest lap in Singapore 2024" },
    ],
    totalChampionships: 0,
    totalWins: 8,
    trivia: "Famous for the 'Shoey' podium celebration and late-braking overtakes.",
  },
  {
    id: "button-timeline",
    driverId: "button",
    driverName: "Jenson Button",
    nationality: "British",
    countryCode: "GB",
    stops: [
      { team: "Williams", years: "2000", color: "#002F6C", highlight: "Youngest British point scorer at age 20" },
      { team: "Benetton", years: "2001", color: "#00A859", highlight: "Gained valuable experience" },
      { team: "Renault", years: "2002", color: "#F59E0B", highlight: "Steady point finishes" },
      { team: "BAR", years: "2003–2005", color: "#18181B", highlight: "10 podiums in 2004 runner-up season" },
      { team: "Honda", years: "2006–2008", color: "#FFFFFF", highlight: "Maiden win in wet Hungary 2006 from 14th on the grid" },
      { team: "Brawn GP", years: "2009", color: "#A3E635", highlight: "Fairytale World Championship winning 6 of first 7 races" },
      { team: "McLaren", years: "2010–2017", color: "#C0C0C0", highlight: "Famous Canada 2011 victory from last to first" },
    ],
    totalChampionships: 1,
    totalWins: 15,
    trivia: "Won the 2011 Canadian Grand Prix, the longest race in F1 history (4 hours, 4 minutes).",
  },
  {
    id: "sainz-timeline",
    driverId: "sainz",
    driverName: "Carlos Sainz",
    nationality: "Spanish",
    countryCode: "ES",
    stops: [
      { team: "Toro Rosso", years: "2015–2017", color: "#002F6C", highlight: "Debuted alongside Max Verstappen" },
      { team: "Renault", years: "2017–2018", color: "#F59E0B", highlight: "Key points scorer for the Enstone outfit" },
      { team: "McLaren", years: "2019–2020", color: "#FF8000", highlight: "Maiden podium in Brazil 2019" },
      { team: "Scuderia Ferrari", years: "2021–2024", color: "#E10600", highlight: "4 wins including Singapore 2023 (only non-Red Bull win)" },
      { team: "Williams", years: "2025–", color: "#002F6C", highlight: "New chapter leading Williams Racing" },
    ],
    totalChampionships: 0,
    totalWins: 4,
    trivia: "Nicknamed 'The Smooth Operator' for his cerebral tactical racing.",
  },
];

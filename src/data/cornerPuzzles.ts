export interface CornerPuzzle {
  id: string;
  name: string;
  circuitName: string;
  country: string;
  countryCode: string;
  turnNumber: string;
  speedKmh: number;
  lateralG: number;
  description: string;
  svgPath: string;
  viewBox: string;
  fameFactor: "Legendary" | "Historic" | "Terrifying";
}

export const CORNER_PUZZLES: CornerPuzzle[] = [
  {
    id: "eau-rouge",
    name: "Eau Rouge / Raidillon",
    circuitName: "Circuit de Spa-Francorchamps",
    country: "Belgium",
    countryCode: "BE",
    turnNumber: "Turns 2, 3 & 4",
    speedKmh: 310,
    lateralG: 4.8,
    description: "A breathtaking uphill compression where cars plunge down to the stream and launch blind into the Ardennes sky at over 300 km/h.",
    svgPath: "M 20 140 C 50 140 70 120 85 95 C 100 70 115 50 140 35 C 160 25 180 30 190 40",
    viewBox: "0 0 220 160",
    fameFactor: "Legendary",
  },
  {
    id: "130r",
    name: "130R",
    circuitName: "Suzuka International Racing Course",
    country: "Japan",
    countryCode: "JP",
    turnNumber: "Turn 15",
    speedKmh: 305,
    lateralG: 4.2,
    description: "An ultra-fast, blind left-hand sweep named after its 130-meter radius, taken flat out in 8th gear. Scene of Alonso's famous outside pass on Schumacher in 2005.",
    svgPath: "M 30 40 C 70 40 120 60 150 100 C 175 130 190 145 200 150",
    viewBox: "0 0 220 160",
    fameFactor: "Terrifying",
  },
  {
    id: "parabolica",
    name: "Curva Parabolica (Curva Alboreto)",
    circuitName: "Autodromo Nazionale Monza",
    country: "Italy",
    countryCode: "IT",
    turnNumber: "Turn 11",
    speedKmh: 245,
    lateralG: 3.9,
    description: "The sweeping, tightening final right-hand curve at Monza before the long main straight. Opening the throttle early here dictates maximum top speed.",
    svgPath: "M 30 140 L 90 140 C 140 140 180 110 180 60 C 180 25 145 20 120 20 L 30 20",
    viewBox: "0 0 220 160",
    fameFactor: "Historic",
  },
  {
    id: "swimming-pool",
    name: "Swimming Pool Chicane (Louis Chiron)",
    circuitName: "Circuit de Monaco",
    country: "Monaco",
    countryCode: "MC",
    turnNumber: "Turns 13 & 14",
    speedKmh: 215,
    lateralG: 3.5,
    description: "A blistering left-right flick skirting the Olympic swimming pool with zero margin for error millimeters from the metal Armco barriers.",
    svgPath: "M 20 130 L 70 130 C 85 130 95 110 105 90 C 115 70 125 70 140 70 L 190 70",
    viewBox: "0 0 220 160",
    fameFactor: "Terrifying",
  },
  {
    id: "maggotts-becketts",
    name: "Maggotts, Becketts & Chapel",
    circuitName: "Silverstone Circuit",
    country: "United Kingdom",
    countryCode: "GB",
    turnNumber: "Turns 10, 11, 12, 13 & 14",
    speedKmh: 295,
    lateralG: 5.2,
    description: "The gold standard of high-speed change of direction in modern motorsport, loading tires through 5 continuous lateral Gs onto Hangar Straight.",
    svgPath: "M 20 40 C 50 40 70 70 90 70 C 110 70 125 45 145 45 C 165 45 180 80 200 110",
    viewBox: "0 0 220 160",
    fameFactor: "Legendary",
  },
  {
    id: "wall-of-champions",
    name: "Wall of Champions",
    circuitName: "Circuit Gilles Villeneuve",
    country: "Canada",
    countryCode: "CA",
    turnNumber: "Turns 13 & 14",
    speedKmh: 220,
    lateralG: 3.2,
    description: "The exit curb of the final chicane where Damon Hill, Michael Schumacher, and Jacques Villeneuve all crashed into the concrete wall in 1999.",
    svgPath: "M 30 140 L 80 140 L 95 80 L 135 80 L 150 20 L 190 20",
    viewBox: "0 0 220 160",
    fameFactor: "Historic",
  },
];

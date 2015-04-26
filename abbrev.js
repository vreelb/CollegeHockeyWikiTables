var StateAbbreviations =
{
	"alabama": "AL",
	"alaska": "AK",
	"arizona": "AZ",
	"arkansas": "AR",
	"california": "CA",
	"colorado": "CO",
	"connecticut": "CT",
	"delaware": "DE",
	"district of columbia": "DC",
	"florida": "FL",
	"georgia": "GA",
	"hawaii": "HI",
	"idaho": "ID",
	"illinois": "IL",
	"indiana": "IN",
	"iowa": "IA",
	"kansas": "KS",
	"kentucky": "KY",
	"louisiana": "LA",
	"maine": "ME",
	"maryland": "MD",
	"massachusetts": "MA",
	"michigan": "MI",
	"minnesota": "MN",
	"mississippi": "MS",
	"missouri": "MO",
	"montana": "MT",
	"nebraska": "NE",
	"nevada": "NV",
	"new hampshire": "NH",
	"new jersey": "NJ",
	"new mexico": "NM",
	"new york": "NY",
	"north carolina": "NC",
	"north dakota": "ND",
	"ohio": "OH",
	"oklahoma": "OK",
	"oregon": "OR",
	"pennsylvania": "PA",
	"rhode island": "RI",
	"south carolina": "SC",
	"south dakota": "SD",
	"tennessee": "TN",
	"texas": "TX",
	"utah": "UT",
	"vermont": "VT",
	"virginia": "VA",
	"washington": "WA",
	"west virginia": "WV",
	"wisconsin": "WI",
	"wyoming": "WY",

	"american samoa": "AS",
	"guam": "GU",
	"northern mariana islands": "MP",
	"puerto rico": "PR",
	"virgin islands": "VI",
	"us minor outlying islands": "UM",

	"alberta": "AB",
	"british columbia": "BC",
	"manitoba": "MB",
	"new brunswick": "NB",
	"newfoundland and labrador": "NL",
	"nova scotia": "NS",
	"northwest territories": "NT",
	"nunavut": "NU",
	"ontario": "ON",
	"prince edward island": "PE",
	"quebec": "QC",
	"saskatchewan": "SK",
	"yukon": "YT",

	"québec": "QC",
	"newfoundland": "NL",
	"labrador": "NL",
	"newfoundland & labrador": "NL",

	"fla": "FL",
	"tenn": "TN",
	"miss": "MS",
	"ala": "AL",
	"ill": "IL",
	"wis": "WI",
	"calif": "CA",
	"ark": "AR",
	"conn": "CT",
	"mass": "MA",
	"minn": "MN",
	"ind": "IN",
	"mich": "MI",
	"colo": "CO",
	"penn": "PA",
	"ariz": "AZ",
	"cali": "CA",
	"tex": "TX",
	"wash": "WA",
	"nev": "NV",

};

var NHLAbbreviations = 
{
// Offical abbreviations per NHL Rulebook 2014-2015
	"ANA": "Anaheim",				// Anaheim Ducks
	"ARI": "Arizona",				// Arizona Coyotes
	"BOS": "Boston",				// Boston Bruins
	"BUF": "Buffalo",				// Buffalo Sabres
	"CGY": "Calgary",				// Calgary Flames
	"CAR": "Carolina",				// Carolina Hurricanes
	"CHI": "Chicago",				// Chicago Blackhawks
	"COL": "Colorado",				// Colorado Avalanche
	"CBJ": "Columbus",				// Columbus Blue Jackets
	"DAL": "Dallas",				// Dallas Stars
	"DET": "Detroit",				// Detroit Red Wings
	"EDM": "Edmonton",				// Edmonton Oilers
	"FLA": "Florida",				// Florida Panthers
	"LAK": "Los Angeles",			// Los Angeles Kings
	"MIN": "Minnesota",				// Minnesota Wild
	"MTL": "Montreal",				// Montreal Canadiens
	"NSH": "Nashville",				// Nashville Predators
	"NJD": "New Jersey",			// New Jersey Devils
	"NYI": "New York Islanders",	// New York Islanders
	"NYR": "New York Rangers",		// New York Rangers
	"PHI": "Philadelphia",			// Philadelphia Flyers
	"ARI": "Phoenix",				// Phoenix Coyotes
	"PIT": "Pittsburgh",			// Pittsburgh Penguins
	"OTT": "Ottawa",				// Ottawa Senators
	"STL": "St. Louis",				// St. Louis Blues
	"SJS": "San Jose",				// San Jose Sharks
	"TBL": "Tampa Bay",				// Tampa Bay Lightning
	"TOR": "Toronto",				// Toronto Maple Leafs
	"VAN": "Vancouver",				// Vancouver Canucks
	"WSH": "Washington",			// Washington Capitals
	"WPG": "Winnipeg",				// Winnipeg Jets
// Alternate abbreviations
	"ARZ": "Arizona",
	"LOS": "Los Angeles",
	"MON": "Montreal",
	"PHL": "Philadelphia",
	"PHO": "Phoenix",
	"PHX": "Phoenix",
	"TAM": "Tampa Bay",
	"WAS": "Washington",
	"WIN": "Winnipeg",
// Old Team abbreviations
	// "": "Atlanta",					// Atlanta Thrashers|ATL
	// "": "Atlanta Flames",			// Atlanta Flames|ATL
	// "": "California",				// California Golden Seals|CLF
	// "": "Cleveland",					// Cleveland Barons|CLE
	// "": "Colorado Rockies",			// Colorado Rockies (NHL)|COR
	// "": "Hartford",					// Hartford Whalers|HTF
	// "": "Kansas City",				// Kansas City Scouts|KCS
	// "": "Minnesota North Stars",		// Minnesota North Stars|MNS
	// "": "Oakland",					// Oakland Seals|OAK
	// "": "Quebec",					// Quebec Nordiques|QUE
	// "": "Winnipeg Jets",				// Winnipeg Jets (1972–96)|WIN
};

function getStateAbbr(full_name) {
	return StateAbbreviations[full_name.toLowerCase()] || full_name;
}
function getNHLName(nhl_abbr) {
	return NHLAbbreviations[nhl_abbr.toUpperCase()] || nhl_abbr;
}

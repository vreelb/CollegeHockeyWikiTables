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
// Common Mappings
	"ANA": "Anaheim",				// Anaheim		Anaheim Ducks|ANA
	"ARZ": "Arizona",				// Arizona		Arizona Coyotes|ARZ
	"BOS": "Boston",				// Boston		Boston Bruins|BOS
	"BUF": "Buffalo",				// Buffalo		Buffalo Sabres|BUF
	"CGY": "Calgary",				// Calgary		Calgary Flames|CGY
	"CAR": "Carolina",				// Carolina		Carolina Hurricanes|CAR
	"CHI": "Chicago",				// Chicago		Chicago Blackhawks|CHI
	"COL": "Colorado",				// Colorado		Colorado Avalanche|COL
	"CBJ": "Columbus",				// Columbus		Columbus Blue Jackets|CBJ
	"DAL": "Dallas",				// Dallas		Dallas Stars|DAL
	"DET": "Detroit",				// Detroit		Detroit Red Wings|DET
	"EDM": "Edmonton",				// Edmonton		Edmonton Oilers|EDM
	"FLA": "Florida",				// Florida		Florida Panthers|FLA
	"LAK": "Los Angeles",			// Los Angeles		Los Angeles Kings|LOS
	"MIN": "Minnesota",				// Minnesota		Minnesota Wild|MIN
	"MON": "Montreal",				// Montreal		Montreal Canadiens|MON
	"NSH": "Nashville",				// Nashville		Nashville Predators|NSH
	"NJD": "New Jersey",			// New Jersey		New Jersey Devils|NJD
	"NYI": "New York Islanders",	// New York Islanders		New York Islanders|NYI
	"NYR": "New York Rangers",		// New York Rangers		New York Rangers|NYR
	"PHI": "Philadelphia",			// Philadelphia		Philadelphia Flyers|PHI
	"PHO": "Phoenix",				// Phoenix		Phoenix Coyotes|PHO
	"PIT": "Pittsburgh",			// Pittsburgh		Pittsburgh Penguins|PIT
	"OTT": "Ottawa",				// Ottawa		Ottawa Senators|OTT
	"STL": "St. Louis",				// St. Louis		St. Louis Blues|STL
	"SJS": "San Jose",				// San Jose		San Jose Sharks|SJS
	"TAM": "Tampa Bay",				// Tampa Bay		Tampa Bay Lightning|TAM
	"TOR": "Toronto",				// Toronto		Toronto Maple Leafs|TOR
	"VAN": "Vancouver",				// Vancouver		Vancouver Canucks|VAN
	"WSH": "Washington",			// Washington		Washington Capitals|WAS
	"WPG": "Winnipeg",				// Winnipeg		Winnipeg Jets|WPG
// Inconsistant Mappings
	"LOS": "Los Angeles",
	"MTL": "Montreal",
	"PHL": "Philadelphia",
	"PHX": "Phoenix",
	"TBL": "Tampa Bay",
	"WAS": "Washington",
	"WIN": "Winnipeg",
// Old Mappings
	// "": "Atlanta",					// Atlanta Thrashers		Atlanta Thrashers|ATL
	// "": "Atlanta Flames",			// Atlanta Flames		Atlanta Flames|ATL
	// "": "California",				// California		California Golden Seals|CLF
	// "": "Cleveland",				// Cleveland		Cleveland Barons|CLE
	// "": "Colorado Rockies",		// Colorado Rockies		Colorado Rockies (NHL)|COR
	// "": "Hartford",				// Hartford		Hartford Whalers|HTF
	// "": "Kansas City",				// Kansas City		Kansas City Scouts|KCS
	// "": "Minnesota North Stars",	// Minnesota North Stars		Minnesota North Stars|MNS
	// "": "Oakland",					// Oakland		Oakland Seals|OAK
	// "": "Quebec",					// Quebec		Quebec Nordiques|QUE
	// "": "Winnipeg Jets",			// Winnipeg		Winnipeg Jets (1972–96)|WIN
};

function getStateAbbr(full_name) {
	return StateAbbreviations[full_name.toLowerCase()] || full_name;
}
function getNHLName(nhl_abbr) {
	return NHLAbbreviations[nhl_abbr.toUpperCase()] || nhl_abbr;
}

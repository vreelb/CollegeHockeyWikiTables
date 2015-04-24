// Pass in CHS Stat Table and player object
function parse_CHS_for_player(stats, p) {  
	// skaters
	var i = 4;
	for (i; i<stats.length; i++) {
		// find the current player (hacky)
		if (parseInt(stats[i][0]+stats[i][1]) == p.number) {

			if (!p.stype) { p.stype = 'ho'; } else { continue; }

			var pstats = stats[i].split(" | ")[1];
			pstats = pstats.replace(/  +/g, ' ').split(' ');

			p.s1 = pstats[0];
			p.s2 = pstats[1];
			p.s3 = pstats[2];
			p.s4 = pstats[3];
			if (pstats.length == 10) { // penalty minutes
				p.s5 = pstats[5];
			} else {
				p.s5 = 0;
			}
			p.s6 = '';

			break;
		}
		if (stats[i][0]=="-") { break; }
	}

	if (p.stype == 'ho') { return; }

	// goalies
	var j = i + 5;
	for (j;j<i+11;j++) {
		if (!$.isNumeric((stats[j][0])+stats[j][1])){ break; }

		if (parseInt(stats[j][0]+stats[j][1]) == p.number) {
			var pstats = stats[j].split(" | ")[1];
			pstats = pstats.trim().replace(/  +/g, ' ').split(' ');

			p.s1 = pstats[0];

			// record
			var record = pstats[7]+pstats[8]+pstats[9];
			if (record.length > 8) {
				record = record.slice(0,record.indexOf(pstats[pstats.length-4][0]));
			}
			record = record.split('-');
			p.s2 = record[0];
			p.s3 = record[1];
			p.s4 = record[2];

			p.s5 = pstats[5];
			p.s6 = pstats[6];
		}
	}
}

// Pass in the table HTML, and the number of initial rows not containing data
function parse_table_HTML(table_HTML, stats, rowsToSkip) {
	if (rowsToSkip === undefined) {
		rowsToSkip = 1; // assume 1 header row
	}

	// Sanitize nbsp weirdness - or NOT because it is useful for names
	table_HTML = table_HTML.replace(/\&nbsp\;/g, '|' );

	$('#rosterTable').html(table_HTML);
	$('#rosterTable table').css('font-size', '8pt');
	$('#tableEntry').hide();
	$('#showTableEntry').show();

	var num_players = 0;
	var num_rows = $('#rosterTable tr').slice(rowsToSkip).first().find('td').length;
	
	var submission_string = '{{College ice hockey team roster';
	if (num_rows === 8) {
		submission_string += ' |women=yes}}\n';
	} else {
		submission_string += '}}';
	}
	
	var temp1 = '';
	var temp2 = '';

	$('#rosterTable tr').slice(rowsToSkip).each(function() {
		var player = new Object();
		num_players++;

		$(this).find('td').each(function(index) {
			switch (index) {
				case 0: // parse number
					player.number = $(this).text().trim().replace(/\#/g, '');
					break;
				case 1: // parse FIRST and LAST name and DRAFT
					temp1 = $(this).text().trim().replace("\'", "\\\'");

					temp2 = temp1.split('|');
					player.first_name = temp2.shift();  // get FIRST name(s)

					if (temp2[temp2.length-1].indexOf('(') >= 0) {  // get (DRAFT) out
						temp1 = temp2.pop();
						player.draft_pick = temp1.substr(1,3);
					}
					
					player.last_name = temp2.join(" ").trim();
					break;
				case 2: // parse year
					switch ($(this).text()) {
						case "FR|": player.year = "freshman";	break;
						case "SO|": player.year = "sophomore";	break;
						case "JR|": player.year = "junior";		break;
						case "SR|": player.year = "senior";		break;
					}
					break;
				case 3: // parse position
					player.position = $(this).text().trim();
					if (player.position == "G") { player.stype = "hg"; }
					break;
				case 4: // parse height
					player.height = $(this).text().trim().split('-');
					break;
				case 5: // parse weight (M)
					if (num_rows == 9) {
						player.weight = $(this).text().trim();
					} else { //handedness (W)
						//player.hand = $(this).text().trim();
					}
					break;
				case 6: // parse handedness (M), age (W)

					break;
				case 7: // parse age (M), hometown + etc. (W)
					if (num_rows == 8) {
						temp1 = $(this).text().trim().split(' / ');
						player.hometown = sanitizeHometown(temp1[0]);
						player.prevteam = temp1[1].trim();
					}
					break;
				case 8: // parse hometown and prev team (M)
					temp1 = $(this).text().trim().split(' / ');
					player.hometown = sanitizeHometown(temp1[0]);
					player.prevteam = temp1[1].split(' (');
					player.prevteam[1] = player.prevteam[1].slice(0,-1);
					break;
			}
		});
		if (player.prevteam[1] === "USHS") { // clarify USHS by state
			player.prevteam[1] += "-" + getAbbr(player.hometown[1]);
		}
		//parse_CHS_for_player(stats, player);

		submission_string += buildSubmissionLine(player);
		if (num_rows === 8) {
			submission_string += ' |women=yes }}\n';
		} else {
			submission_string += '}}';
		}
	});

	submission_string += '{{end}}';
	$('#csv_textarea').val(submission_string.trim());
}

function buildSubmissionLine(player) {
	// {{CIHplayer |num= |first= |last= |link= |class= |rs= |pos= |ft= |in= |wt= |birthyear= |birthmonth= |birthday= |state= |hometown= |prevteam= |prevleague= |NHLteam= |NHLpick= |NHLyear= |inj= |cap=}}
	
	var str = '{{CIHplayer';

	if (player.number) { str += ' |num='+player.number; } else { str += ' |num= '; }
	str += ' |first=' + player.first_name + ' |last=' + player.last_name;
	str += ' |link= ';	// can be filled in manually if they have a wikipedia page
	if (player.year) { str += ' |class=' + player.year; } else { str += ' |class= '; }
	str += ' |rs= ';	// can be filled in manually if are redshirted
	if (player.position) { str += ' |pos=' + player.position; } else { str += ' |pos= '; }
	if (player.height) { str += ' |ft=' + player.height[0] + ' |in=' + player.height[1]; } else { str += ' |ft=  |in= '; }
	if (player.weight) { str += ' |wt=' + player.weight; } else { str += ' |wt= '; }
	
	str += ' |birthyear=  |birthmonth=  |birthday= '; // deal with this later
	
	if (player.hometown) { str += ' |state=' + player.hometown[1] + ' |hometown=[[' + player.hometown[0] + ', ' + player.hometown[1] + ']]'; } else { str += ' |state=  |hometown= '; }
	
	// These (prevteam, prevleague) might be tricky:
	// player's previous team, compactly wikilinked (if page exists) without nickname or full school name
	// (e.g. "[[Brainerd High School (Minnesota)|Brainerd]]", "[[Nanaimo Clippers|Nanaimo]]",
	// "[[Northern Michigan Wildcats men's ice hockey|Northern Michigan]]", "Linköpings J-20")
	
	// league (acronym) of player's previous team, not wikilinked (e.g. "USHL", "BCHL", "CCHA", "J20 SuperElit").
	// Note that "AtlJHL" must be used for the Atlantic Junior Hockey League.
	// For US high schools, use e.g. "USHS-MN". For minor teams, use e.g. "Midget AAA".
	if (player.prevteam) { str += ' |prevteam=' + player.prevteam[0] + ' |prevleague=' + player.prevteam[1]; } else { str += ' |prevteam=  |prevleague= '; }

	str += ' |NHLteam=  |NHLpick=  |NHLyear=  |inj=  |cap= '; // deal with this later
	
	//if (player.draft_pick) { str += player.draft_pick; }
	
	// look into adding '| women =' for women's teams

	return str + '\n';
}

function sanitizeHometown(place) {
	place = place.replace("\'", "\\\'");

	if (place.indexOf(",")<0) { return place; }

	var temp = place.split(",");
	var state = temp.pop().trim();
	var city = temp.join().trim();

	return [city, state];
}

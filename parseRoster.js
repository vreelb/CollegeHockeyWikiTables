// Pass in CHN Stat Table and players object
function parse_CHN(stats, players) {
	$('#other_other_page .stats-row0, #other_other_page .stats-row1').each(function() {
		var player_num = $(this).children('td').first().text();
		if (players[player_num]) {
			
			if ($(this).children('td:nth-child(2)').text().indexOf('(') >= 0) {
				players[player_num].cap = $(this).children('td:nth-child(2)').text().split('(')[1][0];
			}
			
			if ($(this).children('td:nth-child(6)').text() != '') {
				players[player_num].birthday = $(this).children('td:nth-child(6)').text().split('/');
				if (players[player_num].birthday[2] > 50) {
					players[player_num].birthday[2] = '19' + players[player_num].birthday[2];
				} else {
					players[player_num].birthday[2] = '20' + players[player_num].birthday[2];
				}
			}
			
			if ($(this).children('td:nth-child(9)').text() != '') {
				players[player_num].draft = $(this).children('td:nth-child(9)').text().split('-');
				if (players[player_num].draft[2] === '1') {
					players[player_num].draft[2] += 'st';
				} else if (players[player_num].draft[2] === '2') {
					players[player_num].draft[2] += 'nd';
				} else if (players[player_num].draft[2] === '3') {
					players[player_num].draft[2] += 'rd';
				} else {
					players[player_num].draft[2] += 'th';
				}
				players[player_num].draft[1] = getNHLName(players[player_num].draft[1]);
			}
			
		} else {
			console.log("Player "+ player_num +" not found, probably a mismatch between CHS and CHN numbers.");
		}
	});
}

// Pass in the table HTML, and the number of initial rows not containing data
function parse_table_HTML(table_HTML, chn_data, chs_url, chn_url, rowsToSkip) {
	if (rowsToSkip === undefined) {
		rowsToSkip = 1; // assume 1 header row
	}

	// Sanitize nbsp weirdness - or NOT because it is useful for names
	table_HTML = table_HTML.replace(/\&nbsp\;/g, '|' );

	$('#rosterTable').html(table_HTML);
	$('#rosterTable table').css('font-size', '8pt');

	var players = [];
	var num_players = 0;
	var num_rows = $('#rosterTable tr').slice(rowsToSkip).first().find('td').length;
	
	var d = new Date();
	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var submission_string = '\nAs of '+ monthNames[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear() + '.<ref>' + chs_url + '</ref>';
	if (chn_url) {
		submission_string += '<ref>' + chn_url + '</ref>';
	}
	submission_string += '\n\n{{College ice hockey team roster';
	if (num_rows === 8) {
		submission_string += ' |women=yes}}\n';
	} else {
		submission_string += '}}\n';
	}
	
	var temp1 = '';
	var temp2 = '';

	$('#rosterTable tr').slice(rowsToSkip).each(function() {
		var player = {};
		num_players++;
		
		if (num_rows === 8) {
			player.female = true;
		}

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
					}
					
					player.last_name = temp2.join(" ").trim();
					break;
				case 2: // parse year
					player.year = $(this).text().slice(0, 2).toLowerCase();
					break;
				case 3: // parse position
					player.position = $(this).text().trim();
					break;
				case 4: // parse height
					if ($(this).text().trim()) {
						player.height = $(this).text().trim().split('-');
					}
					break;
				case 5: // parse weight (M)
					if (!player.female) {
						player.weight = $(this).text().trim();
					} else { //handedness (W)
						//player.hand = $(this).text().trim();
					}
					break;
				case 6: // parse handedness (M), age (W)
					break;
				case 7: // parse age (M), hometown + etc. (W)
					if (player.female) {
						temp1 = $(this).text().trim().split(' / ');
						player.hometown = sanitizeHometown(temp1[0]);
						player.prevteam = [];
						player.prevteam[0] = temp1[1].split('|')[0].trim();
						player.prevteam[1] = ' ';
					}
					break;
				case 8: // parse hometown and prev team (M)
					temp1 = $(this).text().trim().split(' / ');
					player.hometown = sanitizeHometown(temp1[0]);
					player.prevteam = temp1[1].split(' (');
					if (player.prevteam[1]) {
						player.prevteam[1] = player.prevteam[1].split(')')[0];
					} else {
						player.prevteam[1] = ' ';
					}
					if (player.prevteam[0].indexOf("N/A") >= 0) {
						player.prevteam[0] = ' ';
						player.prevteam[1] = ' ';
					}
					break;
			}
		});
		if (player.prevteam[1] === "USHS") { // clarify USHS by state
			player.prevteam[1] += "-" + getStateAbbr(player.hometown[1]);
		}
		
		players[player.number] = player;
	});
	
	if (num_rows != 8) {
		parse_CHN(chn_data, players);
	}
	
	players.forEach( function (p) {
		submission_string += buildSubmissionLine(p).replace(/\\/g, '');
	});
	
	submission_string += '{{end}}';
	$('#csv_textarea').val(submission_string.trim());
}

function buildSubmissionLine(player) {
	// {{CIHplayer |num= |first= |last= |link= |class= |rs= |pos= |ft= |in= |wt= |birthyear= |birthmonth= |birthday= |state= |hometown= |prevteam= |prevleague= |NHLteam= |NHLround= |NHLpick= |NHLyear= |inj= |cap= |women=}}
	
	var str = '{{CIHplayer';

	if (player.number) { str += ' |num=' + player.number; } else { str += ' |num= '; }
	str += ' |first=' + player.first_name + ' |last=' + player.last_name;
	str += ' |link= ';	// can be filled in manually if they have a wikipedia page
	if (player.year) { str += ' |class=' + player.year; } else { str += ' |class= '; }
	str += ' |rs= ';	// can be filled in manually if redshirted
	if (player.position) { str += ' |pos=' + player.position; } else { str += ' |pos= '; }
	if (player.height) { str += ' |ft=' + player.height[0] + ' |in=' + player.height[1]; } else { str += ' |ft=  |in= '; }
	if (player.weight) { str += ' |wt=' + player.weight; } else { str += ' |wt= '; }
	
	if (player.birthday) { str += ' |birthyear=' + player.birthday[2] + ' |birthmonth=' + player.birthday[0] + ' |birthday=' + player.birthday[1]; } else { str += ' |birthyear=  |birthmonth=  |birthday= '; }
	
	if (player.hometown) { str += ' |state=' + player.hometown[1] + ' |hometown=[[' + player.hometown[0] + ', ' + player.hometown[1] + ']]'; } else { str += ' |state=  |hometown= '; }
	
	// These might be tricky:
	// player's previous team, compactly wikilinked (if page exists) without nickname or full school name
	// (e.g. "[[Brainerd High School (Minnesota)|Brainerd]]", "[[Nanaimo Clippers|Nanaimo]]",
	// "[[Northern Michigan Wildcats men's ice hockey|Northern Michigan]]", "Linköpings J-20")
	
	if (player.prevteam) { str += ' |prevteam=' + player.prevteam[0] + ' |prevleague=' + player.prevteam[1]; } else { str += ' |prevteam=  |prevleague= '; }
	
	if (player.draft) { str += ' |NHLteam=' + player.draft[1] + ' |NHLround=' + player.draft[2] + ' |NHLpick=  |NHLyear=' + player.draft[0]; } else { str += ' |NHLteam=  |NHLround=  |NHLpick=  |NHLyear= '; }
	
	str += ' |inj= ';	// can be filled in manually if injured
	
	if (player.cap) { str += ' |cap=' + player.cap; } else { str += ' |cap= '; }
	if (player.female) { str += ' |women=yes }}\n'; } else { str += '}}\n'; }

	return str;
}

function sanitizeHometown(place) {
	place = place.replace("\'", "\\\'");

	if (place.indexOf(",")<0) { return place; }

	var temp = place.split(",");
	var state = temp.pop().trim();
	var city = temp.join().trim();

	return [city, state];
}

<?php
header('Content-Type: text/html; charset=utf-8');
?>
<title>College Hockey Roster Wiki Table Maker</title>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="./parseRoster.js"></script>
<script src="./state_province.js"></script>

<h1>Add Team Roster</h1>

<?php
ini_set("auto_detect_line_endings", true);
$chs_prefix = @$_GET["pull_url"];

//////////////////// CHS Pulling
if (@$_GET['pull_url']) {
	if (date('n')>8) {
		$season = date('y') . (date('y')+1);
	} else {
		$season = (date('y')-1) . date('y');
	}

	$chs = fopen("http://www.collegehockeystats.net/". $season ."/rosters/" . $chs_prefix, "r");
	$contents = stream_get_contents($chs);
	$contents = mb_convert_encoding($contents, 'UTF-8', 'ASCII');
	$contents = str_replace("\xc2\x9a", "\xc5\xa1" , $contents); // replace incorrect "Single Character Introducer" with "Small Latin S with Caron"
	$contents = addslashes($contents);
	$contents = str_replace(chr(10), '', $contents);  // fix newline issues
	$contents = str_replace(chr(13), '', $contents);
	$contents = stristr($contents, "<TABLE"); // get only table data from page
	$contents = substr($contents, 0, (strrpos($contents, "</TABLE>")+8));

	$chs_stats = fopen("http://www.collegehockeystats.net/". $season ."/textstats/" . $chs_prefix, "r");
	$contents_stats = stream_get_contents($chs_stats);
	//$contents_stats = mb_convert_encoding($contents_stats, 'UTF-8', 'ASCII'); // not currently needed for textstats
	$contents_stats = addslashes($contents_stats);
	$contents_stats = str_replace(chr(10), '~', $contents_stats);  // fix newline issues, delimit with '~'
	$contents_stats = str_replace(chr(13), '', $contents_stats);
	$contents_stats = stristr($contents_stats, '<PRE CLASS=\"tiny\">'); // get only stats data from page
	$contents_stats = substr(trim($contents_stats), 20, (strrpos($contents_stats, "</PRE>")-21));
	$contents_stats = explode('~', $contents_stats);

?> 

	<div id="other_page" style="display:none;"></div>

	<script>
	$(document).ready( function() {
		var content_stat = <?php echo(json_encode($contents_stats)); ?>;

		var content_html = "<?= $contents ?>";
		$("#other_page").html(content_html);
		$("#other_page").html("<table>"+$("#other_page .rostable").first().html()+"</table>");
		$("#parseTableHTML").hide()  // hide unneeded things
		parse_table_HTML($('#other_page').html(), content_stat);
	});
	</script>

<?php
}
?>

<form id="CHSabbr" action="index.php">
	<label>Enter CollegeHockeyStats abbreviation: 
		<input type="text" name="pull_url" size="10" maxlength="4" />
		<input type="submit" name="pull" onclick=""></button>
	</label>
</form>
<!--<button id="CHSbutton" onclick="parse_table_HTML($('#other_page').html());">Parse CHS</button>-->

<div id="rosterTable" style="visibility: auto;"></div>

<br/>
<form>
	<!--<label>Team Name: <input id="team_box" type="text" name="team_sel" size="10" /></label>-->
	<textarea id="csv_textarea" name="csv" rows="30" cols="100"></textarea>
</form>


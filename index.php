<?php
header('Content-Type: text/html; charset=utf-8');
include('abbrev.php');
?>
<title>College Hockey Roster Wiki Table Maker</title>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="./parseRoster.js"></script>
<script src="./abbrev.js"></script>

<h1>College Hockey Roster Wiki Table Maker</h1>

<?php
ini_set("auto_detect_line_endings", true);
$chs_prefix = @$team_chs[$_GET["team"]] ?: '';
$chn_prefix = @$chs_chn[$chs_prefix] ?: '';

//////////////////// CHS Pulling
if (@$_GET['team']) {
	if (date('n')>8) {	// guess which season based on current month
		$season = date('y') . (date('y')+1);
	} else {
		$season = (date('y')-1) . date('y');
	}

	$chs_url = "http://www.collegehockeystats.net/". $season ."/rosters/" . $chs_prefix;
	$chs = fopen($chs_url, "r");
	$contents = stream_get_contents($chs);
	$contents = mb_convert_encoding($contents, 'UTF-8', 'ASCII');
	$contents = str_replace("\xc2\x9a", "\xc5\xa1" , $contents); // replace incorrect "Single Character Introducer" with "Small Latin S with Caron"
	$contents = addslashes($contents);
	$contents = str_replace(chr(10), '', $contents); // fix newline issues
	$contents = str_replace(chr(13), '', $contents);
	$contents = stristr($contents, "<TABLE"); // get only table data from page
	$contents = substr($contents, 0, (strrpos($contents, "</TABLE>")+8));

	if (@$chn_prefix) {
		$chn_url = "https://www.collegehockeynews.com/reports/roster/xxxx/". $chn_prefix;
		$chn_stats =  fopen($chn_url, "r");
		$contents_chn = stream_get_contents($chn_stats);
		$contents_chn = addslashes($contents_chn);
		$contents_chn = str_replace(chr(10), '', $contents_chn); // fix newline issues, delimit with '~'
		$contents_chn = str_replace(chr(13), '', $contents_chn);
		$contents_chn = stristr($contents_chn, '<table'); // get only stats data from page
		$contents_chn = substr($contents_chn, 6);
		$contents_chn = stristr($contents_chn, '<table');
		$contents_chn = str_replace("&nbsp;", "", $contents_chn);

		$contents_chn = substr(trim($contents_chn), 0, (strrpos($contents_chn, '<h3 style=\"margin-bottom: 2px\">Recruits')));
	}
?>

	<div id="other_page" style="display:none;"></div>
	<div id="other_other_page" style="display:none;"></div>

	<script>
	$(document).ready( function() {
		var content_html = "<?= $contents ?>";
		$("#other_page").html(content_html);
		$("#other_page").html("<table>"+$("#other_page .rostable").first().html()+"</table>");

<?php
		if (@$chn_prefix) {
?>
			var content_chn = "<?= $contents_chn ?>";
			$("#other_other_page").html(content_chn);
			$("#other_other_page").html("<table>"+$("#other_other_page table").first().html()+"</table>");
<?php
		}
?>
		parse_table_HTML($('#other_page').html(), $('#other_other_page').html(), "<?= $chs_url ?>", "<?= @$chn_url ?>");

	});
	</script>
<?php
}
?>
<form id="CHSabbr" action="index.php">
	<label>Select team to make table:
<?php
	echo '<select name="team">';
	echo '<option value="">Team</option>';
	foreach($team_chs as $team_name => $team_id) {
		echo '<option value="' . $team_name . '">' . $team_name . '</option>';
	}
	echo'</select>';
?>
		<input type="submit" name="pull" onclick=""></button>
	</label>
</form>

<?php
if (@$_GET['team']) {
?>
<h2 id="team">Roster table generated for: <?= @$_GET['team'] ?></h2>
<?php
}
?>
<div id="rosterTable" style="visibility: auto;"></div>

<br/>
<form>
	<button type="button" onclick="removeEmpty();">Remove Empty Parameters</button>
	<button type="button" onclick="$('#csv_textarea').select().focus();">Select All Text</button>
	<br>
	<textarea id="csv_textarea" name="csv" rows="30" cols="100"></textarea>
</form>


<?php
header('Content-Type: text/html; charset=utf-8');
include('abbrev.php');
?>
<title>College Hockey Roster Wiki Table Maker</title>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="./parseRoster.js"></script>
<script src="./abbrev.js"></script>

<h1>Add Team Roster</h1>

<?php
ini_set("auto_detect_line_endings", true);
$chs_prefix = @$_GET["pull_url"] ?: '';
$chn_prefix = @$_GET["chn_no"] ?: '';

//////////////////// CHS Pulling
if (@$_GET['pull_url']) {
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
	$contents = str_replace(chr(10), '', $contents);  // fix newline issues
	$contents = str_replace(chr(13), '', $contents);
	$contents = stristr($contents, "<TABLE"); // get only table data from page
	$contents = substr($contents, 0, (strrpos($contents, "</TABLE>")+8));

	
	
	if (@$chs_chn[$chs_prefix]) {
		$chn_url = "http://www.collegehockeynews.com/reports/roster/xxxx/". $chs_chn[$chs_prefix];
		$chn_stats =  fopen($chn_url, "r");
		$contents_chn = stream_get_contents($chn_stats);
		$contents_chn = addslashes($contents_chn);
		$contents_chn = str_replace(chr(10), '', $contents_chn);  // fix newline issues, delimit with '~'
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
		if (@$chs_chn[$chs_prefix]) {
?>
			var content_chn = "<?= $contents_chn ?>";
			$("#other_other_page").html(content_chn);
			$("#other_other_page").html("<table>"+$("#other_other_page table").first().html()+"</table>");
<?php
		}
?>
		$("#parseTableHTML").hide();  // hide unneeded things
		parse_table_HTML($('#other_page').html(), $('#other_other_page').html(), "<?= $chs_url ?>", "<?= @$chn_url ?>");
		
	});
	</script>
<?php
}
?>
<form id="CHSabbr" action="index.php">
	<label>Select team to make table: 
<?php
	echo '<select name="pull_url">';
	echo '<option value="">Team</option>';
	foreach($team_chs as $team_name => $team_id) {
		echo '<option value="' . $team_id . '">' . $team_name . '</option>';
	}
	echo'</select>';
?>
		<!--<input type="text" name="pull_url" size="10" maxlength="4" value="<?= $chs_prefix ?>"/>-->
		<input type="submit" name="pull" onclick=""></button>
	</label>
</form>

<div id="rosterTable" style="visibility: auto;"></div>

<br/>
<form>
	<textarea id="csv_textarea" name="csv" rows="30" cols="100"></textarea>
</form>


<?

if(!empty($_POST['html']))
	$_POST['code'] = "echo '".$_POST['html']."'";	

if(empty($_POST['code'])){

	echo json_encode(
		["error" =>  true]
	);
	die();
}
require_once __DIR__ . '/vendor/autoload.php';

use Meebio\PhpEvalConsole\Console;

$console = new Console();
$console->boot();

?>	
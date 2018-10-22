<?php
$resave = $_POST['resave'];
$name = $_POST['name'];
$countN = $_POST['countN'];
$countS = $_POST['countS'];
$json = $_POST['json'];

if(trim($resave))
{
    $fp = fopen($name.".net", "w");
    fwrite($fp, $countN."\n");
    fwrite($fp, $countS."\n");
    fclose($fp);
}
else
{
    $fp = fopen($name.".net", "a");
    fwrite($fp, $json."\n");
    fclose($fp);
}
?>

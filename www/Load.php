<?php
$array = file($_POST['name'].".net");

$countN = trim($array[0]); //1-я строчка
$countS = trim($array[1]); //2-я строчка

$jsonN = "_jsonN = []; \n";
for($i = 0; $i < $countN; $i++)
{
    $jsonN = $jsonN."_jsonN[".($i)."] = ";
    $jsonN = $jsonN."JSON.parse('".trim($array[$i + 2])."'); \n"; //чтение строчки
}


$jsonS = "_jsonS = []; \n";
for($i = 0; $i < $countS; $i++)
{
    $jsonS = $jsonS."_jsonS[".($i)."] = ";
    $jsonS = $jsonS."JSON.parse('".trim($array[$i + $countN + 2])."'); \n"; //чтение строчки
}

echo 
"_countN = ".$countN."; \n".
"_countS = ".$countS."; \n".
$jsonN.$jsonS;

?>

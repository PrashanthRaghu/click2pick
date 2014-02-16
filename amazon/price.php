<?php

include_once('simple_html_dom.php');

$product = $_GET['hello'];
$locale = $_GET['locale'];
$product=preg_replace("/\s/",'%20',$product);
$url = 'http://www.amazon.'.$locale.'/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords='.$product;


$html = file_get_html($url);

$result = array();
foreach($html->find("span[class=bld lrg red]") as $element){ 
	   $e = $element->innertext;
	   if(strpos($e,'-') !== false)
	   	continue;
	   $e = str_replace('￥', '', $e);
       $e = str_replace('$', '', $e);
       $e = str_replace('£', '', $e);
       $e = preg_replace("/\s/",'',$e);
       array_push($result, $e);
}	
$img = "";
foreach($html->find("img[class=productImage cfMarker]") as $element) {
	$img = $element->src;
	if ($img) {
		break;
	}
}
sort($result);	

$output = array('price'=> end($result), 'image'=> $img,'url'=> $url);
print json_encode($output);

?>
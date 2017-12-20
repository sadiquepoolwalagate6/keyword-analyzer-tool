<?php  
$keywords = array();
$domain = array('Sample.html');
$doc = new DOMDocument;
$doc->preserveWhiteSpace = FALSE;
foreach ($domain as $key => $value) {
    @$doc->loadHTMLFile($value);

    $anchor_tags = $doc->getElementsByTagName("div");
    //echo '<pre>';print_r($anchor_tags);die;
    foreach ($anchor_tags as $tag) {
        $keywords[] = strtolower($tag->nodeValue);
    }
}
echo '************** Div Content *****************<br>';
echo '<pre>';print_r($keywords); die();


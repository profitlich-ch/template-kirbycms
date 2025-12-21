<!DOCTYPE html>
<html lang="de">

<head>
    <meta charset="utf-8">
    <title>
        PRO Template Kirby CMS
    </title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <!-- prevent automatic conversion of numbers to telephone links -->
    <meta name="format-detection" content="telephone=no" />
    
    <style>
        /* FOUC
        https://www.primative.net/blog/how-to-get-rid-of-the-flash-of-unstyled-content/ */
        .no-js {
            visibility: visible;
        }

        /* prevent CSS transitions until page is loaded */
        body[data-preloading="true"] * {
            transition: transform 0s !important;
        }

        /* hide body until full html is loaded */
        body {
            visibility: hidden;
        }
    </style>
</head>

<body class="body body--<?php echo $page->slug(); ?> no-js" data-preloading="true">
    <!-- Firefox hack against FOUC: https://www.primative.net/blog/how-to-get-rid-of-the-flash-of-unstyled-content/ -->
    <script>
        0
    </script>
    <!-- FOUC -->
    <script>
        document.querySelector('body').classList.remove('no-js');
    </script>

    <!-- Bugfix Kirby: p Tags in li löschen -->
    <?php
        $suchen = array('<li><p>', '</p></li>');
        $ersetzen = array('<li>', '</li>');
        $string = $page->haupttext();
        echo str_replace($suchen, $ersetzen, $string);
    ?>

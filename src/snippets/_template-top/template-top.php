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
        /* Keine Transitions, solange die Seite lädt. Den Body bis DOMContentLoaded
           zu verstecken, wäre gegen FOUC unnötig – das CSS blockiert im <head> ohnehin –,
           liesse FCP und LCP aber auf alle Modul-Skripte warten. */
        body[data-preloading="true"] * {
            transition: transform 0s !important;
        }
    </style>
</head>

<body class="body body--<?php echo $page->slug(); ?>" data-preloading="true">
    <!-- Firefox hack against FOUC: https://www.primative.net/blog/how-to-get-rid-of-the-flash-of-unstyled-content/ -->
    <script>
        0
    </script>

    <!-- Bugfix Kirby: p Tags in li löschen -->
    <?php
        $suchen = array('<li><p>', '</p></li>');
        $ersetzen = array('<li>', '</li>');
        $string = $page->haupttext();
        echo str_replace($suchen, $ersetzen, $string);
    ?>

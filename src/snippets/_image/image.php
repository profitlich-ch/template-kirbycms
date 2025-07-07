<?php

/**
 * Snippet: responsive-image
 *
 * Erzeugt ein responsives Bild mit WebP-Optimierung und Fallback.
 * Nutzt das <picture>-Element für progressive Bildbereitstellung.
 *
 * @param Kirby\Cms\File $image  - Bildobjekt (erforderlich): $page->bilfField()->toFile(),
 * @param string|null    $ratio  - Optionales Crop-Ratio '16:9' (ohne = kein Crop)
 * @param string|null    $class  - CSS-Klassen für das <img>-Tag
 * @param array          $sizes  - Array von Bildbreiten (in Pixeln) für srcset (Standard: [300, 800, 1024])
 */

$image = $image ?? null;
$ratio = $ratio ?? null;
$class = $class ?? '';
$sizes = $sizes ?? [300, 800, 1024, 2048]; // Standard-Größen für die Bildgenerierung

// Überprüfen, ob ein gültiges Kirby File-Objekt übergeben wurde
if (!$image instanceof Kirby\Cms\File) {
    // Optional: Fehlerprotokollierung oder Platzhalterbild zurückgeben
    // error_log('responsive-image snippet: Kein gültiges Bildobjekt übergeben.');
    return;
}

// Eindeutige ID für das <img>-Tag, nützlich für spezifisches CSS
$uid = 'img-' . bin2hex(random_bytes(4));

$webpSrcset = [];       // Speichert die srcset-Einträge für WebP
$fallbackSrcset = [];   // Speichert die srcset-Einträge für das Originalformat
$webpSrc = '';          // Speichert das src-Attribut für WebP (kleinste Größe)
$fallbackSrc = '';      // Speichert das src-Attribut für das Originalformat (kleinste Größe)
$aspectRatio = 1;       // Standard-Aspektverhältnis, falls nicht berechenbar

// Bestimme den MIME-Typ des Originalbildes für den Fallback <source>-Tag
$originalMimeType = $image->mime();

// Prüfe, ob ein Crop-Verhältnis übergeben wurde
if ($ratio && preg_match('/^(\d+):(\d+)$/', $ratio, $matches)) {
    $cropWidth  = (int)$matches[1];
    $cropHeight = (int)$matches[2];
    $aspectRatio = $cropWidth / $cropHeight; // Berechne das Seitenverhältnis

    // Generiere Thumbnails für jede definierte Größe
    foreach ($sizes as $width) {
        $height = intval($width * $cropHeight / $cropWidth); // Berechne die Höhe basierend auf dem Crop-Verhältnis

        // Generiere WebP-Thumbnail und füge es zum srcset hinzu
        // WICHTIG: null als 3. Argument für die Qualität, ['format' => 'webp'] als 4. Argument für Optionen
        $webpThumb = $image->crop($width, $height, null, ['format' => 'webp']);
        $webpSrcset[] = $webpThumb->url() . " {$width}w";

        // Generiere Fallback-Thumbnail im Originalformat und füge es zum srcset hinzu
        // Kirby's crop() erstellt standardmäßig im Originalformat, es sei denn, ein 'format' wird angegeben.
        $fallbackThumb = $image->crop($width, $height); // Kein 'format'-Option für Fallback
        $fallbackSrcset[] = $fallbackThumb->url() . " {$width}w";
    }

    // Setze die src-Attribute auf das kleinste generierte Bild (für Initialladung/Fallback)
    $webpSrc = $image->crop($sizes[0], intval($sizes[0] * $cropHeight / $cropWidth), null, ['format' => 'webp'])->url();
    $fallbackSrc = $image->crop($sizes[0], intval($sizes[0] * $cropHeight / $cropWidth))->url();

} else {
    // Kein Crop-Verhältnis: Original-Seitenverhältnis des Bildes verwenden
    $aspectRatio = $image->width() / $image->height();

    // Generiere Thumbnails für jede definierte Größe
    foreach ($sizes as $width) {
        // Generiere WebP-Thumbnail und füge es zum srcset hinzu
        // null für die Höhe, um das Original-Seitenverhältnis beizubehalten
        // WICHTIG: null als 3. Argument für die Qualität, ['format' => 'webp'] als 4. Argument für Optionen
        $webpThumb = $image->resize($width, null, null, ['format' => 'webp']); // <-- KORREKTUR HIER
        $webpSrcset[] = $webpThumb->url() . " {$width}w";

        // Generiere Fallback-Thumbnail im Originalformat und füge es zum srcset hinzu
        $fallbackThumb = $image->resize($width); // Kirby's resize() erstellt standardmäßig im Originalformat
        $fallbackSrcset[] = $fallbackThumb->url() . " {$width}w";
    }

    // Setze die src-Attribute auf das kleinste generierte Bild (für Initialladung/Fallback)
    $webpSrc = $image->resize($sizes[0], null, null, ['format' => 'webp'])->url(); // <-- KORREKTUR HIER
    $fallbackSrc = $image->resize($sizes[0])->url();
}
?>

<style>
    /* Basis-CSS für das responsive Bild
     * aspect-ratio sorgt dafür, dass der Platz vor dem Laden des Bildes reserviert wird,
     * um Cumulative Layout Shift (CLS) zu vermeiden.
     * object-fit: cover stellt sicher, dass das Bild den Bereich ausfüllt, ohne verzerrt zu werden.
     */
    #<?= $uid ?> {
        aspect-ratio: <?= number_format($aspectRatio, 4, '.', '') ?>; /* Präzise Aspektverhältnis-Berechnung */
        width: 100%;
        height: auto; /* Stellt sicher, dass die Höhe proportional angepasst wird */
        display: block; /* Entfernt zusätzlichen Platz unter dem Bild */
    }
</style>

<picture>
    <!-- Quelle für das WebP-Format
         Browser, die WebP unterstützen, wählen diese Quelle zuerst. -->
    <source
        srcset="<?= implode(', ', $webpSrcset) ?>"
        type="image/webp"
    >

    <!-- Quelle für das Originalformat (Fallback)
         Browser, die WebP nicht unterstützen (oder AVIF vor WebP bevorzugen würden),
         aber das Originalformat (z.B. JPEG/PNG) unterstützen, wählen diese. -->
    <source
        srcset="<?= implode(', ', $fallbackSrcset) ?>"
        type="<?= esc($originalMimeType) ?>"
    >

    <!-- Das img-Tag als finaler Fallback für sehr alte Browser oder wenn keine <source> passt.
         Es enthält ebenfalls ein srcset für verbesserte Responsivität, falls <source> ignoriert wird. -->
    <img
        id="<?= $uid ?>"
        src="<?= esc($fallbackSrc) ?>"
        srcset="<?= implode(', ', $fallbackSrcset) ?>"
        class="<?= esc($class) ?>"
        alt="<?= esc($image->alt()->or($image->filename())) ?>"
        loading="lazy" />
</picture>

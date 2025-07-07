<?php snippet('_template-top/template-top') ?>
<?php snippet('header/header') ?>
<?php snippet('intro/intro') ?>

<main class="main" id="main">
    <?php foreach ($page->children()->listed() as $part): ?>
        <?php if ($part->abschnitte()->isNotEmpty()): ?>
            <?php snippet('abschnitt/abschnitt', ['part' => $part]) ?>
            <?php elseif ($part->form_fields()->isNotEmpty()): ?>
                <?php snippet('bestellung/bestellung', ['part' => $part]) ?>
        <?php endif ?>
    <?php endforeach ?>
</main>

<?php snippet('footer/footer') ?>

<?php snippet('_template-bottom/template-bottom') ?>
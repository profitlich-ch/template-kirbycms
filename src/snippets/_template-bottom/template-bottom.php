    <?= vite()->js('src/App.js') ?>
    <?php if (option('debug')): ?>
        <?= vite()->js('src/Dev.js') ?>
    <?php endif ?>
    <script>
        // finish preloading
        setTimeout(function() {
            document.body.setAttribute('data-preloading', 'false');
        }, 500);
    </script>
    </div>
    </main>
</body>

</html>
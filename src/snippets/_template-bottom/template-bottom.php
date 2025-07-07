    <script>
        // FOUC
        let domReady = (cb) => {
            document.readyState === 'interactive' || document.readyState === 'complete' ?
                cb() :
                document.addEventListener('DOMContentLoaded', cb);
        };

        domReady(() => {
            document.body.style.visibility = 'visible';
        });
        // finish preloading
        setTimeout(function() {
            document.body.setAttribute('data-preloading', 'false');
        }, 500);
    </script>
</body>

</html>
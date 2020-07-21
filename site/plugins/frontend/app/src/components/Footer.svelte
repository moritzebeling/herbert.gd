<script>
    import { Link } from "svelte-routing";
    import BauhausUniversityLogo from "./BauhausUniversityLogo.svelte";
</script>

<footer>

    <div>
        © 2020 <Link to="/">Herbert.gd</Link>
    </div>

    <div class="right">
        <a class="link logo" title="Imprint" href="https://www.uni-weimar.de/de/fs/impressum/" rel="noopener" target="_blank">
            <BauhausUniversityLogo />
        </a>
    </div>

</footer>

<style>

footer {
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-top: 4rem;
}
footer div {
    flex: 1 0 auto;
}
footer div.right {
    text-align: right;
    flex: 0 0 auto;
}

</style>

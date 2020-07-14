<script>
    import { Router, Link, Route } from "svelte-routing";
    import Logo from './Logo.svelte';
</script>

<header class="site-header">
    <div class="container">

      <Link to="/"><Logo /></Link>

      <nav>
        <ol class="channels">
            <li>
              <a class="" title="Activities" href="http://localhost:8000/activities">
                <span class="full">Activities</span><abbr title="Activities">A</abbr><span class="count">15</span>
              </a>
            </li>
            <li>
              <a class="" title="Grafik Design" href="http://localhost:8000/grafik-design">
                <span class="full">Grafik Design</span><abbr title="Grafik Design">GD</abbr><span class="count">18</span>
              </a>
            </li>
            <li>
              <a class="" title="Space for Visual Research" href="http://localhost:8000/space-for-visual-research">
                <span class="full">Space for Visual Research</span><abbr title="Space for Visual Research">SfVR</abbr><span class="count">14</span>
              </a>
            </li>
            <li>
              <a class="" title="Info" href="http://localhost:8000/info">
                <span class="full">Info</span><abbr title="Info">I</abbr><span class="count"></span>
              </a>
            </li>
        </ol>
      </nav>

    </div>
  </header>
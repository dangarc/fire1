<script>
    import Forbidden from "$lib/Forbidden.svelte";
    import { SignedIn, SignedOut } from "sveltefire";
</script>

<SignedOut>
    <Forbidden/>
</SignedOut>

<SignedIn let:user>
<h1>Since you're logged in, you're permitted to see this.</h1>
</SignedIn>

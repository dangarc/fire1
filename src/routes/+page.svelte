<script>
    import { signInAnonymously } from "firebase/auth";
    import { SignedIn, SignedOut } from "sveltefire";
</script>

DON'T CARE BEFORE<br/>

<SignedIn let:user let:signOut>
    SIGNED IN
    <p>Hello {user.uid}</p>
    <button on:click={signOut}>Sign Out</button>
</SignedIn>

<SignedOut let:auth>
    SIGNED OUT
    <button on:click={() => signInAnonymously(auth)}>Sign In</button>
</SignedOut>

<br/>DON'T CARE AFTER
<a href="/utest">utest</a>

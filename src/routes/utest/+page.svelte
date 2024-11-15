<script>
    import { SignedIn, SignedOut } from "sveltefire";
</script>

<SignedIn let:user let:signOut>
  <p>User {user.uid} is signed in</p>
</SignedIn>

<SignedOut let:auth>
  <p>We KNOW no user is signed in here</p>
</SignedOut>

<p><i>We don't know if anyone is signed in or out for this section.</i></p>

<SignedIn let:signOut>
  <p>Here, we know someone is signed in. All we do is let them sign out.</p>

  <button on:click={signOut}>Sign Out</button>
</SignedIn>


<p><a href="/">Home</a></p>

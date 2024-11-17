<script>
    import { goto } from "$app/navigation";
    import { SignedIn, SignedOut } from "sveltefire";
</script>

<h3>Welcome to the new Fire1/Client_db mashup</h3>

<SignedIn>
    <p>You're logged in.</p>
    <p>You're permitted to add things.</p>
</SignedIn>

<SignedOut>
    <p>You'll need to log in to add things.</p>
    <p>You can only see them (read-only)</p>
</SignedOut>

<button class="btn"
    on:click={() => {
        goto("/fromDB");
    }}>See data from database</button
>

<p>See how to create Svelte components (and display data from database)</p>

<button class="btn"
    on:click={() => {
        goto("/fromDBandComponents");
    }}>Database, now with Components</button
>
<br />
<button class="btn"
    on:click={() => {
        goto("/loggedInOnly");
    }}>An example of a page that is denied if you're logged out.</button
>

<style>
    .btn {
        background-color: #ee90c7;
        color: black;
        padding: 0.5em;
        border-radius: 0.5em;
        margin: 1em;
    }
    .btn:hover {
        background-color: lightgrey;
    }
    .btn:active {
        background-color: lightgrey;
    }
    .btn:focus {
        background-color: lightgrey;
    }
    .btn:visited {
        background-color: lightgrey;
    }
    .btn:link {
        background-color: lightgrey;
    }
    .btn:active {
        background-color: lightgrey;
    }
    .btn:disabled {
        background-color: lightgrey;
    }
    .btn:enabled {
        background-color: lightgrey;
    }
    .btn:required {
        background-color: lightgrey;
    }
    .btn:valid {
        background-color: lightgrey;
    }
    .btn:invalid {
        background-color: lightgrey;
    }
    .btn:optional {
        background-color: lightgrey;
    }
    .btn:read-only {
        background-color: lightgrey;
    }
    .btn:read-write {
        background-color: lightgrey;
    }
    .btn:placeholder-shown {
        background-color: lightgrey;
    }
    .btn:default {
        background-color: lightgrey;
    }
    .btn:checked {
        background-color: lightgrey;
    }
    .btn:indeterminate {
        background-color: lightgrey;
    }
    .btn:target {
        background-color: lightgrey;
    }
    .btn:valid {
        background-color: lightgrey;
    }
    .btn:invalid {
        background-color: lightgrey;
    }
    .btn:in-range {
        background-color: lightgrey;
    }
    .btn:out-of-range {
        background-color: lightgrey;
    }
    .btn:required {
        background-color: lightgrey;
    }
    .btn:optional {
        background-color: lightgrey;
    }
    .btn:read-only {
        background-color: lightgrey;
    }
    .btn:read-write {
        background-color: green;
    }
</style>

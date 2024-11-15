<script>
     import {  userStore } from 'sveltefire';

    export let auth;
    export let firestore;
    const user = userStore();

  </script>
  PS {$user?.displayName} END PS

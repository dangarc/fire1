<script>
    import { signInAnonymously, signInWithPopup } from "firebase/auth";
    import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
    import { SignedIn, SignedOut } from "sveltefire";
    import { GoogleAuthProvider } from "firebase/auth";
    import { GithubAuthProvider } from "firebase/auth";
    import { browser } from "$app/environment";

    const GHprovider = new GithubAuthProvider();
    const Gprovider = new GoogleAuthProvider();

    let signedinuser = {};
    let token = "";
    let solved = false;

    const do_popup = async (auth, provider, type) => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = type.credentialFromResult(result);
                token = credential.accessToken;
                signedinuser = result.user;
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = type.credentialFromError(error);
                console.error("Auth error", {errorCode, errorMessage, email, credential});
            });
    };

    let phoneNumber = "+1 714-555-9898";
    let verificationCode = "123456";
    let confirmationResult = null;
    let recaptchaVerifier = null;

    const beginCodeSendingProcess = async (auth) => {
        if (browser && !recaptchaVerifier && !solved) {
            recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                {
                    size: "normal",
                    callback: (response) => {
                        console.log("recaptcha solved", response);
                        solved = true;
                        doSignIn(auth);
                    },
                },
                auth
            );
            console.log("created recaptchaVerifier");
            window.recaptchaVerifier = recaptchaVerifier;
            recaptchaVerifier.render();
        } else {
            console.log("not browser");
        }
    };
    const doSignIn = async (auth) => {
        try {
            console.log("doSignIn", { auth, phoneNumber, window });
            confirmationResult = await signInWithPhoneNumber(
                auth,
                phoneNumber,
                recaptchaVerifier
            );
            console.log("back from signInWithPhoneNumber");
            const credential = confirmationResult(result);
            token = credential.accessToken;
            signedinuser = result.user;
        } catch (error) {
            console.error(error);
        }
    };

    const verifyCode = async () => {
        try {
            const credential =
                await confirmationResult.confirm(verificationCode);
            // User is now signed in, credential.user contains the user object
            console.log(credential.user);
        } catch (error) {
            console.error(error);
        }
    };
</script>

<p>This renders whether or not a user is signed in</p>
<hr />
<SignedIn let:user let:signOut>
    <p>SIGNED IN</p>
    <p>Hello {user.uid}</p>
    {#if user.email=="brucem@dynamicrange.com"}
        <p>Hi Bruce <i>(this is recognized because my GitHub login uses this address)</i>
    {/if}
    <button on:click={signOut}>Sign Out</button>
    <pre>{JSON.stringify({signedinuser,token}, null, 2)}</pre>
</SignedIn>
<hr />

<SignedOut>
<h2>Pick one:</h2>
</SignedOut>

<SignedOut let:auth>
    <p>ANONYMOUS SIGNIN</p>
    <p><i>This is for systems like ecommerce where you save activities before they create an account -- like adding items to a cart, then really logging in at checkout</i></p>
    <button on:click={() => signInAnonymously(auth)}>Sign In anonymously</button
    >
</SignedOut>
<hr />

<SignedOut let:auth>
    <p>GOOGLE POPUP</p>
    <button on:click={() => do_popup(auth, Gprovider, GoogleAuthProvider)}
        >Sign In with popup</button
    >
</SignedOut>
<hr />

<SignedOut let:auth>
    <p>GITHUB POPUP</p>
    <button on:click={() => do_popup(auth, GHprovider, GithubAuthProvider)}
        >Sign In with popup</button
    >
</SignedOut>

<hr />
<SignedOut let:auth>
    <p>PHONE VERIFICATION</p>

    <p>Captcha {solved ? "solved" : "not solved"}</p>
    {#if confirmationResult}
        <input
            type="text"
            bind:value={verificationCode}
            placeholder="Verification code"
        />
        <button on:click={verifyCode}>Verify code</button>
    {:else}
        <div id="recaptcha-container"></div>
        <input type="tel" bind:value={phoneNumber} placeholder="Phone number" />
        <button on:click={() => beginCodeSendingProcess(auth)}
            >Send Verification code</button
        >
    {/if}
</SignedOut>

<p>This too renders whether or not a user is signed in</p>
<hr />
<a href="/utest">utest</a>

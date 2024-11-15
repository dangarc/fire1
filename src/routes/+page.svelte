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
                // The signed-in user info.
                signedinuser = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...
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
    let verificationCode = "";
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

<p>DON'T CARE BEFORE</p>
<hr />
<SignedIn let:user let:signOut>
    <p>SIGNED IN</p>
    <p>Hello {user.uid}</p>
    <button on:click={signOut}>Sign Out</button>
</SignedIn>
<hr />

<SignedOut let:auth>
    <p>SIGNED OUT -- ANONYMOUS SIGNIN</p>
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

<p>DON'T CARE AFTER</p>
<hr />
<a href="/utest">utest</a>

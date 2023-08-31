<script lang="ts">
    import '../app.postcss';
    import ndk from '$stores/ndk';
	import { onMount } from 'svelte';
	import { NDKNip07Signer, NDKPrivateKeySigner } from '@nostr-dev-kit/ndk';

    let noSignerAlert;

    $ndk.connect();

    onMount(() => {
        $ndk.signer = new NDKNip07Signer();

        if (!$ndk.signer) {
            noSignerAlert = true;
            $ndk.signer = new NDKPrivateKeySigner();
            setTimeout(() => {
                noSignerAlert = false;
            }, 5000);
        }
    })
</script>

<slot />

{#if noSignerAlert}
    <div class="toast toast-end">
        <div class="alert alert-error">
            Could not find a valid NIP-07 signer, we'll create
            an anonymous session for you.
        </div>
    </div>
{/if}
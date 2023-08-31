<script lang="ts">
	import ndk from "$stores/ndk";
	import type { NDKUser } from "@nostr-dev-kit/ndk";
	import { Avatar, Name } from "@nostr-dev-kit/ndk-svelte-components";

    export let user: NDKUser;
    export let compact: boolean;

    let width: number;

    $: width = compact ? 16 : 36;
</script>

<button class="card card-compact card-bordered bg-base-200 hover:bg-base-300 !max-w-48 overflow-hidden" on:click>
    <div
        class="card-body flex gap-0 items-center"
        class:flex-col={!compact}
        class:flex-row={compact}
    >
        <Avatar ndk={$ndk} {user} class="rounded-full {compact ? "sm-compact md:compact" : "sm-not-compact md:not-compact"}" />
        <div
            class="card-title whitespace-nowrap truncate overflow-x-hidden"
            class:hidden={compact}
        >
            <Name ndk={$ndk} {user} />
        </div>
    </div>
</button>

<style lang="postcss">
    :global(.compact) {
        @apply w-16 h-16;
    }

    :global(.not-compact) {
        @apply w-36 h-36;
    }

    :global(.sm-compact) {
        @apply w-16 h-16;
    }

    :global(.sm-not-compact) {
        @apply w-36 h-36;
    }
</style>
<script lang="ts">
	import DvmCard from "$components/dvms/DvmCard.svelte";
	import DvmListItem from "$components/dvms/DvmListItem.svelte";
	import EventCard from "$components/jobs/EventCard.svelte";
	import DvmTile from "$components/jobs/JobRequestEditor/DvmTile.svelte";
	import JobResultRow from "$components/jobs/JobResultRow.svelte";
    import ndk from "$stores/ndk";
	import { appHandlers } from "$stores/nip89";
	import { NDKAppHandlerEvent, NDKDVMJobResult, NDKDVMRequest, NDKEvent, NDKUser, type NostrEvent } from "@nostr-dev-kit/ndk";
	import type { NDKEventStore } from "@nostr-dev-kit/ndk-svelte";
	import { Name } from "@nostr-dev-kit/ndk-svelte-components";
	import { onDestroy, onMount } from "svelte";

    export let user: NDKUser;

    let jobRequest: NDKDVMRequest | undefined;
    let responses: NDKEventStore<NDKEvent> | undefined;

    let appHandler: NDKAppHandlerEvent;

    $: appHandler = $appHandlers.find((handler) => handler.pubkey === "6b37d5dc88c1cbd32d75b713f6d4c2f7766276f51c9337af9d32c8d715cc1b93") as NDKAppHandlerEvent;

    onDestroy(() => {
        if (responses) {
            responses.unsubscribe();
        }
    });

    // responses = $ndk.storeSubscribe({
    //         "#e": [ "bcfec157789f9f3fba426f19a1a22d2198bf54681d0e872a738af899c88b3f07" ]
    //     }, { closeOnEose: false, groupable: false });

    async function sendRequest() {
        jobRequest = new NDKDVMRequest($ndk, {
            kind: 65008,
            tags: [
                [ "param", "user", user.hexpubkey() ]
            ]
        } as NostrEvent);
        await jobRequest.sign();

        responses = $ndk.storeSubscribe({
            "#e": [ jobRequest.tagId() ]
        }, { closeOnEose: false, groupable: false });

        await jobRequest.publish();
    }
</script>

<h1 class="text-3xl my-4 text-semibold overflow-clip whitespace-nowrap hidden" style="max-width: 40vw;">
    What
    <Name ndk={$ndk} {user} class="whitespace-nowrap truncate max-w-48 overflow-clip" />
    might have missed
</h1>

{#if !responses || $responses.length === 0}
    {#if appHandler}
        <div class="w-96">
            <DvmListItem dvm={appHandler} />
        </div>
    {/if}

    <button class="btn btn-primary btn-lg" on:click={sendRequest} disabled={!!jobRequest}>
        Request from DVM
        {#if jobRequest}
            <span class="loading loading-spinner" />
        {/if}
    </button>

{:else if $responses}
    <div class="flex flex-col gap-4">
        {#each $responses as response (response.id)}
            {#if response.kind === 65001}
                <div class="relative mockup-browser border bg-base-300 max-h-[70vh] overflow-y-scroll">
                    <div class="mockup-browser-toolbar">
                        <div class="input">DVM results</div>
                    </div>
                    <JobResultRow event={NDKDVMJobResult.from(response)} />
                </div>
            {/if}
        {/each}
        {#each $responses as response (response.id)}
            {#if response.kind === 65000}
                <EventCard
                    event={response}
                    class="card card-bordered w-full shadow bg-base-200"
                >
                    {response.content}
                </EventCard>
            {/if}
        {/each}
    </div>
{/if}
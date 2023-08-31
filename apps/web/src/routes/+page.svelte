<script lang="ts">
	import ndk from '$stores/ndk';
	import type { NDKUser } from '@nostr-dev-kit/ndk';
	import UserTile from './UserTile.svelte';
	import { onMount } from 'svelte';
	import FomoCard from './FomoCard.svelte';

	let users: NDKUser[] = [];

	onMount(() => {
		const npubs = [
			"npub1l2vyh47mk2p0qlsku7hg0vn29faehy9hy34ygaclpn66ukqp3afqutajft",
			"npub1sg6plzptd64u62a878hep2kev88swjh3tw00gjsfl8f237lmu63q0uf63m",
			"npub1jlrs53pkdfjnts29kveljul2sm0actt6n8dxrrzqcersttvcuv3qdjynqn",
			"npub1nxa4tywfz9nqp7z9zp7nr7d4nchhclsf58lcqt5y782rmf2hefjquaa6q8",
			"npub149p5act9a5qm9p47elp8w8h3wpwn2d7s2xecw2ygnrxqp4wgsklq9g722q",
			"npub1az9xj85cmxv8e9j9y80lvqp97crsqdu2fpu3srwthd99qfu9qsgstam8y8",
			"npub12262qa4uhw7u8gdwlgmntqtv7aye8vdcmvszkqwgs0zchel6mz7s6cgrkj",
			"npub16c0nh3dnadzqpm76uctf5hqhe2lny344zsmpm6feee9p5rdxaa9q586nvr"
		];

		npubs.sort(() => Math.random() - 0.5).forEach((npub: string) => {
			const user = $ndk.getUser({npub});
			user.fetchProfile().then(() => {
				users.push(user);
				users = users;
			});
		});
	});

	let choosenUser: NDKUser | undefined;
	let npub: string = "";

	async function generateResults(user: NDKUser) {
		choosenUser = user;
	}
</script>

<svelte:head>
	<title>FOMOstr.com -- Find what you've missed in nostr</title>
</svelte:head>

<div class="flex min-h-screen max-w-[100vw] flex-col items-center justify-start xl:flex-row xl:items-start xl:justify-between">
	<div class="shrink {choosenUser ? "lg:w-1/3" : "lg:w-1/2"} flex items-center justify-center md:min-h-screen sticky">
		<div class="flex items-center justify-center px-4 py-10 text-center xl:justify-start xl:pl-10 xl:text-left">
			<div>
				<div class="flex flex-col items-center gap-6 [text-shadow:hsl(var(--p)/.5)_0_0_2rem;] xl:flex-row">
					<div data-tip="copy" class="tooltip tooltip-accent"></div>
				</div>
				<div class="h-4"></div>
				<h1 class="font-title text-center text-[clamp(2rem,6vw,4.2rem)] font-black leading-[1.1] xl:text-left">
					<span class="[&amp;::selection]:text-base-content brightness-150 contrast-150 [&amp;::selection]:bg-blue-700/20">Find what you missed</span>
					<br>
					<span class="[&amp;::selection]:text-base-content brightness-150 contrast-150 [&amp;::selection]:bg-blue-700/20">on Nostr with</span>
					<br>
					<span class="inline-grid">
						<span class="pointer-events-none col-start-1 row-start-1 bg-[linear-gradient(90deg,hsl(var(--s))_0%,hsl(var(--sf))_9%,hsl(var(--pf))_42%,hsl(var(--p))_47%,hsl(var(--a))_100%)] bg-clip-text opacity-70 blur-3xl [-webkit-text-fill-color:transparent] [@supports(color:oklch(0_0_0))]:bg-[linear-gradient(90deg,hsl(var(--s))_4%,color-mix(in_oklch,hsl(var(--sf)),hsl(var(--pf)))_22%,hsl(var(--p))_45%,color-mix(in_oklch,hsl(var(--p)),hsl(var(--a)))_67%,hsl(var(--a))_100.2%)]" aria-hidden="true">fomostr</span>
						<span class="[&amp;::selection]:text-base-content relative col-start-1 row-start-1 bg-[linear-gradient(90deg,hsl(var(--s))_0%,hsl(var(--sf))_9%,hsl(var(--pf))_42%,hsl(var(--p))_47%,hsl(var(--a))_100%)] bg-clip-text [-webkit-text-fill-color:transparent] [&amp;::selection]:bg-blue-700/20 [@supports(color:oklch(0_0_0))]:bg-[linear-gradient(90deg,hsl(var(--s))_4%,color-mix(in_oklch,hsl(var(--sf)),hsl(var(--pf)))_22%,hsl(var(--p))_45%,color-mix(in_oklch,hsl(var(--p)),hsl(var(--a)))_67%,hsl(var(--a))_100.2%)]">fomostr</span>
					</span>

				</h1>
				<div class="h-4"></div>
				<p class="text-base-content/60 font-title py-4 font-light md:text-lg xl:text-2xl">
					FOMOstr uses DVMs to find what you might have missed.
					<br>
					What's even cooler? Any nostr client can quickly integrate this,
					and an infinite number of other DVMs, into their client.
				</p>

				<div class="card card-compact card-bordered bg-base-200 hover:bg-base-300">
					<div class="card-body">
						<div class="join join-horizontal">
							<input type="text" bind:value={npub} class="input input-bordered input-lg w-full join-item" placeholder="Enter your npub" />
							<button class="btn btn-neutral btn-lg join-item" on:click={() => generateResults($ndk.getUser({npub}))}>Enter</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="{choosenUser ? "lg:w-2/3" : "lg:w-1/2"} flex flex-col min-h-screen items-center justify-center">
		<div class="flex flex-col gap-4">
			<div
				class="grid gap-4 overflow-hidden truncate
				{choosenUser ? "grid-cols-4 md:grid-cols-8" : "grid-cols-2 md:grid-cols-4"}
				"
			>
				{#each users as user}
					<UserTile {user} on:click={() => generateResults(user)} compact={!!choosenUser} />
				{/each}
			</div>
		</div>

		{#if choosenUser}
			<div class="mt-6 flex-grow items-center justify-center flex flex-col gap-4">
				{#key choosenUser.npub}
					<FomoCard user={choosenUser} />
				{/key}
			</div>
		{/if}
	</div>
</div>
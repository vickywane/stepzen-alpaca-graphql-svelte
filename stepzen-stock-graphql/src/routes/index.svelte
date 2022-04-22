<script>
	import { operationStore, query, setClient } from '@urql/svelte';
	import { GET_ACCOUNT_DETAILS, GET_ACCOUNT_ORDERS } from '../graphqlOps';
	import PurchaseStockModal from '../components/PurchaseStockModal.svelte';
	import { GraphqlClient } from '../config';
	let orderStatus = 'All';

	setClient(GraphqlClient);
	const accountDetail = operationStore(GET_ACCOUNT_DETAILS);
	const accountOrders = operationStore(GET_ACCOUNT_ORDERS, { orderStatus });

	query(accountDetail);
	query(accountOrders);

	let shouldShowPurchaseModal = false;

	function handleModalVisibility(modalState) {
		shouldShowPurchaseModal = modalState;
	}
</script>

<svelte:head>
	<title>GraphQL Stocks App</title>

	<script src="https://cdn.tailwindcss.com"></script>
</svelte:head>

<body>
	{#if $accountDetail.fetching}
		<div
			class="flex items-center justify-center"
			style="width: 100%; height: 100vh;  background-color: #fff5e8;"
		>
			<p class="text-center text-2xl">Heating things up...</p>
		</div>
	{:else}
		<div>
			{#if shouldShowPurchaseModal}
				<PurchaseStockModal
					handleClose={() => handleModalVisibility(false)}
					refetchOrders={() => accountOrders.reexecute()}
				/>
			{/if}

			<div
				class="w-full flex justify-center items-center p-8"
				style="height: 270px; background-image: url(https://res.cloudinary.com/dkfptto8m/image/upload/v1649937503/butterCMS-tarvel-journal.jpg)"
			>
				<div class="bg-white p-6 rounded-xl shadow-md ">
					<h1 class="text-2xl bg mb-2 text-center">
						Welcome #{accountDetail.data.AccountQuery.account_number}
					</h1>
					<p class="text-sm text-center">
						A GraphQL powered stock trading app powered by <a href="https://alpaca.markets/"
							>StepZen</a
						>
						and <a href="https://stepzen.com/">AlpacaDB</a>.
					</p>
				</div>
			</div>

			<div style="background-color: #fff5e8;">
				<div class="flex items-center justify-center">
					<div
						class="rounded-lg shadow-lg flex justify-between p-5 bg-white h-20"
						style="width: 80%; transform: translateY(-50px);"
					>
						<div>
							<p class="pt-2">
								{accountOrders.fetching
									? 'Counting Your Orders ...'
									: `${accountOrders.data.OrdersQuery.length} Orders Made`}
							</p>
						</div>

						<div>
							<button
								on:click={(e) => {
									e.preventDefault();
									handleModalVisibility(true);
								}}
								class="mb-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							>
								Place A Stock Order
							</button>
						</div>
					</div>
				</div>

				<hr />
				<br />

				{#if $accountOrders.fetching}
					<p>Loading Account Orders</p>
				{:else}
					<div class="mx-8 mb-6">
						<div class="w-full px-3">
							<label
								class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								for="symbol"
							>
								Order Status
							</label>

							<select
								bind:value={orderStatus}
								on:change={() => {
									console.log('HEY THERE');

									accountOrders.reexecute();
								}}
								class=" bg-gray-200 text-gray-700 px-4 py-2"
								id="symbol"
							>
								<option value="All"> All </option>

								<option value="Open"> Open </option>

								<option value="Closed"> Closed </option>

								<option value="Filled"> Filled </option>
							</select>
						</div>
					</div>

					<ul>
						{#each $accountOrders.data.OrdersQuery as order}
							<li class="flex justify-center items-center">
								<div class="mb-8">
									<div
										style="width: 50rem;"
										class="shadow-xl bg-white rounded-r p-4 flex flex-col leading-normal"
									>
										<div class="mb-8">
											<div class="pt-2 pb-2">
												<span
													class="capitalize inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
												>
													{order.side}
													{order.order_type} order
												</span>
											</div>

											<div class="text-gray-900 font-bold text-xl mb-2">{order.symbol}</div>
											<p class="text-gray-700 text-base">
												You placed a {order.side} order for {order.qty} quantity of
												<span class="text-bold">{order.symbol}</span>.
											</p>
										</div>

										<div class="flex items-center">
											<div class="text-sm">
												<p class="text-gray-600" style="text-transform: capitalize;">
													Placed on {new Date(order.created_at).toLocaleDateString()}
												</p>
											</div>
										</div>
									</div>
								</div>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>
	{/if}
</body>

<script>
	import { mutation } from '@urql/svelte';
	import { CREATE_STOCK_ORDER } from '../graphqlOps';

	export let handleClose = function (modalVisibility) {};
	export let refetchOrders = function () {};

	let qty;
	let symbol;

	const createOrder = mutation({
		query: CREATE_STOCK_ORDER
	});

	async function handleOrderSubmission() {
		try {
			await createOrder({
				symbol,
				qty,
				time_in_force: 'day',
				type: 'buy',
				side: 'market'
			});

			handleClose(false);
			refetchOrders();
		} catch (error) {
			console.log('ERROR:', error);
		}
	}
</script>

<div
	class="fixed z-10 inset-0 overflow-y-auto"
	aria-labelledby="modal-title"
	role="dialog"
	aria-modal="true"
>
	<div
		class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
	>
		<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />

		<div
			class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
		>
			<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
				<div class="sm:flex sm:items-start">
					<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
						<h3 class="text-xl leading-6 font-medium text-gray-900" id="modal-title">
							Place Stock Order
						</h3>
						<div class="mt-2">
							<p class="text-sm text-gray-500">Place a stock order through your Alpaca Account</p>
						</div>
					</div>
				</div>
			</div>
			<hr />
			<div>
				<form class=" w-full max-w-lg p-8">
					<div class="flex flex-wrap -mx-3 mb-6">
						<div class="w-full px-3">
							<label
								class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								for="symbol"
							>
								stock Symbol
							</label>
							<input
								bind:value={symbol}
								class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								id="symbol"
								placeholder="AMZN"
							/>
							<p class="text-gray-600 text-xs italic">Abbreviation for a stock</p>
						</div>
					</div>

					<div class="flex flex-wrap -mx-3 mb-6">
						<div class="w-full px-3">
							<label
								class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
								for="stock_qty"
							>
								stock quantity
							</label>
							<input
								bind:value={qty}
								type="number"
								class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
								id="stock_qty"
								placeholder="Amount to purchase"
							/>
						</div>
					</div>
				</form>
			</div>

			<div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
				<button
					on:click={() => handleOrderSubmission()}
					type="button"
					class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
					>Place Order</button
				>
				<button
					type="button"
					on:click={() => handleClose(false)}
					class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
					>Cancel</button
				>
			</div>
		</div>
	</div>
</div>

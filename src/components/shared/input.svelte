<style lang="less">
	input {
		padding: 4px;
		border: 1px solid black;
		border-radius: 4px;
	}

	.error-message {
		color: #c10000;
		font-size: 13px;
		font-weight: bold;
	}
</style>

<script lang="ts">
	export let className = ''
	export let error = ''
	export let id = ''
	export let label = ''
	export let placeholder = ''
	export let type = 'text'
	export let value = ''
</script>

<div class={`flex flex-col ${className} my-1`}>
	<label class="font-light" for={id}>{label}</label>
	<input
		{placeholder}
		{id}
		{value}
		{type}
		on:input={({ target }) => {
			value = target.value
		}}
	/>
	{#if error}
		<div class="my-2 flex items-center gap-1">
			<img alt="" src="assets/svgs/alert.svg" height="20" width="20" />
			<div class="error-message">{error}</div>
		</div>
	{/if}
</div>

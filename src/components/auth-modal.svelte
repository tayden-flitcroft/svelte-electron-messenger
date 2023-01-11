<style lang="less">
	.modal {
		max-width: 500px;
		width: 80vw;

		&__background {
			background: rgba(0, 0, 0, 0.6);
		}
	}

	.input-wrapper {
		width: 100%;
		gap: 2rem;

		@media (max-width: 768px) {
			flex-direction: column;
			gap: 1rem;
		}

		select {
			height: 30px;
			min-width: 100px;
			text-align: center;
			width: 100%;
			border: 1px solid grey;
			border-radius: 4px;
		}
	}

	.terms-an-condition-modal-button {
		color: rgba(9, 140, 220, 0.69);
		border-bottom: 1px solid transparent;

		&:hover {
			border-bottom: 1px solid rgba(9, 140, 220, 0.69);
		}
	}

	button[type='submit'] {
		background-color: black;
		border-radius: 4px;
		border: 1px solid black;
		color: white;
		padding: 4px;
	}

	.error-message {
		color: #c10000;
		font-size: 13px;
		font-weight: bold;
	}

	.or-break {
		text-align: center;
		border-bottom: 1px solid #000;
		line-height: 0.1em;
		margin: 2rem 0;

		span {
			background: white;
			padding: 0 10px;
		}
	}
</style>

<script lang="ts">
	import { MONTHS } from '../helpers/constants'
	import {
		birthDayErrorMessage,
		birthMonthErrorMessage,
		birthYearErrorMessage,
		emailAddressErrorMessage,
		firstNameErrorMessage,
		lastNameErrorMessage,
		passwordConfirmationErrorMessage,
		passwordErrorMessage,
		termsAndConditionsErrorMessage
	} from '../helpers/helpers'
	import Input from './shared/input.svelte'

	let acceptedTermsAndConditions = false,
		acceptedTermsAndConditionsError: string,
		birthDay = '',
		birthDayError = '',
		birthMonth = '',
		birthMonthError = '',
		birthYear = '',
		birthYearError = '',
		emailAddress = '',
		emailAddressError = '',
		firstName = '',
		firstNameError = '',
		lastName = '',
		lastNameError = '',
		password = '',
		passwordError = '',
		passwordConfirmation = '',
		passwordConfirmationError = '',
		showPassword = false,
		showTermsAndConditionsModal = false

	const years = (): { value: string; label: string }[] => {
			const currentYear = new Date().getFullYear()
			const eighteenYearsOldYear = currentYear - 18
			const startYear = eighteenYearsOldYear - 100
			const temp = []
			for (let i = startYear; i <= eighteenYearsOldYear; i++) {
				temp.unshift({ value: i.toString(), label: i.toString() })
				if (i === eighteenYearsOldYear) {
					temp.unshift({ value: '', label: 'YYYY' })
				}
			}
			return temp
		},
		months: { value: string; label: string }[] = [
			{ value: '', label: 'MM' },
			...Object.entries(MONTHS).map(([, item]: string[], idx: number) => {
				const value = idx + 1 < 10 ? '0' + (idx + 1) : idx + 1
				return { value: value.toString(), label: item }
			})
		]
	$: days = (): { value: string; label: string }[] => {
		const temp = [{ value: '', label: 'DD' }]

		if (!months.length) return temp

		const numDays = new Date(+birthYear, +birthMonth, 0).getDate()
		for (let i = 1; i <= numDays; i++) {
			const value = (i < 10 ? '0' + i : i).toString()
			temp.push({ value, label: value })
		}
		if (+birthDay > +temp[temp.length - 1].label) {
			birthDay = ''
		}
		return temp
	}

	const toggleTermsAndConditionsModal = () => {
		showTermsAndConditionsModal = !showTermsAndConditionsModal
	}

	const validate = () => {
		firstNameError = firstNameErrorMessage(firstName)
		lastNameError = lastNameErrorMessage(lastName)
		emailAddressError = emailAddressErrorMessage(emailAddress)
		passwordError = passwordErrorMessage(password)
		passwordConfirmationError = passwordConfirmationErrorMessage(
			password,
			passwordConfirmation
		)
		acceptedTermsAndConditionsError = termsAndConditionsErrorMessage(
			acceptedTermsAndConditions
		)
		birthMonthError = birthMonthErrorMessage(birthMonth)
		birthDayError = birthDayErrorMessage(birthMonth, birthDay, +birthYear)
		birthYearError = birthYearErrorMessage(birthYear)

		return !(
			firstNameError ||
			lastNameError ||
			emailAddressError ||
			passwordError ||
			passwordConfirmationError ||
			acceptedTermsAndConditionsError ||
			birthMonthError ||
			birthDayError ||
			birthYearError
		)
	}

	const handleSubmit = () => {
		if (validate()) {
			console.log('validated')
			// 	create account handler
		}
	}
</script>

<div
	class="modal__background absolute inset-0 z-50 flex items-center justify-center"
>
	<div class="modal bg-white p-4">
		<h1 class="text-center text-2xl font-extralight">Sign Up</h1>
		<form
			class="flex flex-col"
			on:submit|preventDefault={handleSubmit}
			novalidate
		>
			<Input
				bind:value={emailAddress}
				error={emailAddressError}
				id="email-address"
				label="Email Address"
				placeholder="Enter your email address"
				type="email"
			/>
			<div class="input-wrapper flex">
				<div class="flex w-full flex-col">
					<Input
						bind:value={password}
						error={passwordError}
						id="password-input"
						label="Password"
						placeholder="Enter a password"
						type={showPassword ? 'text' : 'password'}
					/>
					<div class="flex gap-2">
						<input
							bind:checked={showPassword}
							id="show-password"
							type="checkbox"
						/>
						<label class="font-light" for="show-password">Show Password</label>
					</div>
				</div>
				<Input
					bind:value={passwordConfirmation}
					className="w-full"
					error={passwordConfirmationError}
					id="password-confirmation"
					label="Password Confirmation"
					placeholder="Confirm your password"
					type={showPassword ? 'text' : 'password'}
				/>
			</div>
			<!--Password Rules -->
			<!--"Sorry, the password you entered does not meet the minimum requirements. It must be at least 8 characters long and contain at least one letter, one number, and one special character."-->
			<div class="input-wrapper flex">
				<Input
					bind:value={firstName}
					className="w-full"
					error={firstNameError}
					id="first-name"
					label="First Name"
					placeholder="Enter your first name"
					type="text"
				/>
				<Input
					bind:value={lastName}
					className="w-full"
					error={lastNameError}
					id="last-name"
					label="Last Name"
					placeholder="Enter your last name"
					type="text"
				/>
			</div>
			<div class="font-light">Birthday</div>
			<div class="input-wrapper flex w-full content-start gap-5">
				<div class="flex flex-col">
					<select bind:value={birthMonth}>
						{#each months as { label, value }}
							<option {value}>{label}</option>
						{/each}
					</select>
					{#if birthMonthError}
						<div class="my-2 flex items-center gap-1">
							<img alt="" src="assets/svgs/alert.svg" height="20" width="20" />
							<div class="error-message">{birthMonthError}</div>
						</div>
					{/if}
				</div>
				<div class="flex flex-col">
					<select bind:value={birthDay}>
						{#each days() as { label, value }}
							<option {value}>{label}</option>
						{/each}
					</select>
					{#if birthDayError}
						<div class="my-2 flex items-center gap-1">
							<img alt="" src="assets/svgs/alert.svg" height="20" width="20" />
							<div class="error-message">{birthDayError}</div>
						</div>
					{/if}
				</div>
				<div class="flex flex-col">
					<select bind:value={birthYear}>
						{#each years() as { label, value }}
							<option {value}>{label}</option>
						{/each}
					</select>
					{#if birthYearError}
						<div class="my-2 flex items-center gap-1">
							<img alt="" src="assets/svgs/alert.svg" height="20" width="20" />
							<div class="error-message">{birthYearError}</div>
						</div>
					{/if}
				</div>
			</div>
			<div class="my-2 flex flex-col">
				<div class="flex gap-2">
					<input
						id="accepted-terms-and-conditions-checkbox"
						type="checkbox"
						bind:checked={acceptedTermsAndConditions}
					/>
					<label
						class="font-light"
						for="accepted-terms-and-conditions-checkbox"
					>
						I accept the
						<button
							class="terms-an-condition-modal-button cursor-pointer border-none bg-transparent"
							type="button"
							on:click={toggleTermsAndConditionsModal}
						>
							Terms and Conditions
						</button>
					</label>
				</div>
				{#if acceptedTermsAndConditionsError}
					<div class="my-2 flex items-center gap-1">
						<img alt="" src="assets/svgs/alert.svg" height="20" width="20" />
						<div class="error-message">{acceptedTermsAndConditionsError}</div>
					</div>
				{/if}
			</div>
			<button type="submit">Submit</button>
		</form>
		<div class="or-break">
			<span>or</span>
		</div>
		<div>sign in with google</div>
		<div> sign in with apple</div>
		{#if showTermsAndConditionsModal}
			<div>tayden</div>
			<!--load up terms and conditions modal with terms and conditions text from firebase-->
		{/if}
	</div>
</div>

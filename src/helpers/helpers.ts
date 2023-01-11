export const isLeapYear = (year: number) =>
	(year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

export const firstNameErrorMessage = (name: string) => {
	const regex = /^[a-zA-Z' -]{2,20}$/
	name = name.trim()
	if (!name) {
		return 'Enter your first name.'
	}
	if (!regex.test(name)) {
		return 'Enter a valid first name.'
	}
	return ''
}

export const lastNameErrorMessage = (name: string) => {
	const regex = /^[a-zA-Z' -]{2,20}$/
	name = name.trim()
	if (!name) {
		return 'Enter your last name.'
	}
	if (!regex.test(name)) {
		return 'Enter a valid last name.'
	}
	return ''
}

export const emailAddressErrorMessage = (email: string) => {
	const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
	email = email.trim()
	if (!email) {
		return 'Enter your email address.'
	}
	if (!regex.test(email)) {
		return 'Enter a valid email address.'
	}
	return ''
}

export const passwordErrorMessage = (password: string) => {
	const specialCharacterRegex = /[@$!%*#?&]/
	const capitalLetterRegex = /[A-Z]/
	const lowerCaseLetterRegex = /[a-z]/

	password = password.trim()

	if (!password) {
		return 'Enter a password.'
	} else if (password.length < 8) {
		return 'Use 8 characters or more for your password'
	} else if (!capitalLetterRegex.test(password)) {
		return 'Password must include at least one capital letter'
	} else if (!lowerCaseLetterRegex.test(password)) {
		return 'Password must include at least one lowercase letter'
	} else if (!specialCharacterRegex.test(password)) {
		return 'Password must include a special character'
	} else {
		return ''
	}
}

export const passwordConfirmationErrorMessage = (
	password: string,
	confirmation: string
) => {
	password = password.trim()
	confirmation = confirmation.trim()
	if (password !== confirmation) {
		return "Those passwords don't match. Try Again."
	}
	return ''
}

export const termsAndConditionsErrorMessage = (
	acceptedTermsAndConditions: boolean
) => {
	if (!acceptedTermsAndConditions) {
		return 'Please accept the terms and conditions.'
	}
	return ''
}

export const birthMonthErrorMessage = (birthMonth: string) => {
	const regex = /^(0[1-9]|1[0-2])$/
	if (!birthMonth || birthMonth === 'MM') {
		return 'Select your birth month.'
	}
	if (!regex.test(birthMonth)) {
		return 'Select a valid birth month.'
	}
	return ''
}

export const birthDayErrorMessage = (
	month: string,
	birthDay: string,
	year: number
) => {
	const regex =
		/^(0[1-9]|[12][01]|3[01])(?!02-(0[1-9]|1[0-2]-(0[48]|[2468][048]|[13579][26])|(0[48]|[2468][048]|[13579][26])00))$/

	let numDays
	if (month === '02') {
		numDays = isLeapYear(year) ? 29 : 28
	} else if (['04', '06', '09', '11'].includes(month)) {
		numDays = 30
	} else {
		numDays = 31
	}

	if (!birthDay || birthDay === 'DD') {
		return 'Select your birth day.'
	}
	if (!regex.test(birthDay)) {
		return 'Select a valid birth day.'
	}
	if (month && year && Number(birthDay) > numDays) {
		return 'Select a valid birth day for the chosen month and year.'
	}
	return ''
}

export const birthYearErrorMessage = (year: string) => {
	if (!year || year === 'YYYY') {
		return 'Select your birth year.'
	}

	return ''
}

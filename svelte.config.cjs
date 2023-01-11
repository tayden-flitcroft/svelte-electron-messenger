import nodeAdapter from '@sveltejs/adapter-node'

const config = {
	kit: {
		adapter: nodeAdapter({ out: 'dist' })
	}
}

export default config

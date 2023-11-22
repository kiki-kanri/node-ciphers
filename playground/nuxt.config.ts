import removeConsole from 'vite-plugin-remove-console';

const isDev = process.env.NODE_ENV === 'development';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			noscript: [{ children: 'Javascript is required.' }],
			title: ''
		},
		keepalive: true
	},
	css: [
		// Customized
		'@/assets/scss/public/index.scss',

		// Modules and packages
		'@unocss/reset/tailwind.css'
	],
	devServer: {
		host: process.env.DEV_SERVER_HOST,
		port: Number(process.env.DEV_SERVER_PORT) || undefined
	},
	devtools: { enabled: false },
	experimental: {
		headNext: true,
		inlineSSRStyles: false
	},
	googleFonts: {
		display: 'swap',
		download: false,
		families: {
			Convergence: true,
			'Noto+Sans+TC': true
		}
	},
	imports: {
		dirs: ['./composables/**/*.ts']
	},
	modules: [
		'@nuxtjs/google-fonts',
		'@nuxtjs/robots',
		'@unocss/nuxt',
		'@vueuse/nuxt',
		'nuxt-purgecss',
		'nuxt-security'
	],
	nitro: { compressPublicAssets: true },
	purgecss: {
		enabled: true,
		safelist: {
			deep: [
				/-(enter|leave)-active/,
				/--unocss--/g,
				/-\[\S+\]/,
				/__uno_hash_(\w{6})/
			],
			standard: ['body', 'html']
		}
	},
	security: {
		corsHandler: {
			origin: process.env.WEB_HOST
		},
		headers: {
			crossOriginEmbedderPolicy: isDev ? 'unsafe-none' : 'require-corp',
			xFrameOptions: isDev ? 'SAMEORIGIN' : 'DENY'
		}
	},
	ssr: true,
	typescript: {
		tsConfig: {
			compilerOptions: {
				noImplicitOverride: true,
				noUncheckedIndexedAccess: true,
				noUnusedLocals: true,
				noUnusedParameters: true
			}
		},
		typeCheck: true
	},
	vite: {
		plugins: [removeConsole()]
	}
});

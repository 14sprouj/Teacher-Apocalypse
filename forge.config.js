// JavaScript source code
module.exports = {
	makers: [
		{
			name: '@electron-forge/maker-zip',
			config: {
				// Config here
			}
		},
		{
			name: '@electron-forge/maker-dmg',
			config: {
				background: './assets/dmg-background.png',
				format: 'ULFO'
			}
		},
		{
			name: '@electron-forge/maker-pkg',
			config: {
				keychain: 'my-secret-ci-keychain'
			}
		},
		{
			"name": "@electron-forge/maker-squirrel",
			"config": {
				"certificateFile": "./cert.pfx",
				"certificatePassword": "this-is-a-secret"
			}
		},
		{
			name: '@electron-forge/maker-deb',
			config: {
				options: {
					maintainer: 'Joe Bloggs',
					homepage: 'https://example.com'
				}
			}
		},
		{
			name: '@electron-forge/publisher-github',
			config: {
				repository: {
					owner: '14sprouj',
					name: 'Teacher-Apocalypse'
				},
				prerelease: true
			}
		}
	]
}
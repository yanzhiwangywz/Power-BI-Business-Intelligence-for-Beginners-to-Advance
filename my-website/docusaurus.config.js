/** @type {import('@docusaurus/types').Config} */
const path = require('path');

module.exports = {
  title: ' ', // Minimal placeholder to avoid empty title error as discussed
  tagline: 'Your site tagline or description',
  favicon: 'img/favicon.ico', // Path to your favicon, set to '' if you want no favicon

  // Set the production URL of your site
  url: 'https://your-site-url.com',
  baseUrl: '/', // Base URL for your project

  // GitHub pages deployment config (adjust if you're using a different deployment)
  organizationName: 'your-org', // Usually your GitHub org/user name
  projectName: 'your-project', // Usually your repo name

  onBrokenLinks: 'throw', // Throw an error if links are broken during build
  onBrokenMarkdownLinks: 'warn', // Warn about broken Markdown links

  // Presets configuration (using 'classic' for standard Docusaurus setup)
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: path.join(__dirname, './sidebars.js'), // Path to sidebar configuration
          // Define route for docs, including notes if placed under docs
          routeBasePath: 'docs',
        },
        blog: false, // Disable blog as per your request
        theme: {
          customCss: path.join(__dirname, './src/css/custom.css'), // Custom CSS if needed
        },
      }),
    ],
  ],

  // Plugins (including the search plugin and the new redirects plugin)
  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        // Search configuration: index docs and notes, exclude blog since it's disabled
        hashed: true, // Use hashed file names for cache busting
        indexDocs: true, // Index documentation content
        indexBlog: false, // No blog to index
        indexPages: true, // Index standalone pages if needed
        language: ['en'], // Language for search, adjust if multilingual
      },
    ],
  ],

  // Theme configuration
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Navbar setup (removed logo to eliminate icon in top-left corner)
      navbar: {
        title: ' ', // Minimal placeholder to satisfy validation
        // Logo field is omitted to remove any icon or logo from top-left corner
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar', // Reference to sidebar ID for docs/notes
            position: 'left',
            label: 'Docs & Notes', // Label for docs and notes section
          },
          // Add other navbar items as needed (e.g., GitHub link)
          {
            href: 'https://github.com/your-org/your-project',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      // Footer configuration (optional)
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Resources',
            items: [
              {
                label: 'Docs & Notes',
                to: '/docs/intro',
              },
            ],
          },
          // Add other footer links as needed
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Your Name or Org. Built with Docusaurus.`,
      },
      // Prism syntax highlighting for code blocks (useful for notes with code)
      prism: {
        theme: require('prism-react-renderer').themes.github,
        darkTheme: require('prism-react-renderer').themes.dracula,
      },
    }),
};
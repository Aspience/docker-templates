Simple Figma MCP server based on the [figma-mcp](https://github.com/paulvandermeijs/figma-mcp) by [paulvandermeijs](https://github.com/paulvandermeijs/)

# Setup
1. Clone `.env.example` file and rename to `.env`
2. Pass Figma Personal Access Token to it `FIGMA_TOKEN`

# Hints

### Get file key from URL
Example:
`https://www.figma.com/design/ANryptvHthbfthrtAscOd/Project?node-id=52-11455`

File key:
`ANryptvHthbfthrtAscOd`

# Available tools:

Enter commands directly into the assistant using slash.

- `/help:` Help: How to use this Figma file MCP server

- `/parse_figma_url`: Parse a Figma URL to extract IDs and determine the URL type

- `/get_file`: Get file contents from a Figma file using file key

- `/export_images`: Export images from a Figma file using file key

- `/get_file_nodes`: Get specific nodes from a file using file key

# Windows

### Webstorm

1. Build container:
   ```shell
   docker compose up --build
   ```
2. Create MCP Server: Preferences → Tools → AI Assistant → Model Context Protocol (MCP)
3. Add command
   ```shell
   docker.exe compose --project-directory "{AbsolutePath}\figma-mcp" run --rm -T figma-mcp
   ```
4. Enable Created MCP Server via checkbox
5. Click "Apply"

# Wedding Planner MCP Server

An MCP (Model Context Protocol) server for managing wedding planning data in Supabase.

## Features

This server provides tools for:

- **Weddings**: List, get, create, update weddings
- **Guests**: Full CRUD + bulk create, filtering by status/side/category
- **Events**: Manage wedding events (Mehendi, Sangeet, Reception, etc.)
- **Tasks**: Create and track wedding planning tasks with priorities
- **Budget**: Track budget items with costs and payment status
- **RSVPs**: Record and update guest RSVPs for events
- **Statistics**: Get comprehensive wedding stats (guests, budget, tasks)

## Installation

```bash
npm install
npm run build
```

## Configuration

The server uses these environment variables (with defaults for your Supabase instance):

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anon key

## Usage with Claude Code

Add this to your Claude Code MCP settings (`~/.claude.json` or project `.claude/settings.local.json`):

```json
{
  "mcpServers": {
    "wedding-planner": {
      "command": "node",
      "args": ["/path/to/wedding-planner-mcp-server/dist/index.js"],
      "env": {
        "SUPABASE_URL": "https://pahtrfafjjbaxschhtdr.supabase.co",
        "SUPABASE_ANON_KEY": "your-anon-key"
      }
    }
  }
}
```

## Available Tools

### Wedding Management
- `wedding_list` - List all weddings
- `wedding_get` - Get wedding details by ID
- `wedding_create` - Create a new wedding
- `wedding_update` - Update wedding details

### Guest Management
- `guest_list` - List guests with filtering
- `guest_get` - Get guest details
- `guest_create` - Add a guest
- `guest_update` - Update guest info
- `guest_delete` - Remove a guest
- `guest_bulk_create` - Add multiple guests at once

### Event Management
- `event_list` - List wedding events
- `event_get` - Get event details
- `event_create` - Create an event
- `event_update` - Update event details
- `event_delete` - Remove an event

### Task Management
- `task_list` - List tasks with filtering
- `task_get` - Get task details
- `task_create` - Create a task
- `task_update` - Update task
- `task_complete` - Mark task as completed
- `task_delete` - Remove a task

### Budget Management
- `budget_list` - List budget items with totals
- `budget_get` - Get budget item details
- `budget_create` - Add a budget item
- `budget_update` - Update budget item
- `budget_delete` - Remove a budget item

### RSVP Management
- `rsvp_list` - List RSVPs by event or guest
- `rsvp_create` - Record an RSVP
- `rsvp_update` - Update an RSVP

### Statistics
- `wedding_stats` - Get comprehensive wedding statistics

## Development

```bash
# Development with auto-reload
npm run dev

# Build for production
npm run build

# Run the server
npm start
```

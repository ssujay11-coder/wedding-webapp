#!/usr/bin/env node
/**
 * Wedding Planner MCP Server
 *
 * This server provides tools to interact with a Wedding Planner Supabase database,
 * enabling CRUD operations for weddings, guests, events, tasks, budget items, and RSVPs.
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
// ============================================================================
// Configuration
// ============================================================================
const SUPABASE_URL = process.env.SUPABASE_URL || "https://pahtrfafjjbaxschhtdr.supabase.co";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhaHRyZmFmampiYXhzY2hodGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyNjk5NDksImV4cCI6MjA4Mjg0NTk0OX0.XIFVaysJoUxjyTPPeyODt549np_uc0sNqeis72076Ic";
const CHARACTER_LIMIT = 25000;
// ============================================================================
// Supabase Client
// ============================================================================
let supabase;
function getSupabaseClient() {
    if (!supabase) {
        supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return supabase;
}
// ============================================================================
// Error Handling
// ============================================================================
function handleError(error) {
    if (error instanceof Error) {
        return `Error: ${error.message}`;
    }
    return `Error: ${String(error)}`;
}
function formatResponse(data, truncate = false) {
    let result = JSON.stringify(data, null, 2);
    if (truncate && result.length > CHARACTER_LIMIT) {
        return JSON.stringify({
            ...data,
            _truncated: true,
            _message: `Response truncated. Use pagination (limit/offset) to retrieve more results.`
        }, null, 2);
    }
    return result;
}
// ============================================================================
// Zod Schemas
// ============================================================================
// Common schemas
const PaginationSchema = z.object({
    limit: z.number().int().min(1).max(100).default(20).describe("Maximum results to return"),
    offset: z.number().int().min(0).default(0).describe("Number of results to skip")
}).strict();
const UUIDSchema = z.string().uuid().describe("UUID identifier");
// Wedding schemas
const WeddingCreateSchema = z.object({
    bride_name: z.string().min(1).describe("Bride's name"),
    groom_name: z.string().min(1).describe("Groom's name"),
    wedding_date: z.string().optional().describe("Wedding date (YYYY-MM-DD)"),
    primary_city: z.string().optional().describe("Primary city for the wedding"),
    primary_venue: z.string().optional().describe("Primary venue name"),
    estimated_guests: z.number().int().optional().describe("Estimated number of guests"),
    total_budget: z.number().optional().describe("Total budget amount"),
    currency: z.string().default("INR").describe("Currency code"),
    wedding_style: z.string().optional().describe("Wedding style (Traditional, Modern, etc.)"),
    theme: z.string().optional().describe("Wedding theme"),
    notes: z.string().optional().describe("Additional notes")
}).strict();
const WeddingUpdateSchema = z.object({
    id: UUIDSchema.describe("Wedding ID to update"),
    bride_name: z.string().optional().describe("Bride's name"),
    groom_name: z.string().optional().describe("Groom's name"),
    wedding_date: z.string().optional().describe("Wedding date (YYYY-MM-DD)"),
    primary_city: z.string().optional().describe("Primary city"),
    primary_venue: z.string().optional().describe("Primary venue"),
    estimated_guests: z.number().int().optional().describe("Estimated guests"),
    total_budget: z.number().optional().describe("Total budget"),
    planning_status: z.enum(["planning", "booked", "in_progress", "completed", "cancelled"]).optional().describe("Planning status"),
    notes: z.string().optional().describe("Notes")
}).strict();
// Guest schemas
const GuestCreateSchema = z.object({
    wedding_id: UUIDSchema.describe("Wedding ID"),
    first_name: z.string().min(1).describe("Guest's first name"),
    last_name: z.string().optional().describe("Guest's last name"),
    email: z.string().email().optional().describe("Guest's email"),
    phone: z.string().optional().describe("Guest's phone number"),
    side: z.enum(["bride", "groom", "mutual", "planner"]).optional().describe("Which side the guest is from"),
    relationship: z.string().optional().describe("Relationship to couple"),
    category: z.enum(["family", "close_family", "friends", "colleagues", "vip", "vendor", "other"]).optional().describe("Guest category"),
    has_plus_one: z.boolean().default(false).describe("Whether guest has a plus one"),
    plus_one_name: z.string().optional().describe("Plus one's name"),
    dietary_restrictions: z.array(z.string()).optional().describe("Dietary restrictions"),
    notes: z.string().optional().describe("Additional notes")
}).strict();
const GuestUpdateSchema = z.object({
    id: UUIDSchema.describe("Guest ID to update"),
    first_name: z.string().optional().describe("First name"),
    last_name: z.string().optional().describe("Last name"),
    email: z.string().email().optional().describe("Email"),
    phone: z.string().optional().describe("Phone"),
    side: z.enum(["bride", "groom", "mutual", "planner"]).optional().describe("Side"),
    status: z.enum(["pending", "invited", "confirmed", "declined", "maybe", "no_response"]).optional().describe("RSVP status"),
    has_plus_one: z.boolean().optional().describe("Has plus one"),
    plus_one_name: z.string().optional().describe("Plus one name"),
    table_number: z.number().int().optional().describe("Table number"),
    notes: z.string().optional().describe("Notes")
}).strict();
const GuestListSchema = PaginationSchema.extend({
    wedding_id: UUIDSchema.describe("Wedding ID"),
    status: z.enum(["pending", "invited", "confirmed", "declined", "maybe", "no_response"]).optional().describe("Filter by status"),
    side: z.enum(["bride", "groom", "mutual", "planner"]).optional().describe("Filter by side"),
    category: z.enum(["family", "close_family", "friends", "colleagues", "vip", "vendor", "other"]).optional().describe("Filter by category")
}).strict();
// Event schemas
const EventCreateSchema = z.object({
    wedding_id: UUIDSchema.describe("Wedding ID"),
    name: z.string().min(1).describe("Event name"),
    event_type: z.enum([
        "engagement", "roka", "sagai", "tilak", "mehendi", "haldi", "sangeet", "cocktail",
        "wedding", "pheras", "reception", "vidaai", "welcome_dinner", "farewell_brunch",
        "after_party", "other"
    ]).describe("Type of event"),
    event_date: z.string().describe("Event date (YYYY-MM-DD)"),
    start_time: z.string().optional().describe("Start time (HH:MM)"),
    end_time: z.string().optional().describe("End time (HH:MM)"),
    venue_name: z.string().optional().describe("Venue name"),
    venue_address: z.string().optional().describe("Venue address"),
    venue_city: z.string().optional().describe("Venue city"),
    dress_code: z.string().optional().describe("Dress code"),
    estimated_guests: z.number().int().optional().describe("Expected guests"),
    description: z.string().optional().describe("Event description")
}).strict();
const EventUpdateSchema = z.object({
    id: UUIDSchema.describe("Event ID to update"),
    name: z.string().optional().describe("Event name"),
    event_type: z.enum([
        "engagement", "roka", "sagai", "tilak", "mehendi", "haldi", "sangeet", "cocktail",
        "wedding", "pheras", "reception", "vidaai", "welcome_dinner", "farewell_brunch",
        "after_party", "other"
    ]).optional().describe("Event type"),
    event_date: z.string().optional().describe("Event date"),
    start_time: z.string().optional().describe("Start time"),
    end_time: z.string().optional().describe("End time"),
    venue_name: z.string().optional().describe("Venue name"),
    venue_city: z.string().optional().describe("Venue city"),
    dress_code: z.string().optional().describe("Dress code"),
    estimated_guests: z.number().int().optional().describe("Expected guests"),
    description: z.string().optional().describe("Description")
}).strict();
// Task schemas
const TaskCreateSchema = z.object({
    wedding_id: UUIDSchema.describe("Wedding ID"),
    title: z.string().min(1).describe("Task title"),
    description: z.string().optional().describe("Task description"),
    category: z.string().optional().describe("Task category (Venue, Vendors, Attire, etc.)"),
    due_date: z.string().optional().describe("Due date (YYYY-MM-DD)"),
    priority: z.enum(["low", "medium", "high", "urgent"]).default("medium").describe("Task priority"),
    assigned_to_name: z.string().optional().describe("Name of person assigned"),
    notes: z.string().optional().describe("Additional notes")
}).strict();
const TaskUpdateSchema = z.object({
    id: UUIDSchema.describe("Task ID to update"),
    title: z.string().optional().describe("Task title"),
    description: z.string().optional().describe("Description"),
    status: z.enum(["pending", "in_progress", "completed", "skipped", "overdue"]).optional().describe("Task status"),
    priority: z.enum(["low", "medium", "high", "urgent"]).optional().describe("Priority"),
    due_date: z.string().optional().describe("Due date"),
    notes: z.string().optional().describe("Notes")
}).strict();
const TaskListSchema = PaginationSchema.extend({
    wedding_id: UUIDSchema.describe("Wedding ID"),
    status: z.enum(["pending", "in_progress", "completed", "skipped", "overdue"]).optional().describe("Filter by status"),
    priority: z.enum(["low", "medium", "high", "urgent"]).optional().describe("Filter by priority"),
    category: z.string().optional().describe("Filter by category")
}).strict();
// Budget Item schemas
const BudgetItemCreateSchema = z.object({
    wedding_id: UUIDSchema.describe("Wedding ID"),
    name: z.string().min(1).describe("Budget item name"),
    description: z.string().optional().describe("Item description"),
    estimated_cost: z.number().describe("Estimated cost"),
    actual_cost: z.number().optional().describe("Actual cost (if known)"),
    currency: z.string().default("INR").describe("Currency code"),
    is_priority: z.boolean().default(false).describe("Is this a priority item"),
    notes: z.string().optional().describe("Additional notes")
}).strict();
const BudgetItemUpdateSchema = z.object({
    id: UUIDSchema.describe("Budget item ID to update"),
    name: z.string().optional().describe("Item name"),
    estimated_cost: z.number().optional().describe("Estimated cost"),
    actual_cost: z.number().optional().describe("Actual cost"),
    amount_paid: z.number().optional().describe("Amount paid so far"),
    payment_status: z.enum(["pending", "partial", "paid"]).optional().describe("Payment status"),
    is_booked: z.boolean().optional().describe("Is the item booked"),
    notes: z.string().optional().describe("Notes")
}).strict();
// RSVP schemas
const RSVPCreateSchema = z.object({
    guest_id: UUIDSchema.describe("Guest ID"),
    event_id: UUIDSchema.describe("Event ID"),
    response: z.enum(["attending", "not_attending", "maybe", "pending"]).describe("RSVP response"),
    plus_one_attending: z.boolean().default(false).describe("Is plus one attending"),
    meal_choice: z.string().optional().describe("Meal choice"),
    dietary_notes: z.string().optional().describe("Dietary notes"),
    guest_message: z.string().optional().describe("Message from guest")
}).strict();
const RSVPUpdateSchema = z.object({
    id: UUIDSchema.describe("RSVP ID to update"),
    response: z.enum(["attending", "not_attending", "maybe", "pending"]).optional().describe("Response"),
    plus_one_attending: z.boolean().optional().describe("Plus one attending"),
    meal_choice: z.string().optional().describe("Meal choice"),
    dietary_notes: z.string().optional().describe("Dietary notes")
}).strict();
// ============================================================================
// Create MCP Server
// ============================================================================
const server = new McpServer({
    name: "wedding-planner-mcp-server",
    version: "1.0.0"
});
// ============================================================================
// Wedding Tools
// ============================================================================
server.registerTool("wedding_list", {
    title: "List Weddings",
    description: `List all weddings in the system with optional pagination.

Returns an array of wedding records with basic information including bride/groom names, dates, status, and budget info.

Args:
  - limit (number): Maximum results (1-100, default: 20)
  - offset (number): Number to skip for pagination (default: 0)

Returns:
  Array of wedding objects with id, bride_name, groom_name, wedding_date, planning_status, etc.`,
    inputSchema: PaginationSchema,
    annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("weddings")
            .select("*")
            .order("created_at", { ascending: false })
            .range(params.offset, params.offset + params.limit - 1);
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse({ weddings: data, count: data?.length || 0 }) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
server.registerTool("wedding_get", {
    title: "Get Wedding Details",
    description: `Get detailed information about a specific wedding by ID.

Args:
  - id (string): Wedding UUID

Returns:
  Complete wedding object with all fields.`,
    inputSchema: z.object({ id: UUIDSchema }).strict(),
    annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("weddings")
            .select("*")
            .eq("id", params.id)
            .single();
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse(data) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
server.registerTool("wedding_create", {
    title: "Create Wedding",
    description: `Create a new wedding record.

Args:
  - bride_name (string, required): Bride's name
  - groom_name (string, required): Groom's name
  - wedding_date (string, optional): Date in YYYY-MM-DD format
  - primary_city (string, optional): Wedding city
  - primary_venue (string, optional): Venue name
  - estimated_guests (number, optional): Expected guest count
  - total_budget (number, optional): Total budget
  - currency (string, default: "INR"): Currency code
  - wedding_style (string, optional): Style (Traditional, Modern, Fusion, etc.)
  - notes (string, optional): Additional notes

Returns:
  The created wedding object with generated ID.`,
    inputSchema: WeddingCreateSchema,
    annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("weddings")
            .insert(params)
            .select()
            .single();
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse({ message: "Wedding created successfully", wedding: data }) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
server.registerTool("wedding_update", {
    title: "Update Wedding",
    description: `Update an existing wedding record.

Args:
  - id (string, required): Wedding UUID to update
  - [any wedding field]: Fields to update

Returns:
  The updated wedding object.`,
    inputSchema: WeddingUpdateSchema,
    annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const { id, ...updateData } = params;
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("weddings")
            .update(updateData)
            .eq("id", id)
            .select()
            .single();
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse({ message: "Wedding updated successfully", wedding: data }) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
// ============================================================================
// Guest Tools
// ============================================================================
server.registerTool("guest_list", {
    title: "List Guests",
    description: `List guests for a specific wedding with filtering options.

Args:
  - wedding_id (string, required): Wedding UUID
  - status (string, optional): Filter by RSVP status
  - side (string, optional): Filter by side (bride/groom/mutual)
  - category (string, optional): Filter by category
  - limit (number): Max results (default: 20)
  - offset (number): Pagination offset

Returns:
  Array of guest records.`,
    inputSchema: GuestListSchema,
    annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const client = getSupabaseClient();
        let query = client
            .from("guests")
            .select("*")
            .eq("wedding_id", params.wedding_id)
            .order("created_at", { ascending: false });
        if (params.status)
            query = query.eq("status", params.status);
        if (params.side)
            query = query.eq("side", params.side);
        if (params.category)
            query = query.eq("category", params.category);
        const { data, error } = await query.range(params.offset, params.offset + params.limit - 1);
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse({ guests: data, count: data?.length || 0 }, true) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
server.registerTool("guest_get", {
    title: "Get Guest Details",
    description: `Get detailed information about a specific guest.

Args:
  - id (string): Guest UUID

Returns:
  Complete guest object with all fields.`,
    inputSchema: z.object({ id: UUIDSchema }).strict(),
    annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("guests")
            .select("*")
            .eq("id", params.id)
            .single();
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse(data) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
server.registerTool("guest_create", {
    title: "Create Guest",
    description: `Add a new guest to a wedding.

Args:
  - wedding_id (string, required): Wedding UUID
  - first_name (string, required): Guest's first name
  - last_name (string, optional): Last name
  - email (string, optional): Email address
  - phone (string, optional): Phone number
  - side (string, optional): bride/groom/mutual/planner
  - relationship (string, optional): Relationship to couple
  - category (string, optional): family/friends/colleagues/vip/etc.
  - has_plus_one (boolean, default: false): Has plus one
  - plus_one_name (string, optional): Plus one's name
  - dietary_restrictions (array, optional): List of restrictions
  - notes (string, optional): Notes

Returns:
  The created guest object.`,
    inputSchema: GuestCreateSchema,
    annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("guests")
            .insert(params)
            .select()
            .single();
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse({ message: "Guest added successfully", guest: data }) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
server.registerTool("guest_update", {
    title: "Update Guest",
    description: `Update an existing guest record.

Args:
  - id (string, required): Guest UUID
  - [any guest field]: Fields to update

Returns:
  The updated guest object.`,
    inputSchema: GuestUpdateSchema,
    annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const { id, ...updateData } = params;
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("guests")
            .update(updateData)
            .eq("id", id)
            .select()
            .single();
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse({ message: "Guest updated successfully", guest: data }) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
server.registerTool("guest_delete", {
    title: "Delete Guest",
    description: `Remove a guest from the wedding.

Args:
  - id (string): Guest UUID to delete

Returns:
  Confirmation message.`,
    inputSchema: z.object({ id: UUIDSchema }).strict(),
    annotations: {
        readOnlyHint: false,
        destructiveHint: true,
        idempotentHint: true,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const client = getSupabaseClient();
        const { error } = await client
            .from("guests")
            .delete()
            .eq("id", params.id);
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse({ message: "Guest deleted successfully", id: params.id }) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
server.registerTool("guest_bulk_create", {
    title: "Bulk Create Guests",
    description: `Add multiple guests at once.

Args:
  - wedding_id (string, required): Wedding UUID
  - guests (array, required): Array of guest objects with first_name (required), and optional: last_name, email, phone, side, category

Returns:
  Array of created guest objects.`,
    inputSchema: z.object({
        wedding_id: UUIDSchema,
        guests: z.array(z.object({
            first_name: z.string().min(1),
            last_name: z.string().optional(),
            email: z.string().email().optional(),
            phone: z.string().optional(),
            side: z.enum(["bride", "groom", "mutual", "planner"]).optional(),
            category: z.enum(["family", "close_family", "friends", "colleagues", "vip", "vendor", "other"]).optional()
        })).min(1)
    }).strict(),
    annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const client = getSupabaseClient();
        const guestsWithWeddingId = params.guests.map(g => ({ ...g, wedding_id: params.wedding_id }));
        const { data, error } = await client
            .from("guests")
            .insert(guestsWithWeddingId)
            .select();
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse({ message: `${data?.length} guests added successfully`, guests: data }) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
// ============================================================================
// Event Tools
// ============================================================================
server.registerTool("event_list", {
    title: "List Events",
    description: `List all events for a specific wedding.

Args:
  - wedding_id (string, required): Wedding UUID
  - limit (number): Max results
  - offset (number): Pagination offset

Returns:
  Array of wedding events ordered by date.`,
    inputSchema: PaginationSchema.extend({
        wedding_id: UUIDSchema
    }).strict(),
    annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("wedding_events")
            .select("*")
            .eq("wedding_id", params.wedding_id)
            .order("event_date", { ascending: true })
            .order("start_time", { ascending: true })
            .range(params.offset, params.offset + params.limit - 1);
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse({ events: data, count: data?.length || 0 }) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
server.registerTool("event_get", {
    title: "Get Event Details",
    description: `Get detailed information about a specific event.

Args:
  - id (string): Event UUID

Returns:
  Complete event object.`,
    inputSchema: z.object({ id: UUIDSchema }).strict(),
    annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("wedding_events")
            .select("*")
            .eq("id", params.id)
            .single();
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse(data) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
server.registerTool("event_create", {
    title: "Create Event",
    description: `Create a new wedding event (Mehendi, Sangeet, Reception, etc.).

Args:
  - wedding_id (string, required): Wedding UUID
  - name (string, required): Event name
  - event_type (string, required): Type (mehendi, sangeet, wedding, reception, etc.)
  - event_date (string, required): Date in YYYY-MM-DD format
  - start_time (string, optional): HH:MM format
  - end_time (string, optional): HH:MM format
  - venue_name (string, optional): Venue name
  - venue_address (string, optional): Full address
  - venue_city (string, optional): City
  - dress_code (string, optional): Dress code
  - estimated_guests (number, optional): Expected guests
  - description (string, optional): Description

Returns:
  The created event object.`,
    inputSchema: EventCreateSchema,
    annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("wedding_events")
            .insert(params)
            .select()
            .single();
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse({ message: "Event created successfully", event: data }) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
server.registerTool("event_update", {
    title: "Update Event",
    description: `Update an existing wedding event.

Args:
  - id (string, required): Event UUID
  - [any event field]: Fields to update

Returns:
  The updated event object.`,
    inputSchema: EventUpdateSchema,
    annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const { id, ...updateData } = params;
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("wedding_events")
            .update(updateData)
            .eq("id", id)
            .select()
            .single();
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse({ message: "Event updated successfully", event: data }) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
server.registerTool("event_delete", {
    title: "Delete Event",
    description: `Remove an event from the wedding.

Args:
  - id (string): Event UUID to delete

Returns:
  Confirmation message.`,
    inputSchema: z.object({ id: UUIDSchema }).strict(),
    annotations: {
        readOnlyHint: false,
        destructiveHint: true,
        idempotentHint: true,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const client = getSupabaseClient();
        const { error } = await client
            .from("wedding_events")
            .delete()
            .eq("id", params.id);
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse({ message: "Event deleted successfully", id: params.id }) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
// ============================================================================
// Task Tools
// ============================================================================
server.registerTool("task_list", {
    title: "List Tasks",
    description: `List tasks for a specific wedding with filtering options.

Args:
  - wedding_id (string, required): Wedding UUID
  - status (string, optional): Filter by status (pending, in_progress, completed, etc.)
  - priority (string, optional): Filter by priority (low, medium, high, urgent)
  - category (string, optional): Filter by category
  - limit (number): Max results
  - offset (number): Pagination offset

Returns:
  Array of task records.`,
    inputSchema: TaskListSchema,
    annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const client = getSupabaseClient();
        let query = client
            .from("tasks")
            .select("*")
            .eq("wedding_id", params.wedding_id)
            .order("due_date", { ascending: true, nullsFirst: false })
            .order("priority", { ascending: false });
        if (params.status)
            query = query.eq("status", params.status);
        if (params.priority)
            query = query.eq("priority", params.priority);
        if (params.category)
            query = query.eq("category", params.category);
        const { data, error } = await query.range(params.offset, params.offset + params.limit - 1);
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse({ tasks: data, count: data?.length || 0 }) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
server.registerTool("task_get", {
    title: "Get Task Details",
    description: `Get detailed information about a specific task.

Args:
  - id (string): Task UUID

Returns:
  Complete task object.`,
    inputSchema: z.object({ id: UUIDSchema }).strict(),
    annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("tasks")
            .select("*")
            .eq("id", params.id)
            .single();
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse(data) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
server.registerTool("task_create", {
    title: "Create Task",
    description: `Create a new task for wedding planning.

Args:
  - wedding_id (string, required): Wedding UUID
  - title (string, required): Task title
  - description (string, optional): Detailed description
  - category (string, optional): Category (Venue, Vendors, Attire, etc.)
  - due_date (string, optional): Due date YYYY-MM-DD
  - priority (string, default: "medium"): low/medium/high/urgent
  - assigned_to_name (string, optional): Person assigned
  - notes (string, optional): Additional notes

Returns:
  The created task object.`,
    inputSchema: TaskCreateSchema,
    annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("tasks")
            .insert(params)
            .select()
            .single();
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse({ message: "Task created successfully", task: data }) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
server.registerTool("task_update", {
    title: "Update Task",
    description: `Update an existing task.

Args:
  - id (string, required): Task UUID
  - [any task field]: Fields to update

Returns:
  The updated task object.`,
    inputSchema: TaskUpdateSchema,
    annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const { id, ...updateData } = params;
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("tasks")
            .update(updateData)
            .eq("id", id)
            .select()
            .single();
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse({ message: "Task updated successfully", task: data }) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
server.registerTool("task_complete", {
    title: "Complete Task",
    description: `Mark a task as completed.

Args:
  - id (string): Task UUID

Returns:
  The updated task object with completed status.`,
    inputSchema: z.object({ id: UUIDSchema }).strict(),
    annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("tasks")
            .update({
            status: "completed",
            completed_at: new Date().toISOString()
        })
            .eq("id", params.id)
            .select()
            .single();
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse({ message: "Task marked as completed", task: data }) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
server.registerTool("task_delete", {
    title: "Delete Task",
    description: `Remove a task.

Args:
  - id (string): Task UUID to delete

Returns:
  Confirmation message.`,
    inputSchema: z.object({ id: UUIDSchema }).strict(),
    annotations: {
        readOnlyHint: false,
        destructiveHint: true,
        idempotentHint: true,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const client = getSupabaseClient();
        const { error } = await client
            .from("tasks")
            .delete()
            .eq("id", params.id);
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse({ message: "Task deleted successfully", id: params.id }) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
// ============================================================================
// Budget Item Tools
// ============================================================================
server.registerTool("budget_list", {
    title: "List Budget Items",
    description: `List all budget items for a specific wedding.

Args:
  - wedding_id (string, required): Wedding UUID
  - limit (number): Max results
  - offset (number): Pagination offset

Returns:
  Array of budget items with costs and payment status.`,
    inputSchema: PaginationSchema.extend({
        wedding_id: UUIDSchema
    }).strict(),
    annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("budget_items")
            .select("*")
            .eq("wedding_id", params.wedding_id)
            .order("created_at", { ascending: false })
            .range(params.offset, params.offset + params.limit - 1);
        if (error)
            throw error;
        // Calculate totals
        const totalEstimated = data?.reduce((sum, item) => sum + (item.estimated_cost || 0), 0) || 0;
        const totalActual = data?.reduce((sum, item) => sum + (item.actual_cost || 0), 0) || 0;
        const totalPaid = data?.reduce((sum, item) => sum + (item.amount_paid || 0), 0) || 0;
        return {
            content: [{ type: "text", text: formatResponse({
                        budget_items: data,
                        count: data?.length || 0,
                        summary: {
                            total_estimated: totalEstimated,
                            total_actual: totalActual,
                            total_paid: totalPaid,
                            remaining: totalEstimated - totalPaid
                        }
                    }) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
server.registerTool("budget_get", {
    title: "Get Budget Item",
    description: `Get detailed information about a specific budget item.

Args:
  - id (string): Budget item UUID

Returns:
  Complete budget item object.`,
    inputSchema: z.object({ id: UUIDSchema }).strict(),
    annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("budget_items")
            .select("*")
            .eq("id", params.id)
            .single();
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse(data) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
server.registerTool("budget_create", {
    title: "Create Budget Item",
    description: `Add a new budget item.

Args:
  - wedding_id (string, required): Wedding UUID
  - name (string, required): Item name
  - description (string, optional): Description
  - estimated_cost (number, required): Estimated cost
  - actual_cost (number, optional): Actual cost if known
  - currency (string, default: "INR"): Currency code
  - is_priority (boolean, default: false): Priority item
  - notes (string, optional): Notes

Returns:
  The created budget item.`,
    inputSchema: BudgetItemCreateSchema,
    annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("budget_items")
            .insert(params)
            .select()
            .single();
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse({ message: "Budget item created successfully", budget_item: data }) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
server.registerTool("budget_update", {
    title: "Update Budget Item",
    description: `Update an existing budget item.

Args:
  - id (string, required): Budget item UUID
  - [any budget field]: Fields to update

Returns:
  The updated budget item.`,
    inputSchema: BudgetItemUpdateSchema,
    annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const { id, ...updateData } = params;
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("budget_items")
            .update(updateData)
            .eq("id", id)
            .select()
            .single();
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse({ message: "Budget item updated successfully", budget_item: data }) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
server.registerTool("budget_delete", {
    title: "Delete Budget Item",
    description: `Remove a budget item.

Args:
  - id (string): Budget item UUID to delete

Returns:
  Confirmation message.`,
    inputSchema: z.object({ id: UUIDSchema }).strict(),
    annotations: {
        readOnlyHint: false,
        destructiveHint: true,
        idempotentHint: true,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const client = getSupabaseClient();
        const { error } = await client
            .from("budget_items")
            .delete()
            .eq("id", params.id);
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse({ message: "Budget item deleted successfully", id: params.id }) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
// ============================================================================
// RSVP Tools
// ============================================================================
server.registerTool("rsvp_list", {
    title: "List RSVPs",
    description: `List RSVPs for a specific event or guest.

Args:
  - event_id (string, optional): Filter by event UUID
  - guest_id (string, optional): Filter by guest UUID
  - response (string, optional): Filter by response (attending, not_attending, maybe, pending)
  - limit (number): Max results
  - offset (number): Pagination offset

At least one of event_id or guest_id must be provided.

Returns:
  Array of RSVP records.`,
    inputSchema: PaginationSchema.extend({
        event_id: UUIDSchema.optional(),
        guest_id: UUIDSchema.optional(),
        response: z.enum(["attending", "not_attending", "maybe", "pending"]).optional()
    }).strict(),
    annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
    }
}, async (params) => {
    try {
        if (!params.event_id && !params.guest_id) {
            return {
                content: [{ type: "text", text: "Error: At least one of event_id or guest_id must be provided" }]
            };
        }
        const client = getSupabaseClient();
        let query = client
            .from("rsvps")
            .select("*")
            .order("created_at", { ascending: false });
        if (params.event_id)
            query = query.eq("event_id", params.event_id);
        if (params.guest_id)
            query = query.eq("guest_id", params.guest_id);
        if (params.response)
            query = query.eq("response", params.response);
        const { data, error } = await query.range(params.offset, params.offset + params.limit - 1);
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse({ rsvps: data, count: data?.length || 0 }) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
server.registerTool("rsvp_create", {
    title: "Create RSVP",
    description: `Record an RSVP for a guest to an event.

Args:
  - guest_id (string, required): Guest UUID
  - event_id (string, required): Event UUID
  - response (string, required): attending/not_attending/maybe/pending
  - plus_one_attending (boolean, default: false): Is plus one attending
  - meal_choice (string, optional): Meal preference
  - dietary_notes (string, optional): Dietary notes
  - guest_message (string, optional): Message from guest

Returns:
  The created RSVP record.`,
    inputSchema: RSVPCreateSchema,
    annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("rsvps")
            .insert({
            ...params,
            responded_at: new Date().toISOString()
        })
            .select()
            .single();
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse({ message: "RSVP recorded successfully", rsvp: data }) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
server.registerTool("rsvp_update", {
    title: "Update RSVP",
    description: `Update an existing RSVP.

Args:
  - id (string, required): RSVP UUID
  - [any rsvp field]: Fields to update

Returns:
  The updated RSVP record.`,
    inputSchema: RSVPUpdateSchema,
    annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const { id, ...updateData } = params;
        const client = getSupabaseClient();
        const { data, error } = await client
            .from("rsvps")
            .update({
            ...updateData,
            responded_at: new Date().toISOString()
        })
            .eq("id", id)
            .select()
            .single();
        if (error)
            throw error;
        return {
            content: [{ type: "text", text: formatResponse({ message: "RSVP updated successfully", rsvp: data }) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
// ============================================================================
// Summary/Stats Tools
// ============================================================================
server.registerTool("wedding_stats", {
    title: "Get Wedding Statistics",
    description: `Get comprehensive statistics for a wedding including guest counts, budget summary, and task progress.

Args:
  - wedding_id (string, required): Wedding UUID

Returns:
  Statistics object with guest counts, budget totals, task progress, and event counts.`,
    inputSchema: z.object({
        wedding_id: UUIDSchema
    }).strict(),
    annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false
    }
}, async (params) => {
    try {
        const client = getSupabaseClient();
        // Get guests stats
        const { data: guests } = await client
            .from("guests")
            .select("status")
            .eq("wedding_id", params.wedding_id);
        const guestStats = {
            total: guests?.length || 0,
            confirmed: guests?.filter(g => g.status === "confirmed").length || 0,
            pending: guests?.filter(g => g.status === "pending").length || 0,
            declined: guests?.filter(g => g.status === "declined").length || 0
        };
        // Get budget stats
        const { data: budgetItems } = await client
            .from("budget_items")
            .select("estimated_cost, actual_cost, amount_paid")
            .eq("wedding_id", params.wedding_id);
        const budgetStats = {
            total_estimated: budgetItems?.reduce((sum, i) => sum + (i.estimated_cost || 0), 0) || 0,
            total_actual: budgetItems?.reduce((sum, i) => sum + (i.actual_cost || 0), 0) || 0,
            total_paid: budgetItems?.reduce((sum, i) => sum + (i.amount_paid || 0), 0) || 0
        };
        // Get task stats
        const { data: tasks } = await client
            .from("tasks")
            .select("status")
            .eq("wedding_id", params.wedding_id);
        const taskStats = {
            total: tasks?.length || 0,
            completed: tasks?.filter(t => t.status === "completed").length || 0,
            pending: tasks?.filter(t => t.status === "pending").length || 0,
            in_progress: tasks?.filter(t => t.status === "in_progress").length || 0
        };
        // Get events count
        const { count: eventCount } = await client
            .from("wedding_events")
            .select("*", { count: "exact", head: true })
            .eq("wedding_id", params.wedding_id);
        return {
            content: [{ type: "text", text: formatResponse({
                        wedding_id: params.wedding_id,
                        guests: guestStats,
                        budget: budgetStats,
                        tasks: taskStats,
                        events_count: eventCount || 0
                    }) }]
        };
    }
    catch (error) {
        return { content: [{ type: "text", text: handleError(error) }] };
    }
});
// ============================================================================
// Main Entry Point
// ============================================================================
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Wedding Planner MCP Server running via stdio");
}
main().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map
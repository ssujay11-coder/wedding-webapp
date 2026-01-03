export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          role: 'couple' | 'planner' | 'admin'
          company_name: string | null
          company_logo: string | null
          bio: string | null
          website: string | null
          is_verified: boolean
          onboarding_completed: boolean
          preferences: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          role?: 'couple' | 'planner' | 'admin'
          company_name?: string | null
          company_logo?: string | null
          bio?: string | null
          website?: string | null
          is_verified?: boolean
          onboarding_completed?: boolean
          preferences?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          role?: 'couple' | 'planner' | 'admin'
          company_name?: string | null
          company_logo?: string | null
          bio?: string | null
          website?: string | null
          is_verified?: boolean
          onboarding_completed?: boolean
          preferences?: Json
          created_at?: string
          updated_at?: string
        }
      }
      weddings: {
        Row: {
          id: string
          bride_name: string
          groom_name: string
          wedding_date: string | null
          wedding_end_date: string | null
          primary_city: string | null
          primary_venue: string | null
          destination_type: 'local' | 'destination' | 'international' | null
          estimated_guests: number | null
          wedding_style: string | null
          color_palette: string[] | null
          theme: string | null
          total_budget: number | null
          currency: string
          planning_status: 'planning' | 'booked' | 'in_progress' | 'completed' | 'cancelled'
          website_slug: string | null
          website_enabled: boolean
          website_password: string | null
          created_by: string | null
          planner_id: string | null
          notes: string | null
          tags: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          bride_name: string
          groom_name: string
          wedding_date?: string | null
          wedding_end_date?: string | null
          primary_city?: string | null
          primary_venue?: string | null
          destination_type?: 'local' | 'destination' | 'international' | null
          estimated_guests?: number | null
          wedding_style?: string | null
          color_palette?: string[] | null
          theme?: string | null
          total_budget?: number | null
          currency?: string
          planning_status?: 'planning' | 'booked' | 'in_progress' | 'completed' | 'cancelled'
          website_slug?: string | null
          website_enabled?: boolean
          website_password?: string | null
          created_by?: string | null
          planner_id?: string | null
          notes?: string | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          bride_name?: string
          groom_name?: string
          wedding_date?: string | null
          wedding_end_date?: string | null
          primary_city?: string | null
          primary_venue?: string | null
          destination_type?: 'local' | 'destination' | 'international' | null
          estimated_guests?: number | null
          wedding_style?: string | null
          color_palette?: string[] | null
          theme?: string | null
          total_budget?: number | null
          currency?: string
          planning_status?: 'planning' | 'booked' | 'in_progress' | 'completed' | 'cancelled'
          website_slug?: string | null
          website_enabled?: boolean
          website_password?: string | null
          created_by?: string | null
          planner_id?: string | null
          notes?: string | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      wedding_members: {
        Row: {
          id: string
          wedding_id: string
          user_id: string
          role: 'owner' | 'co_owner' | 'planner' | 'coordinator' | 'family' | 'viewer'
          permissions: Json
          invited_by: string | null
          invitation_status: 'pending' | 'accepted' | 'declined'
          created_at: string
        }
        Insert: {
          id?: string
          wedding_id: string
          user_id: string
          role: 'owner' | 'co_owner' | 'planner' | 'coordinator' | 'family' | 'viewer'
          permissions?: Json
          invited_by?: string | null
          invitation_status?: 'pending' | 'accepted' | 'declined'
          created_at?: string
        }
        Update: {
          id?: string
          wedding_id?: string
          user_id?: string
          role?: 'owner' | 'co_owner' | 'planner' | 'coordinator' | 'family' | 'viewer'
          permissions?: Json
          invited_by?: string | null
          invitation_status?: 'pending' | 'accepted' | 'declined'
          created_at?: string
        }
      }
      guests: {
        Row: {
          id: string
          wedding_id: string
          first_name: string
          last_name: string | null
          email: string | null
          phone: string | null
          side: 'bride' | 'groom' | 'mutual' | 'planner' | null
          relationship: string | null
          category: 'family' | 'close_family' | 'friends' | 'colleagues' | 'vip' | 'vendor' | 'other' | null
          has_plus_one: boolean
          plus_one_name: string | null
          plus_one_confirmed: boolean
          additional_guests: number
          additional_guest_names: string[] | null
          dietary_restrictions: string[] | null
          dietary_notes: string | null
          meal_preference: string | null
          needs_accommodation: boolean
          accommodation_nights: number | null
          accommodation_preference: string | null
          accommodation_assigned: string | null
          needs_transportation: boolean
          arrival_date: string | null
          arrival_time: string | null
          arrival_details: string | null
          departure_date: string | null
          departure_details: string | null
          table_group: string | null
          table_number: number | null
          seat_number: number | null
          invitation_sent: boolean
          invitation_sent_at: string | null
          save_the_date_sent: boolean
          status: 'pending' | 'invited' | 'confirmed' | 'declined' | 'maybe' | 'no_response'
          notes: string | null
          tags: string[] | null
          imported_from: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          wedding_id: string
          first_name: string
          last_name?: string | null
          email?: string | null
          phone?: string | null
          side?: 'bride' | 'groom' | 'mutual' | 'planner' | null
          relationship?: string | null
          category?: 'family' | 'close_family' | 'friends' | 'colleagues' | 'vip' | 'vendor' | 'other' | null
          has_plus_one?: boolean
          plus_one_name?: string | null
          plus_one_confirmed?: boolean
          additional_guests?: number
          additional_guest_names?: string[] | null
          dietary_restrictions?: string[] | null
          dietary_notes?: string | null
          meal_preference?: string | null
          needs_accommodation?: boolean
          accommodation_nights?: number | null
          accommodation_preference?: string | null
          accommodation_assigned?: string | null
          needs_transportation?: boolean
          arrival_date?: string | null
          arrival_time?: string | null
          arrival_details?: string | null
          departure_date?: string | null
          departure_details?: string | null
          table_group?: string | null
          table_number?: number | null
          seat_number?: number | null
          invitation_sent?: boolean
          invitation_sent_at?: string | null
          save_the_date_sent?: boolean
          status?: 'pending' | 'invited' | 'confirmed' | 'declined' | 'maybe' | 'no_response'
          notes?: string | null
          tags?: string[] | null
          imported_from?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          wedding_id?: string
          first_name?: string
          last_name?: string | null
          email?: string | null
          phone?: string | null
          side?: 'bride' | 'groom' | 'mutual' | 'planner' | null
          relationship?: string | null
          category?: 'family' | 'close_family' | 'friends' | 'colleagues' | 'vip' | 'vendor' | 'other' | null
          has_plus_one?: boolean
          plus_one_name?: string | null
          plus_one_confirmed?: boolean
          additional_guests?: number
          additional_guest_names?: string[] | null
          dietary_restrictions?: string[] | null
          dietary_notes?: string | null
          meal_preference?: string | null
          needs_accommodation?: boolean
          accommodation_nights?: number | null
          accommodation_preference?: string | null
          accommodation_assigned?: string | null
          needs_transportation?: boolean
          arrival_date?: string | null
          arrival_time?: string | null
          arrival_details?: string | null
          departure_date?: string | null
          departure_details?: string | null
          table_group?: string | null
          table_number?: number | null
          seat_number?: number | null
          invitation_sent?: boolean
          invitation_sent_at?: string | null
          save_the_date_sent?: boolean
          status?: 'pending' | 'invited' | 'confirmed' | 'declined' | 'maybe' | 'no_response'
          notes?: string | null
          tags?: string[] | null
          imported_from?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      wedding_events: {
        Row: {
          id: string
          wedding_id: string
          name: string
          event_type: string
          event_date: string
          start_time: string | null
          end_time: string | null
          venue_name: string | null
          venue_address: string | null
          venue_city: string | null
          venue_coordinates: Json | null
          venue_id: string | null
          description: string | null
          dress_code: string | null
          estimated_guests: number | null
          actual_guests: number | null
          requires_rsvp: boolean
          rsvp_deadline: string | null
          transportation_provided: boolean
          accommodation_info: string | null
          display_order: number
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          wedding_id: string
          name: string
          event_type: string
          event_date: string
          start_time?: string | null
          end_time?: string | null
          venue_name?: string | null
          venue_address?: string | null
          venue_city?: string | null
          venue_coordinates?: Json | null
          venue_id?: string | null
          description?: string | null
          dress_code?: string | null
          estimated_guests?: number | null
          actual_guests?: number | null
          requires_rsvp?: boolean
          rsvp_deadline?: string | null
          transportation_provided?: boolean
          accommodation_info?: string | null
          display_order?: number
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          wedding_id?: string
          name?: string
          event_type?: string
          event_date?: string
          start_time?: string | null
          end_time?: string | null
          venue_name?: string | null
          venue_address?: string | null
          venue_city?: string | null
          venue_coordinates?: Json | null
          venue_id?: string | null
          description?: string | null
          dress_code?: string | null
          estimated_guests?: number | null
          actual_guests?: number | null
          requires_rsvp?: boolean
          rsvp_deadline?: string | null
          transportation_provided?: boolean
          accommodation_info?: string | null
          display_order?: number
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      rsvps: {
        Row: {
          id: string
          guest_id: string
          event_id: string
          response: 'attending' | 'not_attending' | 'maybe' | 'pending'
          responded_at: string | null
          plus_one_attending: boolean
          additional_guests_count: number
          meal_choice: string | null
          dietary_notes: string | null
          guest_message: string | null
          internal_notes: string | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          guest_id: string
          event_id: string
          response: 'attending' | 'not_attending' | 'maybe' | 'pending'
          responded_at?: string | null
          plus_one_attending?: boolean
          additional_guests_count?: number
          meal_choice?: string | null
          dietary_notes?: string | null
          guest_message?: string | null
          internal_notes?: string | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          guest_id?: string
          event_id?: string
          response?: 'attending' | 'not_attending' | 'maybe' | 'pending'
          responded_at?: string | null
          plus_one_attending?: boolean
          additional_guests_count?: number
          meal_choice?: string | null
          dietary_notes?: string | null
          guest_message?: string | null
          internal_notes?: string | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      wedding_websites: {
        Row: {
          id: string
          wedding_id: string
          subdomain: string
          custom_domain: string | null
          template: string
          primary_color: string
          secondary_color: string
          font_family: string
          hero_image_url: string | null
          hero_title: string | null
          hero_subtitle: string | null
          bride_full_name: string | null
          groom_full_name: string | null
          couple_photo_url: string | null
          how_we_met: string | null
          proposal_story: string | null
          story_photos: string[] | null
          story_timeline: Json | null
          sections_config: Json
          gallery_photos: string[] | null
          travel_info: string | null
          accommodation_options: Json | null
          things_to_do: string | null
          local_tips: string | null
          registry_links: Json | null
          registry_message: string | null
          faqs: Json | null
          is_published: boolean
          is_password_protected: boolean
          password_hash: string | null
          show_rsvp_form: boolean
          rsvp_deadline: string | null
          visit_count: number
          unique_visitors: number
          meta_title: string | null
          meta_description: string | null
          og_image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          wedding_id: string
          subdomain: string
          custom_domain?: string | null
          template?: string
          primary_color?: string
          secondary_color?: string
          font_family?: string
          hero_image_url?: string | null
          hero_title?: string | null
          hero_subtitle?: string | null
          bride_full_name?: string | null
          groom_full_name?: string | null
          couple_photo_url?: string | null
          how_we_met?: string | null
          proposal_story?: string | null
          story_photos?: string[] | null
          story_timeline?: Json | null
          sections_config?: Json
          gallery_photos?: string[] | null
          travel_info?: string | null
          accommodation_options?: Json | null
          things_to_do?: string | null
          local_tips?: string | null
          registry_links?: Json | null
          registry_message?: string | null
          faqs?: Json | null
          is_published?: boolean
          is_password_protected?: boolean
          password_hash?: string | null
          show_rsvp_form?: boolean
          rsvp_deadline?: string | null
          visit_count?: number
          unique_visitors?: number
          meta_title?: string | null
          meta_description?: string | null
          og_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          wedding_id?: string
          subdomain?: string
          custom_domain?: string | null
          template?: string
          primary_color?: string
          secondary_color?: string
          font_family?: string
          hero_image_url?: string | null
          hero_title?: string | null
          hero_subtitle?: string | null
          bride_full_name?: string | null
          groom_full_name?: string | null
          couple_photo_url?: string | null
          how_we_met?: string | null
          proposal_story?: string | null
          story_photos?: string[] | null
          story_timeline?: Json | null
          sections_config?: Json
          gallery_photos?: string[] | null
          travel_info?: string | null
          accommodation_options?: Json | null
          things_to_do?: string | null
          local_tips?: string | null
          registry_links?: Json | null
          registry_message?: string | null
          faqs?: Json | null
          is_published?: boolean
          is_password_protected?: boolean
          password_hash?: string | null
          show_rsvp_form?: boolean
          rsvp_deadline?: string | null
          visit_count?: number
          unique_visitors?: number
          meta_title?: string | null
          meta_description?: string | null
          og_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      budget_items: {
        Row: {
          id: string
          wedding_id: string
          category_id: string | null
          name: string
          description: string | null
          estimated_cost: number
          actual_cost: number | null
          currency: string
          amount_paid: number
          payment_status: 'pending' | 'partial' | 'paid'
          vendor_booking_id: string | null
          venue_booking_id: string | null
          is_booked: boolean
          is_priority: boolean
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          wedding_id: string
          category_id?: string | null
          name: string
          description?: string | null
          estimated_cost: number
          actual_cost?: number | null
          currency?: string
          amount_paid?: number
          payment_status?: 'pending' | 'partial' | 'paid'
          vendor_booking_id?: string | null
          venue_booking_id?: string | null
          is_booked?: boolean
          is_priority?: boolean
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          wedding_id?: string
          category_id?: string | null
          name?: string
          description?: string | null
          estimated_cost?: number
          actual_cost?: number | null
          currency?: string
          amount_paid?: number
          payment_status?: 'pending' | 'partial' | 'paid'
          vendor_booking_id?: string | null
          venue_booking_id?: string | null
          is_booked?: boolean
          is_priority?: boolean
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          wedding_id: string
          title: string
          description: string | null
          category: string | null
          due_date: string | null
          reminder_date: string | null
          assigned_to: string | null
          assigned_to_name: string | null
          status: 'pending' | 'in_progress' | 'completed' | 'skipped' | 'overdue'
          completed_at: string | null
          priority: 'low' | 'medium' | 'high' | 'urgent'
          is_from_template: boolean
          template_id: string | null
          display_order: number
          vendor_booking_id: string | null
          venue_booking_id: string | null
          budget_item_id: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          wedding_id: string
          title: string
          description?: string | null
          category?: string | null
          due_date?: string | null
          reminder_date?: string | null
          assigned_to?: string | null
          assigned_to_name?: string | null
          status?: 'pending' | 'in_progress' | 'completed' | 'skipped' | 'overdue'
          completed_at?: string | null
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          is_from_template?: boolean
          template_id?: string | null
          display_order?: number
          vendor_booking_id?: string | null
          venue_booking_id?: string | null
          budget_item_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          wedding_id?: string
          title?: string
          description?: string | null
          category?: string | null
          due_date?: string | null
          reminder_date?: string | null
          assigned_to?: string | null
          assigned_to_name?: string | null
          status?: 'pending' | 'in_progress' | 'completed' | 'skipped' | 'overdue'
          completed_at?: string | null
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          is_from_template?: boolean
          template_id?: string | null
          display_order?: number
          vendor_booking_id?: string | null
          venue_booking_id?: string | null
          budget_item_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      wedding_dashboard: {
        Row: {
          id: string
          bride_name: string
          groom_name: string
          wedding_date: string | null
          total_budget: number | null
          planning_status: string
          website_enabled: boolean
          total_guests: number
          confirmed_guests: number
          event_count: number
          pending_tasks: number
          spent_amount: number
        }
      }
    }
    Functions: {
      get_wedding_stats: {
        Args: { p_wedding_id: string }
        Returns: Json
      }
      is_feature_enabled: {
        Args: { p_feature_name: string; p_user_id?: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']
export type Insertable<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']
export type Updatable<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']

// Common type aliases
export type Profile = Tables<'profiles'>
export type Wedding = Tables<'weddings'>
export type WeddingMember = Tables<'wedding_members'>
export type Guest = Tables<'guests'>
export type WeddingEvent = Tables<'wedding_events'>
export type RSVP = Tables<'rsvps'>
export type WeddingWebsite = Tables<'wedding_websites'>
export type BudgetItem = Tables<'budget_items'>
export type Task = Tables<'tasks'>

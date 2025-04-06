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
      admin_logs: {
        Row: {
          action: string
          admin_id: string | null
          created_at: string
          details: Json | null
          entity_id: string | null
          entity_type: string
          id: string
        }
        Insert: {
          action: string
          admin_id?: string | null
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type: string
          id?: string
        }
        Update: {
          action?: string
          admin_id?: string | null
          created_at?: string
          details?: Json | null
          entity_id?: string | null
          entity_type?: string
          id?: string
        }
        Relationships: []
      }
      available_models: {
        Row: {
          base_model: string
          config: Json | null
          created_at: string
          credit_cost: number
          description: string | null
          display_name: string
          id: string
          is_active: boolean | null
          is_public: boolean | null
          model_type: string
          name: string
          tier_access: Json | null
          updated_at: string
          version: string
        }
        Insert: {
          base_model: string
          config?: Json | null
          created_at?: string
          credit_cost?: number
          description?: string | null
          display_name: string
          id?: string
          is_active?: boolean | null
          is_public?: boolean | null
          model_type: string
          name: string
          tier_access?: Json | null
          updated_at?: string
          version: string
        }
        Update: {
          base_model?: string
          config?: Json | null
          created_at?: string
          credit_cost?: number
          description?: string | null
          display_name?: string
          id?: string
          is_active?: boolean | null
          is_public?: boolean | null
          model_type?: string
          name?: string
          tier_access?: Json | null
          updated_at?: string
          version?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          content: string
          created_at: string
          id: string
          image_id: string
          is_flagged: boolean | null
          moderation_status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          image_id: string
          is_flagged?: boolean | null
          moderation_status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          image_id?: string
          is_flagged?: boolean | null
          moderation_status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
        ]
      }
      generation_jobs: {
        Row: {
          completed_at: string | null
          created_at: string
          error_message: string | null
          guidance_scale: number
          height: number
          id: string
          img2img_strength: number | null
          img2img_url: string | null
          model: string
          negative_prompt: string | null
          priority: number | null
          prompt: string
          seed: number | null
          started_at: string | null
          status: string
          steps: number
          style: string | null
          updated_at: string
          user_id: string
          width: number
          worker_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          guidance_scale: number
          height: number
          id?: string
          img2img_strength?: number | null
          img2img_url?: string | null
          model: string
          negative_prompt?: string | null
          priority?: number | null
          prompt: string
          seed?: number | null
          started_at?: string | null
          status?: string
          steps: number
          style?: string | null
          updated_at?: string
          user_id: string
          width: number
          worker_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          error_message?: string | null
          guidance_scale?: number
          height?: number
          id?: string
          img2img_strength?: number | null
          img2img_url?: string | null
          model?: string
          negative_prompt?: string | null
          priority?: number | null
          prompt?: string
          seed?: number | null
          started_at?: string | null
          status?: string
          steps?: number
          style?: string | null
          updated_at?: string
          user_id?: string
          width?: number
          worker_id?: string | null
        }
        Relationships: []
      }
      images: {
        Row: {
          created_at: string
          guidance_scale: number
          height: number
          id: string
          image_url: string
          is_public: boolean | null
          metadata: Json | null
          model: string
          moderation_data: Json | null
          moderation_status: string | null
          negative_prompt: string | null
          prompt: string
          seed: number | null
          status: string
          steps: number
          style: string | null
          thumbnail_url: string | null
          updated_at: string
          user_id: string
          watermark_data: Json | null
          width: number
        }
        Insert: {
          created_at?: string
          guidance_scale: number
          height: number
          id?: string
          image_url: string
          is_public?: boolean | null
          metadata?: Json | null
          model: string
          moderation_data?: Json | null
          moderation_status?: string | null
          negative_prompt?: string | null
          prompt: string
          seed?: number | null
          status?: string
          steps: number
          style?: string | null
          thumbnail_url?: string | null
          updated_at?: string
          user_id: string
          watermark_data?: Json | null
          width: number
        }
        Update: {
          created_at?: string
          guidance_scale?: number
          height?: number
          id?: string
          image_url?: string
          is_public?: boolean | null
          metadata?: Json | null
          model?: string
          moderation_data?: Json | null
          moderation_status?: string | null
          negative_prompt?: string | null
          prompt?: string
          seed?: number | null
          status?: string
          steps?: number
          style?: string | null
          thumbnail_url?: string | null
          updated_at?: string
          user_id?: string
          watermark_data?: Json | null
          width?: number
        }
        Relationships: []
      }
      likes: {
        Row: {
          created_at: string
          id: string
          image_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          image_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          },
        ]
      }
      moderation_reports: {
        Row: {
          admin_notes: string | null
          content_id: string
          content_type: string
          created_at: string
          id: string
          reason: string
          reporter_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          content_id: string
          content_type: string
          created_at?: string
          id?: string
          reason: string
          reporter_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          content_id?: string
          content_type?: string
          created_at?: string
          id?: string
          reason?: string
          reporter_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          is_banned: boolean | null
          moderation_notes: string | null
          moderation_status: string | null
          updated_at: string
          username: string
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id: string
          is_banned?: boolean | null
          moderation_notes?: string | null
          moderation_status?: string | null
          updated_at?: string
          username: string
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          is_banned?: boolean | null
          moderation_notes?: string | null
          moderation_status?: string | null
          updated_at?: string
          username?: string
          website?: string | null
        }
        Relationships: []
      }
      referral_codes: {
        Row: {
          code: string
          created_at: string
          expires_at: string | null
          id: string
          max_uses: number | null
          updated_at: string
          user_id: string
          uses: number
        }
        Insert: {
          code: string
          created_at?: string
          expires_at?: string | null
          id?: string
          max_uses?: number | null
          updated_at?: string
          user_id: string
          uses?: number
        }
        Update: {
          code?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          max_uses?: number | null
          updated_at?: string
          user_id?: string
          uses?: number
        }
        Relationships: []
      }
      referrals: {
        Row: {
          code: string
          completed_at: string | null
          created_at: string
          credits_awarded_referred: number | null
          credits_awarded_referrer: number | null
          id: string
          referred_id: string
          referrer_id: string
          status: string
        }
        Insert: {
          code: string
          completed_at?: string | null
          created_at?: string
          credits_awarded_referred?: number | null
          credits_awarded_referrer?: number | null
          id?: string
          referred_id: string
          referrer_id: string
          status?: string
        }
        Update: {
          code?: string
          completed_at?: string | null
          created_at?: string
          credits_awarded_referred?: number | null
          credits_awarded_referrer?: number | null
          id?: string
          referred_id?: string
          referrer_id?: string
          status?: string
        }
        Relationships: []
      }
      subscription_tiers: {
        Row: {
          created_at: string
          credits_per_cycle: number
          description: string
          features: Json
          generation_limit_daily: number | null
          id: string
          monthly_price: number
          name: string
          priority_level: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          credits_per_cycle: number
          description: string
          features: Json
          generation_limit_daily?: number | null
          id?: string
          monthly_price: number
          name: string
          priority_level: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          credits_per_cycle?: number
          description?: string
          features?: Json
          generation_limit_daily?: number | null
          id?: string
          monthly_price?: number
          name?: string
          priority_level?: number
          updated_at?: string
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      user_credits: {
        Row: {
          available_credits: number
          created_at: string
          id: string
          last_reset_date: string
          lifetime_credits: number
          updated_at: string
          user_id: string
        }
        Insert: {
          available_credits?: number
          created_at?: string
          id?: string
          last_reset_date?: string
          lifetime_credits?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          available_credits?: number
          created_at?: string
          id?: string
          last_reset_date?: string
          lifetime_credits?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          tier_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          status: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          tier_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "subscription_tiers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

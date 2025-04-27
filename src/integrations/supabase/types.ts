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
      active_reward: {
        Row: {
          created_at: string
          id: string
          reward_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          reward_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          reward_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "active_reward_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "rewards"
            referencedColumns: ["id"]
          },
        ]
      }
      active_tasks: {
        Row: {
          created_at: string
          id: string
          task_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          task_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          task_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "active_tasks_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      active_work: {
        Row: {
          created_at: string
          id: string
          job_id: string | null
          task_barcode: string | null
          task_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          job_id?: string | null
          task_barcode?: string | null
          task_id?: string | null
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          job_id?: string | null
          task_barcode?: string | null
          task_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "active_work_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "active_work_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      crime_report: {
        Row: {
          created_at: string
          description: string
          id: string
          location: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          location: string
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          location?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          created_at: string
          description: string
          id: string
          location: string
          points: number
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          location: string
          points: number
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          location?: string
          points?: number
          title?: string
        }
        Relationships: []
      }
      rewards: {
        Row: {
          cost: number
          description: string
          id: string
          title: string
        }
        Insert: {
          cost: number
          description: string
          id?: string
          title: string
        }
        Update: {
          cost?: number
          description?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          description: string
          id: string
          points: number
          title: string
        }
        Insert: {
          description: string
          id?: string
          points: number
          title: string
        }
        Update: {
          description?: string
          id?: string
          points?: number
          title?: string
        }
        Relationships: []
      }
      transaction_history: {
        Row: {
          created_at: string
          id: string
          job_id: string | null
          points: number
          report_id: string | null
          reward_id: string | null
          task_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          job_id?: string | null
          points: number
          report_id?: string | null
          reward_id?: string | null
          task_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          job_id?: string | null
          points?: number
          report_id?: string | null
          reward_id?: string | null
          task_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transaction_history_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_history_report_id_fkey"
            columns: ["report_id"]
            isOneToOne: false
            referencedRelation: "crime_report"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_history_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "rewards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transaction_history_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          first_name: string
          id: string
          last_name: string
        }
        Insert: {
          created_at?: string
          first_name: string
          id: string
          last_name: string
        }
        Update: {
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
        }
        Relationships: []
      }
      wallet: {
        Row: {
          created_at: string
          id: string
          points: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id: string
          points?: number
          updated_at: string
        }
        Update: {
          created_at?: string
          id?: string
          points?: number
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      complete_task: {
        Args: { task_id_param: string; user_id_param: string }
        Returns: undefined
      }
      get_transaction_history: {
        Args: { user_id_param: string }
        Returns: {
          id: string
          type: string
          points: number
          created_at: string
          title: string
        }[]
      }
      redeem_reward: {
        Args: {
          reward_id_param: string
          cost_param: number
          title_param: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

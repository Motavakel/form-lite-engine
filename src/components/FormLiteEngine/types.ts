import type { ColProps } from "antd";
import type { ReactNode } from "react";
import type { RegisterOptions } from "react-hook-form";

export type FieldType =
  | "text"
  | "password"
  | "number"
  | "textarea"
  | "select"
  | "checkbox"
  | "switch"
  | "custom";
export type LoadingAnimationType = "spinner" | "pulse" | "dots";

export interface FieldOption {
  label: string;
  value: string | number;
}

export interface SchemaField {
  name: string;
  label: string;
  type: FieldType;
  grid?: ColProps;
  rules?: RegisterOptions;
  props?: Record<string, any>;
  options?: FieldOption[];
  showIf?: (formValues: any) => boolean;
  customComponent?: React.ElementType;
}

export interface FormLiteEngineProps {
  schema: SchemaField[];
  onSubmit: (data: any) => void;
  defaultValues?: Record<string, any>;
  submitLabel?: string | ReactNode;
  loadingStrategy?: {
    type?: LoadingAnimationType;
    customLoader?: React.ReactNode;
  };
}

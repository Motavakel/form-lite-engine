import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Row, Col } from "antd";
import { FieldRegistry } from "./FieldRegistry";
import { SubmitButton } from "./internal/SubmitButton";
import type { FormLiteEngineProps } from "./types";

export const FormLiteEngine: React.FC<FormLiteEngineProps> = ({
  schema,
  onSubmit,
  defaultValues = {},
  submitLabel = "Submit",
  loadingStrategy,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues, mode: "onChange" });

  const formValues = watch();

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Row gutter={[16, 16]}>
        {schema.map((field) => {
          if (field.showIf && !field.showIf(formValues)) return null;

          const Component =
            field.type === "custom" && field.customComponent
              ? field.customComponent
              : FieldRegistry[field.type as keyof typeof FieldRegistry];

          if (!Component) return null;

          return (
            <Col {...(field.grid || { xs: 24 })} key={field.name}>
              <Controller
                name={field.name}
                control={control}
                rules={field.rules}
                render={({ field: controllerField }) => (
                  <Form.Item
                    label={field.label}
                    name={field.name}
                    validateStatus={errors[field.name] ? "error" : ""}
                    help={errors[field.name]?.message as string}
                    required={!!field.rules?.required}
                    valuePropName={
                      field.type === "checkbox" || field.type === "switch"
                        ? "checked"
                        : "value"
                    }
                  >
                    <Component
                      {...controllerField}
                      {...field.props}
                      id={field.name}
                      options={field.options}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          );
        })}
      </Row>

      <SubmitButton
        isSubmitting={isSubmitting}
        submitLabel={submitLabel}
        loadingStrategy={loadingStrategy}
      />
    </Form>
  );
};

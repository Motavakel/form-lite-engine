import { Input, InputNumber, Select, Checkbox, Switch } from 'antd';
import React from 'react';
import type { FieldType } from './types';

export const FieldRegistry: Record<Exclude<FieldType, 'custom'>, React.ElementType> = {
  text: Input,
  password: Input.Password,
  number: InputNumber,
  textarea: Input.TextArea,
  select: Select,
  checkbox: Checkbox,
  switch: Switch,
};
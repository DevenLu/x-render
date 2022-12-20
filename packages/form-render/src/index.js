import React from 'react';
import { Form, ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

import { widgets as defaultWidgets } from './widgets';
import FRCore from './form-core';

import schema from './schema-mock';

export { useForm } from './form-core/useForm';
export { default as connectForm } from './form-core/connect-form';
export { createWidget } from './form-core/create-widget';
export { mapping } from './render-core/mapping';
export { defaultWidgets as widgets };

const Main = props => {
  const { configProvider, widgets, ...otherProps } = props;

  return (
    <ConfigProvider locale={zhCN} {...configProvider}>
      <FRCore
        widgets={{ ...defaultWidgets, ...widgets }}
        {...otherProps}
        schema={schema}
      />
    </ConfigProvider>
  );
};

export default Main;

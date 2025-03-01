import React, { useState, useEffect, useContext } from 'react';
import { Button, Space, ConfigProvider } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { translation } from '../../utils'

const ActionView = (props: any) => {
  const {
    searchBtnRender,
    style,
    className,
    form,
    searchText,
    resetText,
    collapsed,
    defaultCollapsed = true,
    setLimitHeight,
    loading
  } = props;

  const [expand, setExpand] = useState(!defaultCollapsed);
  const configCtx = useContext(ConfigProvider.ConfigContext);
  const t = translation(configCtx);

  useEffect(() => {
    if (!collapsed) {
      return;
    }
    setLimitHeight(defaultCollapsed);
  }, []);

  const handleReset = () => {
    form.resetFields();
    form.submit();
  };

  const handleCollapse = () => {
    const flag = !expand;
    setExpand(flag)
    setLimitHeight(expand);
  };

  const searchBtnArr = typeof searchBtnRender === 'function' ? searchBtnRender(form.submit, handleReset) : [];

  if (searchBtnRender) {
    return (
      <div className='flex justify-end w-100'>
        {Array.isArray(searchBtnArr) &&
          searchBtnArr.map((ui, idx) => {
            return (
              <div key={idx.toString()} style={{ marginLeft: 8 }}>
                {ui}
              </div>
            );
          })}
      </div>
    );
  }

  return (
    <div
      className={`flex justify-end w-100 ${className || ''}`}
      style={style}
    >
      <Space>
        <Button loading={loading} type='primary' onClick={form.submit}>{searchText}</Button>
        <Button onClick={handleReset}>{resetText}</Button>
        {collapsed && (
          <a onClick={handleCollapse} style={{ cursor: 'pointer' }}>
            {expand ? (
              <>
                {t('fold')}
                <UpOutlined />
              </>
            ) : (
              <>
                {t('expand')}
                <DownOutlined />
              </>
            )}
          </a>
        )}
      </Space>
    </div>
  );
}

export default ActionView;

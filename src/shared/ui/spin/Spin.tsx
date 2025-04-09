import { Space, Spin } from 'antd'

import classes from './Spin.module.scss'

const Loading: React.FC = () => (
  <div className={classes.spin}>
    <Space size="middle">
      <Spin size="large" />
    </Space>
  </div>
)

export default Loading

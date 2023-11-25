import { Card, Col, Row } from "antd";
import React from "react";
import MyTimeSheet from "./MyTimesheet";

const App = () => (
  <Row gutter={16}>
    <Col span={8}>
      <Card title="Timesheet 8 may 2019" bordered={false}>
        <MyTimeSheet />
      </Card>
    </Col>
    <Col span={8}>
      <Card title="Card title" bordered={false}>
        Card content
      </Card>
    </Col>
    <Col span={8}>
      <Card title="Card title" bordered={false}>
        Card content
      </Card>
    </Col>
  </Row>
);
export default App;

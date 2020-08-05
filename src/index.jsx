/**
 * @author samy
 * @email samyzhg#qq.com
 * @create date 2020-08-05 22:05:49
 * @modify date 2020-08-05 22:05:49
 * @desc 表单模版示范
 */
import React from "react";
import { connect } from "dva";
import styles from "./index.less";
import Base from "@<%=proName%>/base/BaseSub";
import { formatMessage } from "umi/locale";
import moment from 'moment';
import { getPlaceholder } from "@/bdpcloud/utils/utils";
import { Form, Card, Input, Row, Col, Select, TimePicker } from "antd";

@connect(({ <%=moduleName%>, loading }) => ({
  <%=moduleName%>,
  loading: !!loading.effects["<%=moduleName%>/test"],
}))
@Form.create()
class Index extends Base {
  constructor(props) {
    super(props);
    this.state = {
      selectList: [
        {
          id: 1,
          standCode: "code1",
          standDisplayValue: "类型1",
        },
      ],
    };
    this.formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 },
    };
  }

  getRefData() {
    const {
      form: { validateFieldsAndScroll },
    } = this.props;
    let data;
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        data = values;
      }
    });
    return data;
  }

  render() {
    const {
      form: { getFieldDecorator },
      viewType,
    } = this.props;
    const { selectList } = this.state;
    const disabled = viewType === "view";
    return (
      <div className={styles.index}>
        <Card title="表单模版示范" bordered={false}>
          <Form {...this.formItemLayout}>
            <Row type="flex" justify="center">
              <Col span={24}>
                <Form.Item
                  label={formatMessage({
                    id: "<%=moduleName%>.scriptType",
                    defaultMessage: "脚本类型",
                  })}
                >
                  {getFieldDecorator("scriptType", {
                    rules: [
                      {
                        required: true,
                        message: getPlaceholder("", "select"),
                      },
                    ],
                  })(
                    <Select
                      allowClear
                      disabled={disabled}
                      style={{ width: "100%" }}
                      placeholder={getPlaceholder("", "select")}
                    >
                      {selectList.map((item) => {
                        return (
                          <Select.Option key={item.id} value={item.standCode}>
                            {item.standDisplayValue}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={formatMessage({
                    id: "<%=moduleName%>.priority",
                    defaultMessage: "优先级",
                  })}
                >
                  {getFieldDecorator("priority", {
                    rules: [
                      {
                        required: true,
                        message: getPlaceholder(),
                      },
                    ],
                  })(<Input disabled={disabled} />)}
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={formatMessage({
                    id: '<%=moduleName%>.startRunTime',
                    defaultMessage: '开始运行时间',
                  })}
                >
                  {getFieldDecorator('startRunTime', {
                    rules: [
                      {
                        required: true,
                        message: getPlaceholder(),
                      },
                    ],
                  })(
                    <TimePicker
                      style={{ width: '100%' }}
                      defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    );
  }
}
export default Index;

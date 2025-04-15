import { ApiGetDashBoard } from "@services/api.admin";
import { DEFAULT_DURATION_COUNTUP } from "@utils/ValueConstant";
import { Card, Col, Row, Spin, Statistic, StatisticProps } from "antd";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

const DashBoardAdmin = () => {
  const [countDashBoard, setCountDashBoard] = useState<IDashBoard>({
    countBook: 0,
    countOrder: 0,
    countUser: 0,
  });
  const [isLoadingDashBoard, setIsLoadingDashBoard] = useState<boolean>(true);

  useEffect(() => {
    CallApiDashBoard();
  }, []);

  const CallApiDashBoard = async () => {
    setIsLoadingDashBoard(true);
    const res = await ApiGetDashBoard();
    if (res.data) {
      setCountDashBoard(res.data);
    }
    setIsLoadingDashBoard(false);
  };

  const formatter: StatisticProps["formatter"] = (value) => {
    return (
      <CountUp duration={DEFAULT_DURATION_COUNTUP} end={value as number} />
    );
  };
  return (
    <>
      <Spin spinning={isLoadingDashBoard} tip={"Loading..."}>
        <Row gutter={[24, 12]}>
          <Col span={12} md={24} lg={12}>
            <Card
              variant="borderless"
              style={{ maxHeight: "200px", height: "150px" }}
            >
              <Statistic
                title="Total Users"
                value={countDashBoard.countUser}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                formatter={formatter}
                // prefix={<ArrowDownOutlined />}
                // suffix="members"
              />
            </Card>
          </Col>
          <Col span={12} md={24} lg={12}>
            <Card
              variant="borderless"
              style={{ maxHeight: "200px", height: "150px" }}
            >
              <Statistic
                title="Total Books"
                value={countDashBoard.countBook}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                formatter={formatter}
                // prefix={<ArrowUpOutlined />}
              />
            </Card>
          </Col>
          <Col span={24} md={24} lg={24}>
            <Card
              variant="borderless"
              style={{ maxHeight: "200px", height: "150px" }}
            >
              <Statistic
                title="Total Order"
                value={countDashBoard.countOrder}
                precision={2}
                valueStyle={{ color: "red" }}
                formatter={formatter}
              />
            </Card>
          </Col>
        </Row>
      </Spin>
    </>
  );
};
export default DashBoardAdmin;

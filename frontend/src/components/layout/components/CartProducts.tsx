import { Avatar, Col, Divider, Row } from "antd";

const CartProducts = () => {
  return (
    <>
      <section>
        <Row gutter={24}>
          <Col span={24}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <div>
                <span style={{ color: "black" }}> San pham A</span>
                <Divider style={{ borderColor: "#7cb305" }} type="vertical" />
                <Avatar
                  size={30}
                  src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                />
              </div>
              <div style={{ color: "black" }}>So luong: 2</div>
            </div>
          </Col>
          <Divider dashed={true} />
          <Col span={24}>
            <div>
              <div style={{ width: "100%" }}>
                <span style={{ color: "black" }}> San pham A</span>
                <Divider style={{ borderColor: "#7cb305" }} type="vertical" />
                <Avatar
                  size={30}
                  src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
                />
              </div>
              <div style={{ color: "black" }}>So luong: 2</div>
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
};
export default CartProducts;

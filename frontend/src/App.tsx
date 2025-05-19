import { Container } from "@components/common/ContainerCommon";
import HeaderClient from "@components/layout/HeaderClient";
import { CurrentContext } from "@hooks/CurrentAppContext";
import HomeApp from "@pages/HomeApp";
import { Col, Row, Card } from "antd";

const { Meta } = Card;
function App() {
  const app = CurrentContext();
  return (
    <>
      <HeaderClient />
      <br />
      {JSON.stringify(app?.user)}
      <HomeApp />
    </>
  );
}

export default App;

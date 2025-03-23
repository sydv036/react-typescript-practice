import HeaderClient from "@components/layout/HeaderClient";
import { CurrentContext } from "@hooks/CurrentAppContext";

function App() {
  const app = CurrentContext();
  return (
    <>
      <HeaderClient />
      <br />
      hello
      {JSON.stringify(app?.user)}
    </>
  );
}

export default App;

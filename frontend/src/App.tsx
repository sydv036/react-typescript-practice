import { CurrentContext } from "@hooks/CurrentAppContext";

function App() {
  const app = CurrentContext();
  return (
    <>
      hello
      {JSON.stringify(app?.user)}
    </>
  );
}

export default App;

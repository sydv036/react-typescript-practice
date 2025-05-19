import "@styles/container.scss";
export const Container = (props: IPropsChildren) => {
  return (
    <>
      <section className="container">{props.children}</section>
    </>
  );
};

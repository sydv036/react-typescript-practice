import "@styles/container.scss";
export const Container = (props: IPropsChildren) => {
  return (
    <>
      <div className="container">{props.children}</div>
    </>
  );
};

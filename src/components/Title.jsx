const Title = ({ children }) => {
  return (
    <div className="relative border-s-8 border-blue-700 ps-3">
      <h2 className="text-4xl font-bold">{children}</h2>
      <p className="absolute bottom-0 text-9xl -z-10 opacity-5">{children}</p>
    </div>
  );
};

export default Title;

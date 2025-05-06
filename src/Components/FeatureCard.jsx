const FeatureCard = ({ subIcon, title, description, subIconStyles }) => {
  return (
    <div
      className="flex flex-row text-center font-semibold text-sm m-2 rounded p-3 transition-transform duration-300 ease-in-out hover:scale-105"
      style={{ background: "#FF7E00", width: "100%", maxWidth: "250px", minHeight: "100px" }}
    >
      <div className="flex rounded-md">
        <div className="my-auto me-2">
          <img
            src={subIcon}
            alt="Sub Icon"
            className={`${subIconStyles}`}
            width={50}
          />
        </div>
      </div>
      <div className="flex flex-col text-left items-start ml-1">
        <p className="mt-2">{title}</p>
        <p className="text-white">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;

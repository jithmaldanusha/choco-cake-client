const FeatureCard = ({ icon, subIcon, title, description, subIconStyles }) => {
    return (
      <div
        className="flex flex-row text-center font-semibold text-sm m-2 rounded p-3"
        style={{ background: "#FF7E00", width: "100%", maxWidth: "250px" }} // Define a max width for responsive design
      >
        <div className="flex flex-col rounded-md">
          <div className="relative">
            <img src={icon} alt="Main Icon" className="mx-auto relative" width={80} />
            <img
              src={subIcon}
              alt="Sub Icon"
              className={`mx-auto absolute ${subIconStyles}`}
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
  
import React from "react";

const Title = ({ name }) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
        {name.split(" ")[0]} <span className="text-primary">{name.split(" ")[1]} {name.split(" ")[2]} {name.split(" ")[3]}</span>
      </h2>
      <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
    </div>
  );
};

export default Title;

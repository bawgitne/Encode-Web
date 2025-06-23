import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFoundReal = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Nghĩ sao z bà</h1>
        <p className="text-xl text-gray-600 mb-4">Muốn coi đến vậy sao?</p>
        <img src="https://i.ibb.co/cKSv8GCc/download.jpg"/>
      </div>
    </div>
  );
};

export default NotFoundReal;

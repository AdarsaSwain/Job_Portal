import { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import Silk from "./Silk";

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);
  const experienceRef = useRef(null); // ✅ NEW

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
      experience: experienceRef.current.value, // ✅ NEW
    });
    setIsSearched(true);
  };

  return (
    <div className="container 2xl:px-20 mx-auto my-10 relative overflow-hidden rounded-xl">
      {/* Background effect */}
      <div className="absolute inset-0 z-0">
        <Silk
          speed={5}
          scale={1}
          color="#39a6faff"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-10">
        <div className="text-white py-16 text-center mx-2">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">
            Over 10,000+ jobs to apply
          </h2>
          <p className="mb-8 max-w-xl mx-auto text-sm font-light px-5">
            Simplifying Your Job Search – Explore the Best Job Opportunities and
            Take the First Step Toward Your Future!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between bg-white rounded text-gray-600 max-w-3xl p-3 mx-4 sm:mx-auto gap-3">
            <div className="flex items-center flex-1 border rounded px-2">
              <img className="h-4 sm:h-5 mr-2" src={assets.search_icon} alt="" />
              <input
                type="text"
                placeholder="Search for jobs"
                className="max-sm:text-xs p-2 rounded outline-none w-full"
                ref={titleRef}
              />
            </div>

            <div className="flex items-center flex-1 border rounded px-2">
              <img className="h-4 sm:h-5 mr-2" src={assets.location_icon} alt="" />
              <input
                type="text"
                placeholder="Location"
                className="max-sm:text-xs p-2 rounded outline-none w-full"
                ref={locationRef}
              />
            </div>

            {/* ✅ Experience Filter */}
            <div className="flex items-center flex-1 border rounded px-2">
              <select
                ref={experienceRef}
                className="max-sm:text-xs p-2 rounded outline-none w-full bg-transparent"
              >
                <option value="">Any Experience</option>
                <option value="Fresher">Fresher</option>
                <option value="0-1 years">0-1 years</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>

            <button
              onClick={onSearch}
              className="bg-blue-600 px-6 py-2 rounded text-white"
            >
              Search
            </button>
          </div>
        </div>

        <div className="border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex bg-white bg-opacity-90 relative">
          <div className="flex justify-center gap-10 lg:gap-16 flex-wrap">
            <p className="font-medium">Trusted by</p>
            <img className="h-6" src={assets.microsoft_logo} alt="" />
            <img className="h-6" src={assets.walmart_logo} alt="" />
            <img className="h-6" src={assets.accenture_logo} alt="" />
            <img className="h-6" src={assets.samsung_logo} alt="" />
            <img className="h-6" src={assets.amazon_logo} alt="" />
            <img className="h-6" src={assets.adobe_logo} alt="" />
            <img className="h-6" src={assets.vrhaman} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

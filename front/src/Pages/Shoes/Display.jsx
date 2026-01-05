import React from "react";
import shoes1 from "../../assets/shoes01.jpg";
import { getShoesById } from "../../Service/dashboardService.js";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { useSpinner } from "../../Context/SpinnerContext.jsx";
import ReactImageMagnify from "react-image-magnify";

const colors = {
  red: "bg-red-500",
  black: "bg-black",
  brown:"bg-amber-700",
  blue:"bg-blue-500",
  white:"bg-white border-2 border-gray-300",
  grey:"bg-gray-500",
  green:"bg-green-500",
};

export default function Display() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const { showSpinner, hideSpinner } = useSpinner();

  useEffect(() => {
    fetchshoeById(id);
  }, []);

  const fetchshoeById = async (id) => {
    showSpinner();
    try {
      const result = await getShoesById(id);
      setData(result);
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      hideSpinner();
    }
  };
  return (
    <>
      {data && (
        <>
          <div className="flex justify-start gap-50 ml-15 mt-5">
            <div className="flex flex-col  gap-2 ">
              <h1 className="text-6xl font-bold italic">{data.brand}</h1>
              <h2 className="text-4xl font-bold mt-3">{data.name}</h2>
              <p className="text-xl w-[300px]">{data.description}</p>
              <h2 className="text-2xl font-bold text-orange-400">
                $ {data.price}
              </h2>
              <p className="text-xl">Category</p>
              <p className="text-xl">{data.category}</p>
            </div>
            <div className="flex flex-col absolute right-80 top-40">
              {/* <img src={data?.images?.[0]} className=" h-[300px] w-[400px] object-cover" /> */}
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: "Wristwatch by Ted Baker London",
                    isFluidWidth: false,
                    height: 400,
                    width: 300,
                    src: data?.images?.[0],
                  },
                  largeImage: {
                    src: data?.images?.[0],
                    width: 800,
                    height: 900,
                  },
                  enlargedImagePosition: "beside",
                  enlargedImageContainerDimensions: {
                    width: "200%",
                    height: "105%",
                  },
                  enlargedImageContainerStyle: {
                    left: "-240%", // match container width
                    top: "0",
                    position: "absolute",
                  },
                }}
              />
            </div>
          </div>

          <div className="flex">
            <div className="mt-4">
              {data.isFeatured && (
                <>
                  <h1 className="ml-15 bg-orange-400 text-base font-medium text-white inline px-3 py-1 rounded-sm">
                    FEATURED
                  </h1>
                </>
              )}
              <div className="flex mt-2">
                <div className="flex ml-15 gap-4">
                  <img
                    src={data?.images?.[0]}
                    className="h-[70px] w-[100px] object-contain border-2 border-gray-200"
                  />
                  <img
                    src={data?.images?.[0]}
                    className="h-[70px] w-[100px] object-contain border-2 border-gray-200"
                  />
                </div>
                <div className="ml-15">
                  <p className="text-xl mt-2">Colors</p>
                  <div className="flex gap-2">
                    {data?.colors?.map((item, idx) => {
                      return (
                        <div
                          key={idx}
                          className={`h-8 w-8 rounded-full ${
                            colors[item.toLowerCase()]
                          }`}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <p className="text-xl ml-15 mt-2">Sizes</p>
              <div className="flex gap-5 ml-15 mt-2">
                <h6 className="border-2 border-gray-200 px-3 py-1">7</h6>
                <h6 className="border-2 border-gray-200 px-3 py-1">8</h6>
                <h6 className="border-2 border-gray-200 px-3 py-1">9</h6>
              </div>
            </div>

            <div>
              <button className="mt-30 ml-90 inline-flex items-center text-white bg-blue-600 hover:bg-blue-700 box-border border rounded-xl border-transparent focus:ring-4 focus:ring-blue-500 shadow-xs font-medium leading-5 rounded-base text-sm px-10 py-2 focus:outline-none">
                ADD TO CART
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

import React, { useState, useEffect } from "react";
import { StickyNote, ArrowRight } from "lucide-react";
import axios from "axios";

function Home() {
  const [books, setBooks] = useState([]);
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/books")
      .then((response) => {
        setBooks(response.data);
        const coloredBoxes = response.data.map((box) => {
          return {
            ...box,
            color: generateRandomColor(), // Add a 'color' property with a random color to each box
          };
        });
        setBoxes(coloredBoxes); // Update state with the colored boxes
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function generateRandomColor() {
    const red = Math.floor(Math.random() * 256); // Random integer between 0 and 255
    const green = Math.floor(Math.random() * 256); // Random integer between 0 and 255
    const blue = Math.floor(Math.random() * 256); // Random integer between 0 and 255
    return `rgb(${red}, ${green}, ${blue})`; // Construct the RGB color string
  }

  return (
    <>
      <div className="px-2 py-2 md:px-6 md:py-10 text-center">
        <h1 className="text-2xl font-bold capitalize text-black lg:text-3xl">
          FullStack Web Makes Your Work Easier
        </h1>
        <p className="my-2 text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum quam
          voluptatibus
        </p>
        <hr />
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-16">
          {books.map((book, i) => (
            <div key={i} className="space-y-3">
              <div className="flex flex-col items-center text-start">
                <div
                  className="relative flex h-[342px] w-full flex-col justify-end rounded-[10px]"
                  style={{
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: boxes[i]?.color, // Access the color from the 'boxes' state variable
                  }}
                >
                  <img
                    src={book.imageLink}
                    alt=""
                    className="z-0 h-full w-full rounded-[10px] object-cover"
                  />
                  <div className="absolute bottom-4 left-4">
                    <h1 className="text-xl font-semibold text-white">
                      {book.author}
                    </h1>
                    <h6 className="text-base font-medium text-white">
                      {book.title}
                    </h6>
                  </div>
                </div>
              </div>
              <h1 className="text-xl font-semibold capitalize text-black">
                <b>Language: </b>
                {book.language}
              </h1>
              <h2 className="text-xl font-semibold capitalize text-black">
                <b>Country: </b>
                {book.country}
              </h2>
              <h6 className="text-xl font-semibold capitalize text-black">
                <b>Year: </b>
                {book.year}
              </h6>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Provident ab nulla quod dignissimos vel non corrupti doloribus
                voluptatum eveniet
              </p>
              <a
                href={book.link}
                className="-mx-1 inline-flex transform items-center text-sm font-semibold capitalize text-black transition-colors duration-300 hover:underline" target="_blank"
              >
                  read more
                <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;

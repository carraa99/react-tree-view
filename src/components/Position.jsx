import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Position = ({ addNewPosition }) => {
  const [positions, setPositions] = useState([]);
  const [positionCreated, setPositionCreated] = useState(false);

  useEffect(() => {
    // Fetch data from the JSON server using Axios
    axios
      .get("http://localhost:5000/positions")
      .then((response) => setPositions(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const { register, handleSubmit, reset, formState } = useForm();
    useEffect(() => {
      // This will update the form when the positions prop changes
        reset();
    }, [positions]);

  const onSubmit = (data) => {
    // Make a POST request to the JSON server with the new position data
    axios
      .post("http://localhost:5000/positions", data)
      .then((response) => {
        addNewPosition(response.data);
        console.log("Position added successfully:", response.data);
        // Clear the form after successful submission
        reset();
      })
      .catch((error) => console.error("Error adding position:", error));
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-[50vw] ml-[5vw] sm:ml-48"
      >
        <input
          type="hidden"
          // {...register("id")}
          // value= "test"
        />
        <div>
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Position Name
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full px-3 py-2 leading-tight border rounded"
          />
          {formState.errors.name && (
            <p className="mt-1 text-sm text-red-500">Name is required</p>
          )}
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <input
            type="text"
            {...register("description", { required: true })}
            className="w-full px-3 py-2 leading-tight border rounded"
          />
          {formState.errors.description && (
            <p className="mt-1 text-sm text-red-500">Description is required</p>
          )}
        </div>
        <div>
          <label
            htmlFor="parentName"
            className="block text-gray-700 font-bold mb-2"
          >
            Parent Position
          </label>
          <select
            {...register("parentName")}
            className="w-full px-3 py-2 leading-tight border rounded"
          >
            <option key="NONE" value={null}>
              NONE
            </option>
            {positions.map((position) => {
              return <option key={position}>{position.name}</option>;
            })}
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-gradient-to-r from-blue-400 to-green-500 rounded hover:bg-green-700 shadow-md"
          >
            Add Position
          </button>
        </div>
      </form>
    </div>
  );
};

export default Position;

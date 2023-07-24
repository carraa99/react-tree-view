import React, { useState, useEffect } from "react";

import { Modal, Button } from "@mantine/core";
import { enabled, disabled } from "../features/dialog/positionSlice";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Alert } from "@mantine/core";

const EditDialog = ({setPositionChanged}) => {
  let selectedPositionId = useSelector(
    (state) => state.position.selectedPositionId
  );
  console.log("seled id from modal", selectedPositionId);
  console.log("the selected position is ", selectedPositionId);
  const editDialog = useSelector((state) => state.dialog.showEditDialog);
  const { register, handleSubmit, reset, formState } = useForm();
  const [positions, setPositions] = useState([]);
  const [positionUpdated, setPositionUpdated] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [selectedPositionName, setSelectedPositionName] = useState("");
  const [selectedPositionDescription, setSelectedPositionDescription] =
    useState("");
  const [selectedPositionParent, setSelectedPositionParent] = useState("");

  const dispatch = useDispatch();
  const handleClose = () => {
    selectedPositionId = null;
      dispatch(disabled());   
    
    
  };
  const parentOptions = positions.filter(
    (position) => position.name !== selectedPositionName
  );
  useEffect(() => {
    // Fetch data from the JSON server using Axios
    axios
      .get("http://localhost:5000/positions")
      .then((response) => setPositions(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [selectedPositionId]);

  useEffect(() => {
    // When the selected position changes, reset the form fields with the new data
    reset({
      name: selectedPositionName,
      description: selectedPositionDescription,
      parentName: selectedPositionParent,
    });
  }, [
    selectedPositionName,
    selectedPositionDescription,
    selectedPositionParent,
  ]);

  useEffect(() => {
    // Assuming you have access to the positionTree in the EditModal component
    const selectedPosition = positions.find(
      (position) => position.id === selectedPositionId
    );
    if (selectedPosition) {
      console.log("the selected position", selectedPosition);
      setSelectedPositionName(selectedPosition.name);
      setSelectedPositionDescription(selectedPosition.description);
      setSelectedPositionParent(selectedPosition.parentName);
    }
  }, [selectedPositionId, positions]);

  const onSubmit = (data) => {
    // Make a PUT request to the JSON server with the updated position data
    axios
      .put(`http://localhost:5000/positions/${selectedPositionId}`, data)
      .then((response) => {
        console.log("Position updated successfully:", response.data);
        setPositionChanged((prevPosition) => !prevPosition)
        setShowSuccessAlert(true);
        // Optionally, you can close the modal or perform any other action upon successful update
        const timer = setTimeout(() => {
          handleClose();
          setShowSuccessAlert(false)
       },2000) 
      })
      .catch((error) => console.error("Error updating position:", error));
  };
   useEffect(() => {
     if (positionUpdated) {
       const timer = setTimeout(() => {
         setPositionUpdated(false);
       }, 2000); // Adjust the duration to 2000ms (2 seconds)

       return () => clearTimeout(timer);
     }
   }, [positionUpdated]);


  return (
    <div>
      <Modal
        opened={editDialog}
        onClose={handleClose}
        title="Edit Position"
        size="lg"
        overlayOpacity={0.6}
        withCloseButton
        style={{ width: "60vw" }}
      >
        {showSuccessAlert && (
          <div className="flex justify-center items-center">
            <Alert title="Success!" color="green" className="w-[20vw] ">
              Position Updated successfully!
            </Alert>
          </div>
        )}
        <div style={{ padding: "16px" }}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
            <input
              type="hidden"
              // {...register("id")}
              // value= "test"
            />
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                Position Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="w-full px-3 py-2 leading-tight border rounded"
                defaultValue={selectedPositionName}
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
                defaultValue={selectedPositionDescription}
              />
              {formState.errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  Description is required
                </p>
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
                defaultValue={selectedPositionParent}
              >
                <option key="NONE" value={null}>
                  NONE
                </option>
                {parentOptions.map((position) => {
                  return <option key={position}>{position.name}</option>;
                })}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 font-bold text-white bg-gradient-to-r from-blue-400 to-green-500 rounded hover:bg-green-700 shadow-md"
              >
                Update Position
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EditDialog;

import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["TXT", "CSV"];

function DragDrop() {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  return (
    <FileUploader handleChange={handleChange} maxSize="1" name="file" types={fileTypes} />
  );
}

export default DragDrop;
import axios from "axios";
import React, { useEffect, useRef } from "react";
import Dropzone from "react-dropzone";

interface PropData {
  images: string[];
  onImageChange: any;
}

const EditFileUpload: React.FC<PropData> = ({ images, onImageChange }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const handleDrop = async (files: File[]) => {
    let formData = new FormData();

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    files.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}product/image`,
        formData,
        config
      );

      onImageChange([...images, response.data.fileNames.flat()]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (index: number) => {
    const filename = images[index];
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}product/delete/image`,
        { filename }
      );
    } catch (error) {
      console.error(error);
    }
    const newImages = [...images];
    newImages.splice(index, 1);
    onImageChange(newImages);
  };

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (scrollRef.current) {
        const scrollAmount = event.deltaY;
        scrollRef.current.scrollLeft += scrollAmount;
      }
    };

    const container = scrollRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        container.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);

  return (
    <div className="fileupload">
      <div className="fileupload_imgbox" ref={scrollRef}>
        {Array.isArray(images) &&
          images?.map((image, index) => (
            <div key={index} style={{ position: "relative" }}>
              <img
                src={`${process.env.REACT_APP_BASE_URL}${image}`}
                alt=""
                style={{ width: 300, height: 200 }}
              />
              <button type="button" onClick={() => handleDelete(index)}>
                x
              </button>
            </div>
          ))}
      </div>
      <Dropzone onDrop={handleDrop} multiple>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()} className="fileupload_text">
              <input {...getInputProps()} />
              <p>
                + <span>사진 추가하기</span>
              </p>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};

export default EditFileUpload;

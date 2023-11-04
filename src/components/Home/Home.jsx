import { useRef, useState } from "react";
import ImageCart from "../ImageCart/ImageCart";
import fileUploadImg from "../../assets/images/loti.gif";
import { img_gallery } from "../Home/Images";

const Home = () => {
  const [selectedImg, setSelectedImg] = useState(img_gallery);
  const [deleteImage, setDeleteImage] = useState([]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const fileInput = useRef();

  // Selected Image Filtering Function
  const handleSelectedImg = (id) => {
    const updateSelectedImg = selectedImg.map((img) => {
      return img.id === id ? { ...img, isChecked: !img.isChecked } : img;
    });

    const deleteItemCount = updateSelectedImg.filter((image) => {
      if (image.isChecked) {
        return image;
      }
    });
    setDeleteImage(deleteItemCount);
    setSelectedImg(updateSelectedImg);
  };

  // Selected Image Delete Function
  const handleDeleteImage = () => {
    const remainingImage = selectedImg.filter((image) => {
      if (!image.isChecked) {
        return image;
      }
    });
    setSelectedImg(remainingImage);
    setDeleteImage([]);
  };

  // File Upload Function
  const handleFileClick = () => {
    fileInput.current.click();
  };
  const handleImageUpload = (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const id = selectedImg.length + i + 1;
      const img_path = URL.createObjectURL(file);
      const newImage = { id, img: img_path, isChecked: false };
      setSelectedImg((prevImg) => [...prevImg, newImage]);
    }
    e.target.value = null;
    console.log(selectedImg);
  };

  // Reset Function
  const handleSelectedChange = () => {
    const updateSelectedImg = selectedImg.map((img) => {
      return { ...img, isChecked: false };
    });
    setSelectedImg(updateSelectedImg);
    setDeleteImage([]);
  };

  // Custom DnD function
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
    setDraggedIndex(index);
  };
  const handleDrop = (e, newIndex) => {
    const startIndex = e.dataTransfer.getData("index");
    const updatedBoxes = [...selectedImg];
    const [draggedBox] = updatedBoxes.splice(startIndex, 1);
    updatedBoxes.splice(newIndex, 0, draggedBox);
    setSelectedImg(updatedBoxes);
    setDraggedIndex(null);
  };
  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (index !== draggedIndex) {
      setDraggedIndex(index);
    }
  };

  return (
    <div className="w-[80%] mx-auto my-10">
      {deleteImage.length > 0 ? (
        <>
          <nav className="flex lg:flex-row md:flex-col flex-col bg-white rounded-t-md justify-between w-[80%] mx-auto py-5 px-4 border-b-2 border-b-slate-300">
            <div className="flex items-center">
              <input
                checked={true}
                onChange={handleSelectedChange}
                className="w-5 h-5"
                type="checkbox"
                name=""
                id=""
              />
              <p className="ml-5 text-2xl font-bold ">
                {deleteImage.length === 1
                  ? `${deleteImage.length} File Selected`
                  : `${deleteImage.length} Files Selected`}
              </p>
            </div>
            <div>
              <button
                onClick={handleDeleteImage}
                className="border-none text-2xl text-red-600 font-medium lg:m-0 md:mt-5 sm:mt-4"
              >
                Delete File
              </button>
            </div>
          </nav>
        </>
      ) : (
        <>
          <nav className=" text-2xl bg-white rounded-t-md font-bold w-[80%] mx-auto py-5 px-4 border-b-2 border-b-slate-300">
            <h1>Gallery</h1>
          </nav>
        </>
      )}

      <section className="grid rounded-b-md bg-white lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 w-[80%] mx-auto py-8 px-5">
        {selectedImg?.map((image, index) => {
          return (
            <ImageCart
              key={index}
              image={image}
              index={index}
              handleSelectedImg={handleSelectedImg}
              handleDrop={handleDrop}
              handleDragStart={handleDragStart}
              draggedIndex={draggedIndex}
              handleDragOver={handleDragOver}
            />
          );
        })}

        <div
          className="relative border-2 border-dashed rounded-md  flex flex-col justify-center items-center w-[100%] cursor-pointer"
          onClick={handleFileClick}
        >
          <img
            className="mx-auto"
            width="1200"
            height="1200"
            src={fileUploadImg}
            alt="Add Images"
          />
        </div>
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleImageUpload}
          accept="image/*"
          ref={fileInput}
        />
      </section>
    </div>
  );
};

export default Home;

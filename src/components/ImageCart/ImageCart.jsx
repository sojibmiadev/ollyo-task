/* eslint-disable react/prop-types */

const ImageCart = ({
  image,
  index,
  handleSelectedImg,
  handleDragStart,
  handleDrop,
  draggedIndex,
  handleDragOver,
}) => {
  return (
    <div
      className={
        index === 0
          ? `lg:col-span-2 lg:row-span-2 md:col-span-2 md:row-span-2 col-span-2 row-span-2  border-4 border-gray-300 rounded-md  relative cursor-grab transition-all ${
              draggedIndex === index ? "border-4 border-gray-600" : ""
            }`
          : `border-2 border-gray-300 rounded-md  relative cursor-grab transition-all ${
              draggedIndex === index ? "border-2 border-gray-600" : ""
            }`
      }
      draggable
      onDragStart={(e) => handleDragStart(e, index)}
      onDrop={(e) => handleDrop(e, index)}
      onDragOver={(e) => handleDragOver(e, index)}
    >
      <img
        src={image.img}
        alt=""
        className={draggedIndex === index ? "scale-50" : ""}
      />
      {/* hover */}
      <div
        className={
          image.isChecked
            ? `bg-[rgba(252,157,157,0.7)] absolute h-full w-full left-0 top-0 bottom-0 right-0  transition-all opacity-50`
            : `bg-[rgba(0,0,0,0.7)] absolute h-full w-full left-0 top-0 bottom-0 right-0 opacity-0 transition-all hover:opacity-50`
        }
      >
        <input
          checked={image.isChecked}
          onChange={() => handleSelectedImg(image.id)}
          className="absolute top-5 left-5 w-5 h-5"
          type="checkbox"
          name="checkbox"
          id="checkbox"
        />
      </div>
    </div>
  );
};

export default ImageCart;

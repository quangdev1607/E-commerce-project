import { memo, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { apiAddVariant } from "../../api";
import { Button, InputForm, Loading } from "../../components";
import { showModal } from "../../store/app/appSlice";
import { formatCash, getBase64, roundCash } from "../../utils/helpers";

const Variants = ({ variants, setVariants, render }) => {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();

  const [preview, setPreview] = useState({
    thumbnail: null,
    images: [],
  });

  const handlePreviewThumbnail = async (file) => {
    const base64Thumb = await getBase64(file);
    setPreview((prev) => ({ ...prev, thumbnail: base64Thumb }));
  };

  const handlePreviewImages = async (files) => {
    const imagesPreview = [];
    for (let file of files) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        alert("File format invalid");
        return;
      }

      const base64Img = await getBase64(file);
      imagesPreview.push({ name: file.name, path: base64Img });
    }
    if (imagesPreview?.length > 0) {
      setPreview((prev) => ({ ...prev, images: imagesPreview }));
    }
  };

  const handleAddVariants = async (data) => {
    if (data.color === variants.color) Swal.fire("Oops", "New color required", "error");
    else {
      const formData = new FormData();
      for (let i of Object.entries(data)) formData.append(i[0], i[1]);
      if (data.thumbnail) formData.append("thumbnail", data.thumbnail[0]);
      if (data.images) {
        for (let image of data.images) formData.append("images", image);
      }
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiAddVariant(formData, variants._id);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response.success) {
        Swal.fire("Done", "Variant added successfully", "success").then(() => {
          reset();
          setPreview({
            thumbnail: null,
            images: [],
          });
          setVariants(null);
          render();
        });
      }
    }
  };

  useEffect(() => {
    reset({
      title: variants?.title,
      price: variants?.price,
      color: variants?.color,
    });
  }, [variants]);

  useEffect(() => {
    if (watch("images")?.length > 0) handlePreviewImages(watch("images"));
  }, [watch("images")]);

  useEffect(() => {
    if (watch("thumbnail")?.length > 0) handlePreviewThumbnail(watch("thumbnail")[0]);
  }, [watch("thumbnail")]);
  return (
    <div className="bg-gray-100">
      <header className="flex items-center justify-between px-4 border-b border-gray-600 h-[75px] ">
        <h1 className="  text-3xl font-semibold ">
          <span>Add Variants</span>
        </h1>
        <Button handleOnClick={() => setVariants(null)} name={"Cancel"} />
      </header>
      <section className="p-4 ">
        <form onSubmit={handleSubmit(handleAddVariants)}>
          <div className="w-full my-6 gap-4">
            <h1>
              Original product name: <span className="text-lg font-semibold">{variants?.title}</span>
            </h1>
            <h1>
              Original Price:{" "}
              <span className="text-lg font-semibold">{`${formatCash(roundCash(variants?.price))} VND`}</span>
            </h1>
            <h1>
              Original Color: <span className="text-lg font-semibold">{variants?.color}</span>
            </h1>
          </div>
          <div className="flex w-full my-6 gap-4">
            <InputForm
              label="Product name"
              register={register}
              errors={errors}
              id="title"
              validate={{
                required: "This field can not be blank",
              }}
              fullWidth
              placeholder={"Type product name..."}
              style={"flex-1"}
            />
            <InputForm
              type="number"
              label="Price"
              register={register}
              errors={errors}
              id="price"
              validate={{
                required: "This field can not be blank",
              }}
              placeholder={"Type product price..."}
              style={"flex-1"}
              fullWidth={true}
            />

            <InputForm
              label="Color"
              register={register}
              errors={errors}
              id="color"
              validate={{
                required: "This field can not be blank",
              }}
              placeholder={"Type product color..."}
              style={"flex-1"}
              fullWidth={true}
            />
          </div>
          <div className="flex flex-col my-8">
            <label htmlFor="thumbnail">Upload thumbnail</label>
            <input
              type="file"
              id="thumbnail"
              {...register("thumbnail", { required: "Thumbnail is required" })}
              errors={errors}
            />
            {errors["thumbnail"] && <small className="text-xs text-main">{errors["thumbnail"]?.message}</small>}
          </div>
          {preview.thumbnail ? (
            <div>
              <img src={preview.thumbnail} alt="thumbnail" className="w-[200px] object-contain" />
            </div>
          ) : (
            <div>
              <img src={variants?.thumbnail} alt="thumbnail" className="w-[200px] object-contain" />
            </div>
          )}
          <div className="flex flex-col my-8">
            <label htmlFor="images">Upload images</label>
            <input type="file" multiple id="images" {...register("images")} errors={errors} />
            {errors["images"] && <small className="text-xs text-main">{errors["images"]?.message}</small>}
          </div>
          {preview?.images.length > 0 ? (
            <div className="flex w-full gap-3 flex-wrap">
              {preview.images.map((img, idx) => (
                <div key={idx} className="w-fit  relative">
                  <img className="w-[250px]" alt="product" src={img.path} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex w-fill gap-3 flex-wrap">
              {variants?.images.map((img, idx) => (
                <div key={idx} className="w-fit relative">
                  <img className="w-[250px] h-[250px] object-contain" alt="product" src={img} />
                </div>
              ))}{" "}
            </div>
          )}

          <Button
            style={"my-4 px-4 py-2 rounded-md text-white bg-main text-semibold hover:opacity-70"}
            type="submit"
            name={"Update new Product"}
          />
        </form>
      </section>
    </div>
  );
};

export default memo(Variants);

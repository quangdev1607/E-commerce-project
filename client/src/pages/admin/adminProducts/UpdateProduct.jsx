import { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { apiUpdateProduct } from "../../../api";
import { Button, InputForm, Loading, Markdown, Select } from "../../../components";
import { showModal } from "../../../store/app/appSlice";
import { getBase64, validate } from "../../../utils/helpers";
import icons from "../../../utils/icons";

const UpdateProduct = ({ editedProduct, render, setEditedProduct }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();
  const { categories } = useSelector((state) => state.app);

  const [payLoad, setPayLoad] = useState({
    description: "",
  });

  const [invalidFields, setInvalidFields] = useState([]);

  const [preview, setPreview] = useState({
    thumbnail: null,
    images: [],
  });

  const changeValue = useCallback(
    (value) => {
      setPayLoad(value);
    },
    [payLoad]
  );

  useEffect(() => {
    reset({
      title: editedProduct?.title || "",
      price: editedProduct?.price || "",
      quantity: editedProduct?.quantity || "",
      color: editedProduct?.color || "",
      category: editedProduct?.category.toUpperCase() || "",
      brand: editedProduct?.brand || "",
    });
    setPayLoad({
      description:
        typeof editedProduct?.description["spec"] === "object"
          ? editedProduct?.description.spec?.join(", ")
          : editedProduct?.description["spec"][0],
    });
  }, [editedProduct]);

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

  const dispatch = useDispatch();
  // const handleUpdateProduct = async (data) => {
  //   const invalids = validate(payLoad, setInvalidFields);
  //   if (invalids === 0) {
  //     if (data.category) data.category = categories?.find((el) => el._id === data.category)?.category;
  //     const finalData = { ...data, ...payLoad };
  //     const formData = new FormData();
  //     for (let i of Object.entries(finalData)) formData.append(i[0], i[1]);
  //     if (finalData.thumbnail) formData.append("thumbnail", finalData.thumbnail[0]);
  //     if (finalData.images) {
  //       for (let image of finalData.images) formData.append("images", image);
  //     }
  //     dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
  //     const response = await apiCreateProduct(formData);
  //     dispatch(showModal({ isShowModal: false, modalChildren: null }));
  //     if (response.success) {
  //       reset();
  //       setPreview({
  //         thumbnail: null,
  //         images: [],
  //       });
  //       setPayLoad({
  //         description: "",
  //       });
  //       Swal.fire("Congratulation!", "Product created successfully", "success");
  //     }
  //   }
  // };

  const handleUpdateProduct = (data) => {
    console.log(data);
  };

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
          <span>Update Product</span>
        </h1>
        <Button handleOnClick={() => setEditedProduct(null)} name={"Cancel"} />
      </header>
      <section className="p-4">
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
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
          />
          <div className="flex w-full my-6 gap-4">
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
              type="number"
              label="Quantity"
              register={register}
              errors={errors}
              id="quantity"
              validate={{
                required: "This field can not be blank",
              }}
              placeholder={"Type product quantity..."}
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
          <div className="flex  w-full gap-4 my-6">
            <Select
              label={"Category"}
              options={categories?.map((el) => ({ code: el.category, value: el.category }))}
              register={register}
              id="category"
              validate={{ required: "Select can not be none" }}
              style={"flex-1"}
              errors={errors}
            />
            <Select
              label={"Brand (optional)"}
              options={categories
                ?.find((el) => el.category === watch("category"))
                ?.brand?.map((el) => ({ code: el.toUpperCase(), value: el }))}
              register={register}
              id="brand"
              style={"flex-1"}
              errors={errors}
            />
          </div>
          <Markdown
            value={payLoad.description}
            label={"Description"}
            name={"description"}
            changeValue={changeValue}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <div className="flex flex-col my-8">
            <label htmlFor="thumbnail">Edit thumbnail</label>
            <input type="file" id="thumbnail" {...register("thumbnail")} errors={errors} />
            {errors["thumbnail"] && <small className="text-xs text-main">{errors["thumbnail"]?.message}</small>}
          </div>
          {preview.thumbnail ? (
            <div>
              <img src={preview.thumbnail} alt="thumbnail" className="w-[200px] object-contain" />
            </div>
          ) : (
            <div>
              <img src={editedProduct?.thumbnail} alt="thumbnail" className="w-[200px] object-contain" />
            </div>
          )}
          <div className="flex flex-col my-8">
            <label htmlFor="images">Edit images</label>
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
              {editedProduct?.images.map((img, idx) => (
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

export default memo(UpdateProduct);

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { apiCreateProduct } from "../../../api";
import { Button, InputForm, Markdown, Select } from "../../../components";
import { getBase64, validate } from "../../../utils/helpers";
import icons from "../../../utils/icons";
const CreateProducts = () => {
  const { IoTrashBin } = icons;
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
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

  const [hoverDelete, setHoverDelete] = useState(null);

  const changeValue = useCallback(
    (value) => {
      setPayLoad(value);
    },
    [payLoad]
  );

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
    if (imagesPreview.length > 0) {
      setPreview((prev) => ({ ...prev, images: imagesPreview }));
    }
  };
  const handleCreateProduct = async (data) => {
    const invalids = validate(payLoad, setInvalidFields);
    if (invalids === 0) {
      if (data.category) data.category = categories?.find((el) => el._id === data.category)?.category;
      const finalData = { ...data, ...payLoad };
      const formData = new FormData();
      for (let i of Object.entries(finalData)) formData.append(i[0], i[1]);
      if (finalData.thumbnail) formData.append("thumbnail", finalData.thumbnail[0]);
      if (finalData.images) {
        for (let image of finalData.images) formData.append("images", image);
      }

      const response = await apiCreateProduct(formData);
      if (response.success) Swal.fire("Congratulation!", "Product created successfully", "success");
    }
  };

  useEffect(() => {
    if (watch("images").length > 0) handlePreviewImages(watch("images"));
  }, [watch("images")]);

  useEffect(() => {
    if (watch("thumbnail").length > 0) handlePreviewThumbnail(watch("thumbnail")[0]);
  }, [watch("thumbnail")]);

  return (
    <main className="w-full">
      <header>
        <h1 className="flex items-center justify-between h-[75px] text-3xl font-semibold px-4 border-b border-gray-600">
          <span>Create new products</span>
        </h1>
      </header>

      <section className="p-4">
        <form onSubmit={handleSubmit(handleCreateProduct)}>
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
              defaultValue={""}
              label={"Category"}
              options={categories.map((el) => ({ code: el._id, value: el.category }))}
              register={register}
              id="category"
              validate={{ required: "Select can not be none" }}
              style={"flex-1"}
              errors={errors}
            />
            <Select
              defaultValue={""}
              label={"Brand (optional)"}
              options={categories
                ?.find((el) => el._id === watch("category"))
                ?.brand.map((el) => ({ code: el, value: el }))}
              register={register}
              id="brand"
              style={"flex-1"}
              errors={errors}
            />
          </div>
          <Markdown
            label={"Description"}
            name={"description"}
            changeValue={changeValue}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
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
          {preview.thumbnail && (
            <div>
              <img src={preview.thumbnail} alt="thumbnail" className="w-[200px] object-contain" />
            </div>
          )}
          <div className="flex flex-col my-8">
            <label htmlFor="images">Upload images</label>
            <input
              type="file"
              multiple
              id="images"
              {...register("images", { required: "Images cannot be blank" })}
              errors={errors}
            />
            {errors["images"] && <small className="text-xs text-main">{errors["images"]?.message}</small>}
          </div>
          {preview?.images.length > 0 && (
            <div className="flex w-full gap-3 flex-wrap">
              {preview.images.map((img, idx) => (
                <div
                  onMouseEnter={() => setHoverDelete(img.name)}
                  onMouseLeave={() => setHoverDelete(null)}
                  key={idx}
                  className="w-fit  relative"
                >
                  <img className="w-[250px]" alt="product" src={img.path} />
                  {hoverDelete === img.name && (
                    <div className="flex items-center justify-center absolute inset-0 backdrop-brightness-50 animate-scale-up-center">
                      <IoTrashBin
                        // onClick={() => {
                        //   setPreview((prev) => ({
                        //     ...prev,
                        //     images: prev.images?.filter((el) => el.name !== img.name),
                        //   }));
                        // }}
                        className="cursor-pointer"
                        size={36}
                        color="white"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <Button
            style={"my-4 px-4 py-2 rounded-md text-white  bg-main text-semibold hover:opacity-70"}
            type="submit"
            name={"Create new Product"}
          />
        </form>
      </section>
    </main>
  );
};

export default CreateProducts;

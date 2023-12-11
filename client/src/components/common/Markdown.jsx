import { Editor } from "@tinymce/tinymce-react";

const Markdown = ({ label, value, changeValue, name, invalidFields, setInvalidFields }) => {
  return (
    <div className="flex flex-col">
      <span>{label}</span>
      <Editor
        apiKey={import.meta.env.VITE_MCETINY}
        // onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={value}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onChange={(e) => changeValue((prev) => ({ ...prev, [name]: e.target.getContent() }))}
        onFocus={() => setInvalidFields && setInvalidFields([])}
      />
      {invalidFields?.some((el) => el.name === name) && (
        <small className="text-main text-sm">{invalidFields?.find((el) => el.name === name)?.msg}</small>
      )}
    </div>
  );
};

export default Markdown;

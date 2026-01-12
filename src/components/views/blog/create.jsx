import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { Accordion, FileInput, Label, TextInput } from "flowbite-react";
// Import MDEditor component correctly
const MDEditor = dynamic(
    () => import("@uiw/react-md-editor").then((module) => module.default),
    { ssr: false }
);

const MDEditorPreview = dynamic(
    () => import("@uiw/react-markdown-preview").then((module) => module.default),
    { ssr: false }
);

function CreateBlog() {
    const [content, setContent] = useState("**Hello world!!!**");
    const {
        register,
        handleSubmit,
        setValue: setFormValue, // Destructure `setValue` from react-hook-form
        formState: { errors },
    } = useForm();

    const onSubmit = async (values) => {
        const data = values;
        data.content = content;
        console.log(data);
    };
    const options = [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
    ];

    return (
        <div className="p-2 card">
            <form className="" onSubmit={handleSubmit(onSubmit)}>
                <div id="fileUpload" className=" mb-4">
                    <div className="mb-2 block">
                        <Label htmlFor="file" value="Title" />
                    </div>
                    <TextInput
                        id="file"
                    />
                </div>
                <div id="fileUpload" className=" mb-4">
                    <div className="mb-2 block">
                        <Label htmlFor="file" value="Thumbnail" />
                    </div>
                    <FileInput
                        id="file"
                    />
                </div>
                {/* Register the hidden input with react-hook-form */}

                <div className="mb-4">
                    <div className="mb-2">
                        <label className="form-label" htmlFor="tag">Category</label>
                    </div>
                    <Select isMulti className="" options={options} />
                </div>
                <div id="fileUpload" className=" mb-4">
                    <label for="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Reading Time</label>
                    <div className="flex">
                        <input type="text" id="website-admin" className="rounded-none rounded-s-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <span className="inline-flex items-center px-3 gap-1 text-sm text-gray-900 bg-gray-200 border border-e-md border-gray-300 rounded-s-0 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <i className="bx bx-time"></i> Minute
                        </span>
                    </div>
                </div>
                <div className="mb-6">
                    <div className="mb-2">
                        <label className="form-label" htmlFor="content">Content</label>
                    </div>
                    <MDEditor preview="edit" value={content} onChange={setContent} />
                </div>
                <div className="mb-4">
                    <Accordion collapseAll>
                        <Accordion.Panel>
                            <Accordion.Title className="p-2">Show Preview</Accordion.Title>
                            <Accordion.Content className="p-0">
                                <MDEditorPreview
                                    source={content}
                                    className="p-3 md:p-4 rounded-lg border border-stroke"
                                />

                            </Accordion.Content>
                        </Accordion.Panel>
                    </Accordion>
                </div>

                <button className="btn !w-full mt-5 mb-3" type="submit">
                    Save
                </button>
            </form>
        </div>
    );
}

export default CreateBlog;

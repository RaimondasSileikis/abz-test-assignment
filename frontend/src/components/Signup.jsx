import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from "react";
import { getToken, createUser, getPositions } from "../services/apiService";

export default function Signup() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        position_id: null,
        photo: null,
    });
    const [positions, setPositions] = useState([]);
    const [createUserError, setCreateUserError] = useState(null);
    const [positionsError, setPositionsError] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(formData.photo || null);

    useEffect(() => {
        const fetchPositions = async () => {
            try {
                const response = await getPositions();
                setPositions(response);
            } catch (error) {
                console.error("Failed to fetch positions:", error.response?.data || "An unexpected error occurred");

                if (error.response?.data) {
                    setPositionsError(error.response.data);
                } else {
                    setPositionsError({ message: "An unexpected error occurred" });
                }
            }
        };
        fetchPositions();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {

        if (e.target.files.length > 0) {
            setFormData({ ...formData, photo: e.target.files[0] });
            setPhotoPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setCreateUserError(null);
        const token = await getToken();

        const submitData = new FormData();
        submitData.append("name", formData.name);
        submitData.append("email", formData.email);
        submitData.append("phone", formData.phone);
        submitData.append("position_id", formData.position_id);
        submitData.append("photo", formData.photo);

        try {
            const response = await createUser(token, submitData);
            alert(response?.message);
        } catch (error) {
            console.error("Registration failed:", error.response?.data || 'An unexpected error occurred');

            if (error.response?.data) {
                setCreateUserError(error.response.data);
            } else {
                setCreateUserError({ message: "An unexpected error occurred" });
            }
        }
        setFormData({ name: "", email: '', phone: '', position_id: null, photo: null, });
        setPhotoPreview(null);
    };

    return (
        <>
            {positionsError?.message && <div className="text-center text-red-800 text-lg">{positionsError.message}</div>}
            {createUserError?.message && <div className="text-center text-red-800 text-lg">{createUserError.message}</div>}
            {createUserError?.fails &&
                Object.entries(createUserError.fails).map(([field, errors], i) => (
                    <div key={i} className="text-center text-red-800 text-sm">
                        {field}: {errors.join(", ")}
                    </div>
                ))}
            <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
                <form onSubmit={handleSubmit} >
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                                        Name
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"></div>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:col-span-4">
                                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                        Email
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:col-span-4">
                                    <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900">
                                        Phone
                                    </label>
                                    <div className="mt-2">
                                        <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                            <input
                                                type="text"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="photo" className="block text-sm/6 font-medium text-gray-900">
                                        Photo
                                    </label>
                                    <div className="mt-2 flex items-center gap-x-3">
                                        {!photoPreview && <UserCircleIcon aria-hidden="true" className="size-12 text-gray-300" />}
                                        {photoPreview && (
                                            <>
                                                <img
                                                    src={photoPreview}
                                                    className="mt-2 align-middle justify-center items-center gap-x-3 size-12 object-cover rounded-full"
                                                />

                                                <div className="mt-4 flex text-sm/6 text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                                                    >
                                                        <span>Change</span>
                                                        <input id="file-upload" name="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="sr-only" />
                                                    </label>
                                                </div>
                                            </>)}
                                    </div>
                                </div>
                                {!photoPreview && <div className="col-span-full">
                                    <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-900">
                                        Cover photo
                                    </label>
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                                            <div className="mt-4 flex text-sm/6 text-gray-600">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                                                >
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" name="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="sr-only" />
                                                </label>

                                            </div>
                                            <p className="text-xs/5 text-gray-600">JPG, JPEG up to 5MB</p>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                        </div>
                        <div className="border-b border-gray-900/10 pb-12">
                            <div className="mt-10 space-y-10">
                                <fieldset>
                                    <legend className="text-sm/6 font-semibold text-gray-900">Select Position</legend>
                                    <div className="mt-6 space-y-6">
                                        {positions.length && positions.map((pos) => (
                                            <div key={pos.id} className="flex items-center gap-x-3">
                                                <input
                                                    id={`position-${pos.id}`}
                                                    name="position_id"
                                                    type="radio"
                                                    value={pos.id}
                                                    checked={formData.position_id === pos.id.toString()}
                                                    onChange={handleChange}
                                                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white
                                                            before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden
                                                            checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2
                                                            focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300
                                                            disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                                                />
                                                <label
                                                    htmlFor={`position-${pos.id}`}
                                                    className="block text-sm/6 font-medium text-gray-900"
                                                >
                                                    {pos.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem('passwords');
        if (passwords) {
            setpasswordArray(JSON.parse(passwords));
        }
    }, [])

    const showPassword = (params) => {
        // passwordRef.current.type = "text";
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png";
            passwordRef.current.type = "password";
        }
        else {
            ref.current.src = "icons/eyecross.png";
            passwordRef.current.type = "text";
        }
    }

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length) {
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log(passwordArray);
            setform({ site: "", username: "", password: "" })
            savePass();
        }
        else {
            toast("Error : Password not saved!")
        }
    }

    const deletePassword = (id) => {
        console.log("delteing password with id : ", id);
        let c = confirm("do you really want to delete?");
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id));
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        }
        deletePass();
    }

    const editPassword = (id) => {
        console.log("editing password with id : ", id);
        setform(passwordArray.filter(item => item.id === id)[0]);
        setpasswordArray(passwordArray.filter(item => item.id !== id));
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    // const copyText = (text) => {
    //     toast('copied to clickboard!', {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: false,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //         transition: "Bounce",
    //     });
    //     navigator.clipboard.writeText(text);
    // }
    const copyToClipboard = () => {
        const id = toast("Copied to clipboard!");
        setTimeout(() => toast.dismiss(id), 5000);
    };
    const deletePass = () => {
        const id = toast("Password deleted!");
        setTimeout(() => toast.dismiss(id), 5000);
    };
    const savePass = () => {
        const id = toast("Password saved!");
        setTimeout(() => toast.dismiss(id), 5000);
    };

    return (
        <>
            {/* <ToastContainer
                position="top-right"
                autoClose= {5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            /> */}
            <ToastContainer position="top-right" autoClose={3000} theme="dark" />

            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

            <div className="min-h-[85.5vh] pt-3 container py-1 mx-auto">

                <h1 className='text-4xl text font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center font-semibold'>Your Own Password Manager</p>
                <div className='flex flex-col p-4 text-black gap-8 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='bg-white rounded-full border border-green-500 w-full px-4 py-1' type="text" name='site' id='site' />
                    <div className='flex flex-col md:flex-row w-full justified-between gap-8'>
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='bg-white rounded-full border border-green-500 w-full px-4 py-1' type="text" name='username' id='username' />

                        <div className='relative'>
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='bg-white rounded-full border border-green-500 w-full px-4 py-1' type="password" name='password' id='password' />
                            <span className='absolute right-1 top-0 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={35} src="icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='flex justify-center items-center bg-green-500 hover:bg-green-400 rounded-full px-8 py-2 w-fit gap-2 border border-green-900 font-semibold'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>Save
                    </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>no passwords to show</div>}

                    {passwordArray?.length > 0 && (
                        <table className="table-auto w-full rounded-xl overflow-hidden border border-white border-collapse mb-10">
                            <thead className="bg-green-800 text-white">
                                <tr>
                                    <th className="py-2 border border-white">Site</th>
                                    <th className="py-2 border border-white">Username</th>
                                    <th className="py-2 border border-white">Password</th>
                                    <th className="py-2 border border-white">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-green-100">
                                {passwordArray.map((item, index) => (
                                    <tr key={index} className="border border-white">

                                        <td className="border border-white text-center py-2 px-4">
                                            <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                                                <a href={item.site} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                                    {item.site}
                                                </a>
                                                <div className="lordiconcopy text-center" onClick={() => copyText(item.site)}>
                                                    <button onClick={copyToClipboard}
                                                        className="relative bg-black w-24 h-8 border-none rounded-lg font-semibold cursor-pointer overflow-hidden transition-all duration-700 hover:bg-blue-700 active:bg-blue-900"
                                                    >
                                                        <span
                                                            className="absolute text-blue-200 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 transition-all duration-500 peer-focus:text-blue-300 peer-focus:opacity-0 peer-focus:-translate-y-full"
                                                        >
                                                            Copy
                                                        </span>
                                                        <span
                                                            className="absolute text-blue-300 opacity-0 transform translate-y-full -translate-x-1/2 left-1/2 top-1/2 transition-all duration-500 peer-focus:opacity-100 peer-focus:translate-y-0"
                                                        >
                                                            Copied
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="border border-white text-center py-2 px-4">
                                            <div className="flex flex-col md:flex-row  justify-center items-center gap-2">
                                                {item.username}
                                                <div className="lordiconcopy text-center" onClick={() => copyText(item.username)}>
                                                    <button onClick={copyToClipboard}
                                                        className="relative bg-black w-24 h-8 border-none rounded-lg font-semibold cursor-pointer overflow-hidden transition-all duration-700 hover:bg-blue-700 active:bg-blue-900"
                                                    >
                                                        <span
                                                            className="absolute text-blue-200 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 transition-all duration-500 peer-focus:text-blue-300 peer-focus:opacity-0 peer-focus:-translate-y-full"
                                                        >
                                                            Copy
                                                        </span>
                                                        <span
                                                            className="absolute text-blue-300 opacity-0 transform translate-y-full -translate-x-1/2 left-1/2 top-1/2 transition-all duration-500 peer-focus:opacity-100 peer-focus:translate-y-0"
                                                        >
                                                            Copied
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="border border-white text-center py-2 px-4">
                                            <div className="flex flex-col md:flex-row  justify-center items-center gap-2">
                                                {item.password}
                                                <div className="lordiconcopy text-center" onClick={() => copyText(item.password)}>
                                                    <button onClick={copyToClipboard}
                                                        className="relative bg-black w-24 h-8 border-none rounded-lg font-semibold cursor-pointer overflow-hidden transition-all duration-700 hover:bg-blue-700 active:bg-blue-900"
                                                    >
                                                        <span
                                                            className="absolute text-blue-200 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 transition-all duration-500 peer-focus:text-blue-300 peer-focus:opacity-0 peer-focus:-translate-y-full"
                                                        >
                                                            Copy
                                                        </span>
                                                        <span
                                                            className="absolute text-blue-300 opacity-0 transform translate-y-full -translate-x-1/2 left-1/2 top-1/2 transition-all duration-500 peer-focus:opacity-100 peer-focus:translate-y-0"
                                                        >
                                                            Copied
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="border border-white text-center py-2 px-4">
                                            <span onClick={() => { editPassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wloilxuq.json"
                                                    trigger="hover"
                                                    colors="primary:#121331,secondary:#08a88a">
                                                </lord-icon>
                                            </span>
                                            <span onClick={() => { deletePassword(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/kfzfxczd.json"
                                                    trigger="hover"
                                                    colors="primary:#08a88a,secondary:#ff4444">
                                                </lord-icon>
                                            </span>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div >
            </div >
        </>
    )
}

export default Manager

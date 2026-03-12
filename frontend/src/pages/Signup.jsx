import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../slices/authSlice";
export const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        try{
            await dispatch(signup({name,email,password})).unwrap();
            navigate("/login");
        } catch(err){
            console.log(err);
        }


    }
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="p-10 border border-black rounded">
                <form onSubmit = {handleSubmit} className="flex flex-col gap-10">
                    <label>
                        Name
                        <input 
                            className="ml-11 border rounded p-1"
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                        />
                        </label>
                    <label>
                        Email
                        <input 
                            className="ml-12 border rounded p-1"
                            type="text"
                            name="email"
                            placeholder="Enter Email"
                        />
                        </label>
                        <label>
                            Password
                            <input 
                                type="password"
                                name="password"
                                placeholder="Enter Password"
                                className="ml-5 border rounded p-1"
                            />
                        </label>
                        <button type="submit" className="bg-blue-500 text-white px-1 py-3 border rounded ">Signup</button>
                </form>
            </div>

        </div>
    )
}
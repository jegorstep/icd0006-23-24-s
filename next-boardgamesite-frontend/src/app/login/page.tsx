"use client"
import {useContext, useState} from "react";
import {AppContext} from "@/state/AppContext";

import AccountService from "@/services/AccountService";
import {useRouter} from "next/navigation";


export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState("admin@eesti.ee");
    const [pwd, setPwd] = useState("Kala.maja1");

    const [pwdValidationError, setPwdValidationError] = useState("");
    const [emailValidationError, setEmailValidationError] = useState("");

    const {userInfo, setUserInfo} = useContext(AppContext)!;

    const validateAndLogin = async () => {
        if (email.length < 5) {
            setEmailValidationError("Invalid email length")
        } else {
            setEmailValidationError("")
        }
        if (pwd.length < 6) {
            setPwdValidationError("Invalid pwd length")
        } else {
            setPwdValidationError("")
        }
        const response = await AccountService.login(email, pwd);
        if (response.data) {
            setUserInfo(response.data);
            router.push('/')

        }
        if (response.errors && response.errors.length > 0) {
            setEmailValidationError(response.errors[0]);
        }
    }

    return (

        <div className="row">
            <div className="col-md-5">
                <h2>Log In</h2>
                <hr/>
                <div className={`text-danger error-input ${emailValidationError ? 'visible' : ''}`}
                     role="alert">{emailValidationError}</div>
                <div className="form-floating mb-3">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email" id='email' className="form-control" autoComplete="email"
                        placeholder="name@example.com"/>
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                </div>
                <div className={`text-danger error-input ${pwdValidationError ? 'visible' : ''}`}
                     role="alert">{pwdValidationError}</div>
                <div className="form-floating mb-3">
                    <input
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        type="password" id='password' className="form-control" autoComplete="current-password"
                        placeholder="password"/>
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                </div>
                <div>
                    <button onClick={(e) => validateAndLogin()} className="w-100 btn btn-lg btn-primary">Login
                    </button>
                </div>
            </div>
        </div>
    );
}

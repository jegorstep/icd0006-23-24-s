"use client"
import {useContext, useState} from "react";
import {AppContext} from "@/state/AppContext";

import AccountService from "@/services/AccountService";
import {redirect, useRouter} from "next/navigation";

export default function Register() {
    const router = useRouter();
    const [email, setEmail] = useState("admin@eesti.ee");
    const [pwd, setPwd] = useState("Kala.maja1");
    const [firstName, setFirstName] = useState("Jegor");
    const [lastName, setLastName] = useState("Stepanov");
    const [country, setCountry] = useState("Eesti");
    const [sex, setSex] = useState("");

    const [pwdValidationError, setPwdValidationError] = useState("");
    const [emailValidationError, setEmailValidationError] = useState("");
    const [firstNameValidationError, setFirstNameValidationError] = useState("");
    const [lastNameValidationError, setLastNameValidationError] = useState("");
    const [countryValidationError, setCountryValidationError] = useState("");
    const [sexValidationError, setSexValidationError] = useState("");

    const [isError, setError] = useState("False");


    const {userInfo, setUserInfo} = useContext(AppContext)!;

    const validateAndRegister = async () => {
        if (email.length < 5) {
            setEmailValidationError("Invalid email length");
            setError("True");
        } else {
            setEmailValidationError("");
        }
        if (pwd.length < 6) {
            setPwdValidationError("Invalid pwd length");
            setError("True");
        } else {
            setPwdValidationError("");
            setError("True");
        }
        if (firstName.length < 1) {
            setFirstNameValidationError("Must be at least one character long first name!");
            setError("True");
        } else {
            setFirstNameValidationError("");
        }
        if (lastName.length < 1) {
            setLastNameValidationError("Must be at least one character long last name!");
            setError("True");
        } else {
            setLastNameValidationError("");
        }
        if (country.length < 1) {
            setCountryValidationError("Country name must be at least one character long!");
            setError("True");
        } else {
            setCountryValidationError("");
        }
        if (sex.length === 0) {
            setSexValidationError("Choose your sex!");
            setError("True");
        } else {
            setSexValidationError("")
        }

        if (isError === "True") {
            setError("False")
        } else {
            const response = await AccountService.register(email, pwd, firstName, lastName, country, sex);
            if (response.data) {
                setUserInfo(response.data);
            }
            if (response.errors && response.errors.length > 0) {
                setEmailValidationError('Email already exist!');
            }
        }
    }

    if (userInfo) {
        router.push("/");
        return null;
    }
    else {

        return (

            <div className="row">
                <div className="col-md-5">
                    <h2>Registration</h2>
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
                    <div className={`text-danger error-input ${firstNameValidationError ? 'visible' : ''}`}
                         role="alert">{firstNameValidationError}</div>
                    <div className="form-floating mb-3">
                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            type="firstName" id='firstName' className="form-control" autoComplete="name"
                            placeholder="Tamm"/>
                        <label htmlFor="firstName" className="form-label">
                            First Name
                        </label>
                    </div>
                    <div className={`text-danger error-input ${lastNameValidationError ? 'visible' : ''}`}
                         role="alert">{lastNameValidationError}</div>
                    <div className="form-floating mb-3">
                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            type="lastName" id='lastName' className="form-control" autoComplete="family-name"
                            placeholder="Saar"/>
                        <label htmlFor="lastName" className="form-label">
                            Last Name
                        </label>
                    </div>
                    <div className={`text-danger error-input ${countryValidationError ? 'visible' : ''}`}
                         role="alert">{countryValidationError}</div>
                    <div className="form-floating mb-3">
                        <input
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            type="country" id='country' className="form-control" autoComplete="country"
                            placeholder="Estonia"/>
                        <label htmlFor="country" className="form-label">
                            Country
                        </label>
                    </div>
                    <div className={`text-danger error-input ${sexValidationError ? 'visible' : ''}`}
                         role="alert">{sexValidationError}</div>
                    <div className="form-floating mb-3">
                        <select id="sex" className="form-select" value={sex} onChange={(e) => setSex(e.target.value)}>
                            <option value=""></option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        <label htmlFor="sex" className="form-label">
                            Sex
                        </label>
                    </div>

                    <div>
                        <button onClick={(e) => validateAndRegister()}
                                className="w-100 btn btn-lg btn-primary">Register
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
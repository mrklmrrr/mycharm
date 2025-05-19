import { Input, Avatar, Checkbox, Loading } from "@nextui-org/react";
import { useRef, useState } from "react";
import { UseSignUp } from "./hooks/useSignup";
import { motion } from "framer-motion";
import {
  UserCircleIcon,
  UserIcon,
  LockOpenIcon,
  LockClosedIcon,
  LinkIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import svgOne from "../../assets/AuthAssets/One.svg";
import svgTwo from "../../assets/AuthAssets/two.svg";
import shirt from "../../assets/AuthAssets/shirt.svg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const { signup, isLoading } = UseSignUp();

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[A-Z])[a-zA-Z0-9]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = async () => {
    // Проверка, если пользователь уже существует
    if (localStorage.getItem("user")) {
      navigate("/home", { replace: true });
      return;
    }

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Валидация имени пользователя
    if (username.length < 3 || username.length > 10) {
      toast.dismiss();
      toast.error("Username must be between 3 and 10 characters");
      return;
    }

    // Валидация email
    if (!validateEmail(email)) {
      toast.dismiss();
      toast.error("Please enter a valid email address");
      return;
    }

    // Валидация пароля
    if (!validatePassword(password)) {
      toast.dismiss();
      toast.error(
        "Password must be at least 6 characters, contain one uppercase letter, one digit, and no special characters"
      );
      return;
    }

    // Если все проверки пройдены, выполняем регистрацию
    await signup(username, email, password);
  };

  return (
    <div className="flex flex-col overflow-hidden md:relative md:h-screen md:justify-center">
      <section className="grid w-screen place-content-end">
        <img src={svgOne} className="w-60 justify-end pt-10 md:hidden" />
        <img
          src={shirt}
          className="w-70 absolute bottom-0 hidden -translate-x-12 translate-y-16 rotate-45 pt-10 opacity-20 md:block"
        />
      </section>
      <section className="flex flex-col items-center">
        <p className="my-6 text-6xl font-bold text-black opacity-30">
          Let’s Start
        </p>
        <div className="py-4">
          <Input
            aria-label="Username"
            clearable
            underlined
            placeholder="Username"
            className="h-12 w-80"
            contentRight={<UserIcon className="w-32" />}
            ref={usernameRef}
          />
        </div>
        <div className="py-4">
          <Input
            aria-label="Email"
            clearable
            underlined
            placeholder="Email"
            className="h-12 w-80"
            contentRight={<EnvelopeIcon className="w-32" />}
            ref={emailRef}
          />
        </div>
        <div>
          <Input.Password
            aria-label="password"
            clearable
            underlined
            placeholder="Password"
            visibleIcon={<LockOpenIcon fill="currentColor" className="w-32" />}
            hiddenIcon={<LockClosedIcon fill="currentColor" className="w-32" />}
            className="h-12 w-80"
            ref={passwordRef}
          />
        </div>
        {isLoading ? (
          <button className="mt-8 h-12 w-80 rounded bg-btnColor font-semibold text-white">
            <Loading color={"currentColor"} />
          </button>
        ) : (
          <motion.button
            className="mt-8 h-12 w-80 rounded bg-btnColor font-semibold text-white"
            onClick={handleSignup}
            whileTap={{ scale: 0.9 }}
          >
            Create an account
          </motion.button>
        )}
        <p className="mt-4 flex text-sm text-btnColor">
          Already have an account?
          <Link to="/" className="flex pl-2 font-semibold">
            Sign in <LinkIcon className="w-4 pl-1" />
          </Link>
        </p>
        <div className="fixed bottom-0 mb-5 flex flex-col items-center text-2xl opacity-40">
          <p className="LogoFont mx-2">MyCharm</p>
          <p className="pt-2 text-xs font-bold opacity-60">
            Your virtual closet.
          </p>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
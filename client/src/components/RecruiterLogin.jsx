import { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RecruiterLogin = () => {
  const navigate = useNavigate();

  const [state, setState] = useState('Login');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(false);
  const [isTextDataSubmited, setIsTextDataSubmited] = useState(false);

  const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } =
    useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === 'Sign Up' && !isTextDataSubmited) {
      return setIsTextDataSubmited(true);
    }

    try {
      if (state === 'Login') {
        const { data } = await axios.post(backendUrl + '/api/company/login', {
          email,
          password,
        });

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem('companyToken', data.token);
          setShowRecruiterLogin(false);
          navigate('/dashboard');
        } else {
          toast.error(data.message);
        }
      } else {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('password', password);
        formData.append('email', email);
        formData.append('image', image);

        const { data } = await axios.post(
          backendUrl + '/api/company/register',
          formData
        );

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem('companyToken', data.token);
          setShowRecruiterLogin(false);
          navigate('/dashboard');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 🔥 Overlay that dims glitch background */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={() => setShowRecruiterLogin(false)}
      ></div>

      {/* 🔥 Login modal box */}
      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500 shadow-xl max-w-md w-full z-50"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          Recruiter {state}
        </h1>
        <p className="text-sm mb-3">Welcome back! Please sign in to continue</p>

        {state === 'Sign Up' && isTextDataSubmited ? (
          <>
            <div className="flex items-center gap-4 my-10">
              <label htmlFor="image">
                <img
                  className="w-16 h-16 object-cover rounded-full border"
                  src={
                    image ? URL.createObjectURL(image) : assets.upload_area
                  }
                  alt=""
                />
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                />
              </label>
              <p>
                Upload Company <br /> logo
              </p>
            </div>
          </>
        ) : (
          <>
            {state !== 'Login' && (
              <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                <img src={assets.person_icon} alt="" />
                <input
                  className="outline-none text-sm flex-1"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Company Name"
                  required
                />
              </div>
            )}

            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.email_icon} alt="" />
              <input
                className="outline-none text-sm flex-1"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email Id"
                required
              />
            </div>

            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.lock_icon} alt="" />
              <input
                className="outline-none text-sm flex-1"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
              />
            </div>
          </>
        )}

        {state === 'Login' && (
          <p className="text-sm text-blue-600 mt-4 cursor-pointer">
            Forgot password?
          </p>
        )}

        <button
          type="submit"
          className="bg-blue-600 w-full text-white py-2 rounded-full mt-4 hover:bg-blue-700 transition"
        >
          {state === 'Login'
            ? 'login'
            : isTextDataSubmited
            ? 'create account'
            : 'next'}
        </button>

        {state === 'Login' ? (
          <p className="mt-5 text-center">
            Don't have an account?{' '}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState('Sign Up')}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{' '}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState('Login')}
            >
              Login
            </span>
          </p>
        )}

        <img
          onClick={() => setShowRecruiterLogin(false)}
          className="absolute top-5 right-5 cursor-pointer w-4 h-4"
          src={assets.cross_icon}
          alt="close"
        />
      </form>
    </div>
  );
};

export default RecruiterLogin;

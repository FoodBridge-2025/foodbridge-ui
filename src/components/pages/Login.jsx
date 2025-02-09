import { useEffect, useState } from "react";
import { API_URL } from '../../App';
const OPENSTREETMAP_URL = import.meta.env.VITE_OSM_URL;
const MODEL = import.meta.env.VITE_KAUSHAL_API_URL;

function Signup({ handleSignup }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    institutionName: '',
    address: '',
    phoneNumber: '',
    logo: null
  });
  const [link, setLink] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name: formData.institutionName,
      address: formData.address,
      contact: formData.phoneNumber,
      email: formData.email,
      password: formData.password
    };

    console.log(userData);
    try {
      const response1 = await fetch(`${OPENSTREETMAP_URL}?q=${userData.address}&format=json`)
      const dataFromAPI = await response1.json();

      const lat = dataFromAPI[0]["lat"];
      const long = dataFromAPI[0]["lon"];

      userData["latitude"] = parseFloat(lat);
      userData["longitude"] = parseFloat(long);

      console.log(userData);
      const response2 = await fetch(`${API_URL}/community-centres/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response2.json();
      console.log(data);

      if (response2.ok) {
        handleSignup(data);
      } else {
        console.error('Registration failed:', data);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        logo: file
      });
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (link) {
        const response = await fetch(`${MODEL}/autofill?link=${link}`);
        const autofillData = await response.json();
        const { operationalDays, operationalHours, pantryAddress, pantryName, pantryPhoneNumber } = autofillData;

        setFormData({
          ...formData,
          institutionName: pantryName,
          address: pantryAddress,
          phoneNumber: pantryPhoneNumber
        });
        return autofillData
      }
    }
    fetchData();
  }, [link]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          name="institutionName"
          placeholder="Institution Name"
          value={formData.institutionName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <textarea
          className="form-control"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          rows="2"
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="tel"
          className="form-control"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Institution Logo</label>
        <input
          type="file"
          className="form-control"
          name="logo"
          accept="image/*"
          onChange={handleLogoChange}
          required
        />
        {previewUrl && (
          <div className="mt-2 text-center">
            <img
              src={previewUrl}
              alt="Logo preview"
              className="img-thumbnail"
              style={{ maxHeight: '100px' }}
            />
          </div>
        )}
      </div>

      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          name="link"
          placeholder="Autofill the form with your institution's website link"
          value={link}
          onChange={handleLinkChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-success w-100 mb-3">
        Register
      </button>
    </form>
  );
}

function Login({ handleLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: formData.email,
      password: formData.password
    };

    console.log(userData);
    try {
      const response = await fetch(`${API_URL}/community-centres/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        handleLogin(data);
      } else {
        console.error('Login failed:', data);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-success w-100 mb-3">
        Login
      </button>
    </form>
  );
}

export default function Auth({ handleLogin, handleSignup }) {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">
            {isSignup ? 'Register Community Center' : 'Login'}
          </h2>

          {isSignup ? <Signup handleSignup={handleSignup} /> : <Login handleLogin={handleLogin} />}

          <div className="text-center">
            <button
              className="btn btn-link"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

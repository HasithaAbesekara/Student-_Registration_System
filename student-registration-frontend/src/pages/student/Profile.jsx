import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getStudentProfile } from "../../api/studentApi";
import ProfileForm from "../../components/student/ProfileForm";
import ProfilePicture from "../../components/student/ProfilePicture";

const Profile = () => {
  const { token } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getStudentProfile(token);
        setProfile(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load profile: " + error.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handlePictureUpdate = (newPictureUrl) => {
    setProfile({
      ...profile,
      profilePicture: newPictureUrl,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Student Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ProfileForm profile={profile} />
          </div>
          <div>
            <ProfilePicture
              currentPicture={profile?.profilePicture}
              onPictureUpdate={handlePictureUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import userContext from "../context/user/UserContext";
import defaultImg from "../../images/def2small.png"; 
import Loading from "../LoadingDots"; 

const ProfileContainer = styled.div`
   padding: 50px 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileWrapper = styled.div`
display: flex;
  flex-direction: column;
  width: 100%;
  height: 80%;
  justify-content: center;
  align-items: center;
  gap: 50px;
  margin:auto;
  padding: 0 0 75px 0;
  @media (max-width: 768px) {
  padding: 0;
`;

const AvatarWrapper = styled.div`
 display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid grey;
  border-radius: 50%;
  box-shadow: 0 0 25px 0 rgba(249, 241, 241, 0.1);
  padding: 2.5px;
`;

const Avatar = styled.img`
   width: 175px;
  height: 175px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 25px 0 rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 130px;
    height: 130px;
  }
`;

const ProfileDetails = styled.div`
 display: flex;
  flex-direction: column;
  gap: 15px;
  color: #333;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  color:rgb(178, 180, 180) ;
  gap: 15px;
  width : 100%;
  border: 1px solid #444;
  border-radius: 10px;
  padding-right: 10px;
  font-weight: 500;

  @media (max-width: 768px) {
 
    font-size: 15px;
    text-align: center;
  }
`;
const Field = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  background-color:rgb(62, 64, 65) ;
  color: #fff;
   border-radius: 10px 2px 2px 10px;
  width: 75px;

  @media (max-width: 768px) {
    width:50px;
  }
`;

const YourProfile = () => {
  const { user, fetchUser } = useContext(userContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        await fetchUser();
        // console.log(user)
      
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchData();
        // eslint-disable-next-line
  }, []);

  const handleError = (e) => {
    e.target.src = defaultImg;
  };

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", minHeight: "50vh" }}>
        <Loading />
      </div>
    );
  }

  return (
    <ProfileContainer>
      
      {user && (
        <ProfileWrapper>
          
            <AvatarWrapper>
              <Avatar
                src={user.photoURL || defaultImg} 
                alt="User Avatar"
                onError={handleError} 
              />
            </AvatarWrapper>
          

          <ProfileDetails>
            <Detail>
              <Field>Name</Field> {user.name}
            </Detail>
            <Detail>
              <Field>Email</Field> {user.email}
            </Detail>
          </ProfileDetails>
        </ProfileWrapper>
      )}
    </ProfileContainer>
  );
};

export default YourProfile;

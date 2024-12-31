import React, { useState, useContext } from "react";
import styled from "styled-components";
import userContext from "../context/user/UserContext";

// Styled-components for Change Password Layout
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60vh;
`;

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 1rem;
`;

const ChangePasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 550px;
  height: 85%;
  min-height: 300px;
  margin: 0 auto;
  padding: 10px 20px 20px;
  background-color: #2e2e2e;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-bottom: 10px;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const FormTitle = styled.h3`
  font-size: 16px;
  color: #ffd700;
  margin-bottom: 10px;
  text-align: center;
  background-image: linear-gradient(45deg, #ffd700, #ff8c00);
  -webkit-background-clip: text;
  color: transparent;
`;

const RadioButtonLabel = styled.label`
  font-size: 12px;
  color: #ccc;
  margin-bottom: 10px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #ccc;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 5px;
  font-size: 14px;
  border: 1px solid #444;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  width: 100%;
  box-sizing: border-box;
  transition: background-color 0.3s ease;

  &:focus {
    background-color: #444;
    outline: none;
    border-color: #ff8c00;
  }
`;

const SubmitButton = styled.button`
  padding: 12px;
  font-size: 14px;
  background-color: rgb(206, 99, 6);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(214, 50, 17);
  }

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
`;

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authMethod, setAuthMethod] = useState("manual");
  const { changePassword } = useContext(userContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await changePassword(currentPassword, newPassword);
      if (result.success) {
        alert("Your password has been successfully updated!");
      } else {
        alert(result.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || "An error occurred while changing the password.";
        alert(errorMessage);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAuthMethodChange = (e) => {
    setAuthMethod(e.target.value);
  };

  return (
    <Container>
      <AuthContainer>
        <FormTitle>Choose Your Authentication Method</FormTitle>

        <RadioButtonLabel>
          <input
            type="radio"
            name="authMethod"
            value="google"
            onChange={handleAuthMethodChange}
            checked={authMethod === "google"}
          />
          Google Authentication (You can't change your password here)
        </RadioButtonLabel>

        <RadioButtonLabel>
          <input
            type="radio"
            name="authMethod"
            value="manual"
            onChange={handleAuthMethodChange}
            checked={authMethod === "manual"}
          />
          Manual Authentication (Change your password)
        </RadioButtonLabel>
      </AuthContainer>

      <ChangePasswordContainer>
        <TopSection>
          {authMethod === "google" && (
            <ErrorMessage>
              Sorry, you cannot change your password with Google authentication.
            </ErrorMessage>
          )}
        </TopSection>

        <FormSection>
          {authMethod === "manual" && (
            <Form onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Change Password"}
              </SubmitButton>
            </Form>
          )}
        </FormSection>
      </ChangePasswordContainer>
    </Container>
  );
};

export default ChangePassword;

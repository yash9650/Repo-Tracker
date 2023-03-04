import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import appAxios, { AppAxiosResponse } from "../../axios/AppAxios";
import { Role } from "../../models/User";

const LoginAndRegister: React.FC = () => {
  const [newUser, setNewUser] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<{
    username: string;
    password: string;
    role?: string | undefined;
  }>({
    defaultValues: {
      username: "",
      password: "",
      role: undefined,
    },
  });

  const submitHandler = async (formData) => {
    if (!formData.role && newUser) {
      return setError("role", {
        type: "manual",
        message: "Please select a role",
      });
    }
    console.log(formData);

    try {
      const loginResponse: AppAxiosResponse = await appAxios({
        url: "/api/auth/login",
        method: "POST",
        data: formData,
      });
      if (loginResponse.data.success) {
        const data = loginResponse.data.data;
        localStorage.setItem("userData", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formstate = watch();
  return (
    <Form
      onSubmit={handleSubmit(submitHandler)}
      className="login-register-form"
    >
      <Form.Group className="mb-3">
        <Form.Label>User Name</Form.Label>
        <Form.Control
          {...register("username", { minLength: 4 })}
          type="text"
          placeholder="enter your name"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          {...register("password", { minLength: 8 })}
          type="password"
          placeholder="enter your password"
          required
        />
      </Form.Group>
      {newUser && (
        <Form.Group className="mb-3">
          <Form.Label>Select role:</Form.Label>
          <Form.Select {...register("role")}>
            <option value="">select..</option>
            <option value={Role.DEVELOPER}>Developer</option>
            <option value={Role.TESTER}>Tester</option>
          </Form.Select>
          {errors.role && <p className="text-danger">{errors.role?.message}</p>}
        </Form.Group>
      )}
      <Form.Group className="mb-3">
        <Form.Control type="submit" value={newUser ? "register" : "login"} />
      </Form.Group>
      {!newUser ? (
        <p
          className="fs-6 new-user-btn pt-0"
          onClick={() => {
            setNewUser(true);
          }}
        >
          Create new user?
        </p>
      ) : (
        <p
          className="fs-6 new-user-btn"
          onClick={() => {
            setNewUser(false);
            setValue("role", undefined);
          }}
        >
          Already registered?
        </p>
      )}
    </Form>
  );
};

export default LoginAndRegister;

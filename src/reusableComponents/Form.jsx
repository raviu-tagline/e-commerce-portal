/* eslint-disable */
import React from "react";
import { useForm } from "react-hook-form";
import { Form, Input } from "reactstrap";
// import yupValidation from "../reusableContents/yupValidation";
// import { yupResolver } from "@hookform/resolvers/yup";

// {
//     resolver: yupResolver(yupValidation()),
//   }

const Forms = ({ content, onSubmit, isUpdate }) => {
  const { register, handleSubmit /* , errors */ } = useForm();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {content.inputs.map((s, key) => {
        return (
          <div
            className={
              s.type != "radio"
                ? "form-group"
                : "form-check form-check-inline col-5"
            }
          >
            <input
              type={s.type}
              value={s.value}
              {...register(s.name, { required: true })}
              className={
                s.type != "radio" ? "form-control" : "form-check-input"
              }
              id={s.name}
              placeholder={s.placeholder}
              aria-describedby={s.name}
            />
            {s.type == "radio" ? (
              <React.Fragment>
                <label className="form-check-label">{s.value}</label>
              </React.Fragment>
            ) : (
              ""
            )}
          </div>
        );
      })}
      <Input
        type="submit"
        value="Submit"
        className="form-control btn btn-primary font-weight-bold mt-3"
      />
    </Form>

    // <Form onSubmit={handleSubmit(onSubmit)}>
    //   {content.inputs.map((s, key) => {
    //     return (
    //       <div className="mb-3">
    //         <label for={s.name} className="form-label">
    //           {s.label}
    //         </label>
    //         <input
    //           type={s.type}
    //           value={s.value}
    //           {...register(s.name, { required: true })}
    //           className="form-control"
    //           id={s.name}
    //           aria-describedby={s.name}
    //         />
    //         {/* <p style={{ color: "red" }}>{errors[s.name]?.message}</p> */}
    //       </div>
    //     );
    //   })}
    //   <Input type="submit" value="submit" className="btn btn-primary" />
    // </Form>
  );
};
export default Forms;

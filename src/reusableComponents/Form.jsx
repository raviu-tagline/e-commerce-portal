import { useForm } from "react-hook-form";
import { Form, Input } from "reactstrap";
import yupValidation from "../reusableContents/yupValidation";
import { yupResolver } from "@hookform/resolvers/yup";

const Forms = ({ content, onSubmit }) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(yupValidation()),
  });

  return (
    <Form onSubmit={onSubmit}>
      {content.inputs.map((s, key) => {
        return (
          <div className="form-group">
            <input
              name={s.name}
              type={s.type}
              value={s.value}
              {...register("register", { required: true })}
              className="form-control"
              id={s.name}
              placeholder={s.placeholder}
              aria-describedby={s.name}
            />
            <p style={{ color: "red" }}>
              {errors ? errors[s.name]?.message : ""}
            </p>
          </div>
        );
      })}
      <Input
        type="submit"
        value="Submit"
        className="form-control btn btn-primary font-weight-bold"
      />
    </Form>
  );
};
export default Forms;

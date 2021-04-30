import { useForm } from "react-hook-form";
import { Form, Input } from "reactstrap";
import yupValidation from "../reusableContents/yupValidation";

const Forms = ({ content, onSubmit }) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(yupValidation),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {content.inputs.map((key, val) => {
        return (
          <>
            <label for={key.name} className="form-label">
              {key.label}
            </label>
            <input
              name={key.name}
              type={key.type}
              value={key.value}
              ref={register}
              classNam="form-control"
              placeholder={key.placeholder}
              id={key.name}
            />
            <p style={{ color: "red" }}>{errors[key.name]?.message}</p>
          </>
        );
      })}
      <Input type="submit" value="submit" classNam="btn btn-primary" />
    </Form>
  );
};
export default Forms;

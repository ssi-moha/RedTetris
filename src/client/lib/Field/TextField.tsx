import React from 'react'
import { Input } from "semantic-ui-react";
//import {FieldAttributes, FieldProps, FormikProps, FormikValues} from "formik";

/* interface TextFieldProps {
    name: string,
    component: Element,
    style?: React.CSSProperties,
    setFieldValue: FormikProps<{[name: string]: string}>["setFieldValue"],
}

interface TextFieldAttributes {
    field?: FieldAttributes<{[name: string]: string}>,
    props: TextFieldProps,
} */

// @ts-ignore
const TextField = ({ field, ...props }) => {
  return (
      <Input fluid {...field} {...props} />
  );
};

export default TextField;

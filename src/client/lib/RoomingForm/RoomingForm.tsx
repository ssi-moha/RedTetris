import React from 'react'
import {Field, Formik} from "formik";
import {Button, Form, Grid, Header} from "semantic-ui-react";
import {RoomingFormProps} from "./RoomingFormContainer";

const defaultFieldStyle = { width:"100%" };

const noPaddingStyle = { padding: "0"};

const RoomingForm = (props: RoomingFormProps) => {
    return (
            <Formik
                initialValues={{}}
                onSubmit={props.onSubmit}
                render={formikProps => (
                    <Form onSubmit={formikProps.handleSubmit}>
                        <Grid container padded="vertically" >
                            <Grid.Row>
                                <Header as="h3" content={props.title} />
                            </Grid.Row>
                            {props.items.map((item, index) =>
                                <Grid.Row key={index}>
                                    <Grid.Column style={noPaddingStyle}>
                                        <p>{item.label}</p>
                                        <Field
                                            name={item.name}
                                            component={item.component}
                                            style={{...item.style,...defaultFieldStyle}}
                                            setFieldValue={formikProps.setFieldValue}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            )}
                            <Button content={props.validateButton || "Confirm"} type="submit" />
                            {props.cancelButton &&
                                <Button content={props.cancelButton} negative type="submit" />
                            }
                        </Grid>
                    </Form>
                )}
            />
  );
};

export default RoomingForm;
